# Eval 10 / Task 3 expectation comparison

## Source-derived expectation

Two raw orders should produce six mandatory instances. OC-1 is below the approval threshold but uses unsupported GBP, so
only its currency finding should be non-compliant. OC-2 is exactly at the approval threshold and unapproved, so only its
approval finding should be non-compliant.

## Observed executor result

`results/runtime-result.md` records `SUCCEEDED`, closure `CLOSED`, six expected and six executed instances, and zero missing
instances. The actual findings flag OC-1 currency and OC-2 approval exactly as expected. The observed result matches the
expectation.
