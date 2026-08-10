# Constrained literary vignette generation

## Purpose

Generate a short literary vignette from an explicit brief, then verify the generated text independently. The output is a
deterministic document assembled from source-provided content; the circuit must not invent names, facts, quotations, or
events that are absent from the brief.

## Generator contract

The brief supplies a title, protagonist, setting, concrete object, immediate goal, obstacle, choice, consequence, closing
image, and exactly three motifs. The generator must return one Markdown document with this structure:

1. one level-one title using the supplied title;
2. `## Arrival`, one paragraph establishing protagonist, setting, object, and goal;
3. `## Pressure`, one paragraph establishing the obstacle and using motif 1;
4. `## Choice`, one paragraph stating the supplied choice and using motif 2;
5. `## Consequence`, one paragraph stating the supplied consequence and ending with the supplied closing image and motif 3.

Every supplied narrative field must appear verbatim at least once. Each motif must appear in its assigned section. The
generator may add only fixed connective phrases defined by its implementation. It must refuse missing fields, empty fields,
non-string fields, a motif list whose length is not exactly three, or a title containing a newline.

## Independent verifier contract

The verifier receives the original brief and the generated Markdown as separate inputs. It returns a structured verification
with `ok`, checks, missing requirements, unexpected structural conditions, and counts. It must check the exact heading order,
exactly four body sections, one non-empty paragraph per section, verbatim presence of every brief field, motif placement,
closing-image position, absence of extra headings, and a word-count range of 90 through 220 words. A failed check must remain
visible; the verifier must never repair the document.

Generator and verifier must be separate SOP packages. A composition package may call both, but verification cannot be
replaced by the generator's own `check` function. Both packages are pure and have no filesystem or LLM capability.
