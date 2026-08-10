#!/usr/bin/env python3
"""Lightweight conformance linter for the SOP examples in this package.

This is not the reference compiler. It validates the frozen v1 surface rules:
positional calls, quoted literals, explicit command formals, circuit arity,
local wires, package resolution and basic coverage reachability.
"""
from __future__ import annotations
from dataclasses import dataclass, field
from pathlib import Path
import json
import re
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
SIMPLE = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*$")
QUALIFIED = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*$")
TOKEN = re.compile(r'"(?:\\.|[^"\\])*"|\S+')

BUILTINS = {
    "value": 1,
    "absent": 0,
    "alias": 1,
    "get": 2,
    "hash": 1,
    "equal": 2,
    "compare": 3,
    "parseNumber": 1,
    "publish": 2,
    "assertInvariant": 2,
    "emptyList": 0,
    "append": 2,
    "concat": 2,
    "artifactRead": 1,
    "artifactWrite": 2,
    "select": 2,
    "join": 4,
    "filter": 2,
    "distinct": 1,
    "union": 2,
    "difference": 2,
    "project": 2,
    "unify": 2,
}

@dataclass
class Statement:
    line: int
    outs: list[str]
    callee: str
    args: list[str]
    refs: list[str] = field(default_factory=list)

@dataclass
class Package:
    path: Path
    name: str
    inputs: list[str] = field(default_factory=list)
    outputs: list[str] = field(default_factory=list)
    commands: dict[str, list[str]] = field(default_factory=dict)
    statements: list[Statement] = field(default_factory=list)
    assurances: list[tuple[str, list[str], int]] = field(default_factory=list)
    apply: str | None = None
    js_blocks: list[tuple[int, str]] = field(default_factory=list)

def package_name(path: Path) -> str:
    rel = path.relative_to(ROOT).with_suffix("")
    parts = list(rel.parts)
    if parts[-1] == "index":
        parts = parts[:-1]
    if not parts:
        raise ValueError(f"invalid index package: {path}")
    for part in parts:
        if not SIMPLE.fullmatch(part):
            raise ValueError(f"{path}: path segment {part!r} is not a valid package segment")
    return ".".join(parts)

def tokens(text: str) -> list[str]:
    return TOKEN.findall(text)

def parse(path: Path) -> Package:
    pkg = Package(path=path, name=package_name(path))
    lines = path.read_text(encoding="utf-8").splitlines()
    i = 0
    seen_input = seen_output = False

    while i < len(lines):
        raw = lines[i]
        stripped = raw.strip()
        if not stripped or stripped.startswith("#"):
            i += 1
            continue
        if raw[:1].isspace():
            raise ValueError(f"{path}:{i+1}: unexpected indentation")

        define = re.match(r"^@([A-Za-z_][A-Za-z0-9_]*)\s+define(?:\s+(.*))?$", stripped)
        if define:
            name = define.group(1)
            formals = (define.group(2) or "").split()
            if any(not SIMPLE.fullmatch(x) for x in formals):
                raise ValueError(f"{path}:{i+1}: invalid formal list")
            if len(formals) != len(set(formals)):
                raise ValueError(f"{path}:{i+1}: duplicate formal")
            if name in pkg.commands:
                raise ValueError(f"{path}:{i+1}: duplicate command {name}")
            start = i + 1
            i += 1
            block = []
            while i < len(lines):
                candidate = lines[i]
                if candidate.strip() and not candidate[:1].isspace():
                    break
                block.append(candidate)
                i += 1
            nonblank = [x for x in block if x.strip()]
            if not nonblank:
                raise ValueError(f"{path}:{start}: empty define block")
            indents = [len(x) - len(x.lstrip()) for x in nonblank]
            common = min(indents)
            body = "\n".join(x[common:] if x.strip() else "" for x in block)
            pkg.commands[name] = formals
            pkg.js_blocks.append((start, body))
            continue

        ts = tokens(stripped)
        head = ts[0]

        if head == "@input":
            if seen_input:
                raise ValueError(f"{path}:{i+1}: duplicate @input")
            seen_input = True
            pkg.inputs = ts[1:]
            if any(not SIMPLE.fullmatch(x) for x in pkg.inputs):
                raise ValueError(f"{path}:{i+1}: invalid input")
            i += 1
            continue

        if head == "@output":
            if seen_output:
                raise ValueError(f"{path}:{i+1}: duplicate @output")
            seen_output = True
            pkg.outputs = ts[1:]
            if not pkg.outputs or any(not SIMPLE.fullmatch(x) for x in pkg.outputs):
                raise ValueError(f"{path}:{i+1}: invalid output")
            i += 1
            continue

        if head in {"@invariant", "@goal"}:
            if len(ts) < 2 or not SIMPLE.fullmatch(ts[1]):
                raise ValueError(f"{path}:{i+1}: invalid assurance declaration")
            covers = []
            if len(ts) > 2:
                if ts[2] != "covers":
                    raise ValueError(f"{path}:{i+1}: expected covers")
                covers = ts[3:]
                if any(not SIMPLE.fullmatch(x) for x in covers):
                    raise ValueError(f"{path}:{i+1}: invalid coverage name")
            pkg.assurances.append((ts[1], covers, i+1))
            i += 1
            continue

        if head == "@template":
            if ts not in (["@template", "mandatory"], ["@template", "optional"]):
                raise ValueError(f"{path}:{i+1}: invalid @template")
            i += 1
            continue

        if head == "@trigger":
            if len(ts) < 2 or any(not (x.startswith('"') and x.endswith('"')) for x in ts[1:]):
                raise ValueError(f"{path}:{i+1}: triggers must be string literals")
            i += 1
            continue

        if head == "@apply":
            if len(ts) != 2 or not QUALIFIED.fullmatch(ts[1]):
                raise ValueError(f"{path}:{i+1}: invalid @apply")
            pkg.apply = ts[1]
            i += 1
            continue

        # Statement with indented continuations.
        start_line = i + 1
        statement_text = stripped
        i += 1
        while i < len(lines):
            candidate = lines[i]
            if candidate.strip() and candidate[:1].isspace():
                statement_text += " " + candidate.strip()
                i += 1
                continue
            if not candidate.strip():
                i += 1
                continue
            break

        ts = tokens(statement_text)
        outs = []
        j = 0
        while j < len(ts) and ts[j].startswith("@"):
            name = ts[j][1:]
            if not SIMPLE.fullmatch(name):
                raise ValueError(f"{path}:{start_line}: invalid output wire {ts[j]}")
            outs.append(name)
            j += 1
        if not outs or j >= len(ts):
            raise ValueError(f"{path}:{start_line}: invalid call statement")
        callee = ts[j]
        if not (SIMPLE.fullmatch(callee) or QUALIFIED.fullmatch(callee)):
            raise ValueError(f"{path}:{start_line}: invalid callee {callee}")
        args = ts[j+1:]
        refs = []
        for arg in args:
            if arg.startswith("$"):
                ref = arg[1:]
                if not SIMPLE.fullmatch(ref):
                    raise ValueError(f"{path}:{start_line}: invalid wire ref {arg}")
                refs.append(ref)
            elif arg.startswith('"') and arg.endswith('"'):
                pass
            else:
                raise ValueError(f"{path}:{start_line}: argument {arg!r} must be $wire or quoted literal")
        pkg.statements.append(Statement(start_line, outs, callee, args, refs))

    if not seen_input:
        pkg.inputs = []
    if not seen_output:
        raise ValueError(f"{path}: missing @output")
    return pkg

def check_js(pkg: Package, errors: list[str]) -> None:
    for line, body in pkg.js_blocks:
        wrapped = "async function __sop_definition__(){\n" + body + "\n}\n"
        with tempfile.NamedTemporaryFile("w", suffix=".mjs", delete=False, encoding="utf-8") as f:
            f.write(wrapped)
            name = f.name
        try:
            result = subprocess.run(["node", "--check", name], capture_output=True, text=True)
            if result.returncode:
                errors.append(f"{pkg.path}:{line}: JavaScript syntax error: {result.stderr.strip()}")
        finally:
            Path(name).unlink(missing_ok=True)

def validate(packages: dict[str, Package]) -> list[str]:
    errors: list[str] = []
    for pkg in packages.values():
        producers = set(pkg.inputs)
        producer_line: dict[str, int] = {x: 0 for x in pkg.inputs}
        for st in pkg.statements:
            for out in st.outs:
                if out in producers:
                    errors.append(f"{pkg.path}:{st.line}: wire {out} redefined")
                producers.add(out)
                producer_line[out] = st.line

        for st in pkg.statements:
            for ref in st.refs:
                if ref not in producers:
                    errors.append(f"{pkg.path}:{st.line}: free wire ${ref}")

            if st.callee in BUILTINS:
                expected = BUILTINS[st.callee]
                if len(st.outs) != 1:
                    errors.append(f"{pkg.path}:{st.line}: builtin {st.callee} has one output")
                if len(st.args) != expected:
                    errors.append(f"{pkg.path}:{st.line}: builtin {st.callee} expects {expected} args, got {len(st.args)}")
            elif st.callee in pkg.commands:
                expected = len(pkg.commands[st.callee])
                if len(st.outs) != 1:
                    errors.append(f"{pkg.path}:{st.line}: command {st.callee} has one output")
                if len(st.args) > expected:
                    errors.append(f"{pkg.path}:{st.line}: command {st.callee} has too many args")
            elif st.callee in packages:
                target = packages[st.callee]
                if len(st.args) != len(target.inputs):
                    errors.append(f"{pkg.path}:{st.line}: circuit {st.callee} input arity mismatch")
                if len(st.outs) != len(target.outputs):
                    errors.append(f"{pkg.path}:{st.line}: circuit {st.callee} output arity mismatch")
            else:
                errors.append(f"{pkg.path}:{st.line}: unknown callee {st.callee}")

        for name in pkg.outputs:
            if name not in producers:
                errors.append(f"{pkg.path}: output {name} has no producer")
        for name, covers, line in pkg.assurances:
            if name not in producers:
                errors.append(f"{pkg.path}:{line}: assurance wire {name} has no producer")
            for c in covers:
                if c not in producers:
                    errors.append(f"{pkg.path}:{line}: covered wire {c} has no producer")

        if pkg.apply and pkg.apply not in packages:
            errors.append(f"{pkg.path}: @apply target {pkg.apply} does not exist")

        # Dependency reachability for coverage.
        deps = {out: set(st.refs) for st in pkg.statements for out in st.outs}
        def ancestors(w: str, seen=None):
            seen = set() if seen is None else seen
            if w in seen:
                return set()
            seen.add(w)
            result = set(deps.get(w, set()))
            for d in list(result):
                result |= ancestors(d, seen)
            return result
        for name, covers, line in pkg.assurances:
            anc = ancestors(name)
            for c in covers:
                if c != name and c not in anc:
                    errors.append(f"{pkg.path}:{line}: assurance {name} does not depend on covered wire {c}")

        check_js(pkg, errors)
    return errors

def main() -> int:
    paths = sorted((ROOT / "examples").rglob("*.sop"))
    packages: dict[str, Package] = {}
    errors: list[str] = []
    for path in paths:
        try:
            pkg = parse(path)
            if pkg.name in packages:
                errors.append(f"duplicate package {pkg.name}")
            packages[pkg.name] = pkg
        except Exception as exc:
            errors.append(str(exc))
    errors.extend(validate(packages))
    report = {
        "files": len(paths),
        "packages": len(packages),
        "errors": errors,
        "status": "PASS" if not errors else "FAIL",
    }
    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0 if not errors else 1

if __name__ == "__main__":
    raise SystemExit(main())
