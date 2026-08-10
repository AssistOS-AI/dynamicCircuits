# Schema conceptuală a Assurance Profile

Un profile production SHOULD fi manifest machine-readable și document Markdown.

Exemplu conceptual:

```yaml
schema: sop-assurance-profile/1
name: legal-contract-review
version: 1.0.0
mandatory_matchers:
  - package: kb.legal.notice.invalidity.matcher
    hash: sha256:...
  - package: kb.assurance.contradiction.matcher
    hash: sha256:...
trusted_verifiers:
  - package: kb.legal.notice.invalidity.verifier
    hash: sha256:...
minimum_output_assurance: independent
goals:
  required:
    - answerGrounded
budgets:
  maxClosureRounds: 100
  maxInstances: 100000
  maxOracleCalls: 10
conflictPolicy: blocking-unless-acknowledged
```

Profile-ul:

- este fixat înainte de attempt;
- este immutable;
- este hash-uit/semnat;
- nu poate fi modificat de problem circuit;
- definește blocking, nu circuitul însuși.
