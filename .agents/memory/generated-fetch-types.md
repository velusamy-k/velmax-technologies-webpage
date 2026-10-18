---
name: Generated fetch typings
description: Why the generated API client needs the DOM iterable type library.
---

When the generated React client normalizes Fetch API headers with `Headers.entries()`, include `dom.iterable` in that package's TypeScript `lib` setting.

**Why:** The `dom` library alone does not declare the iterator APIs on `Headers`, so generated code fails typechecking after API codegen.

**How to apply:** If a codegen/typecheck run reports `Headers.entries()` missing, check the client TypeScript libs rather than editing generated files.
