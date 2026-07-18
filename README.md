# @anrmk/str-package

Shared npm package for STR projects.

This library contains reusable Bybit providers, shared TypeScript types, and utility helpers used by `str` and `str-worker`.

## What Is Included

### Providers

- `@anrmk/str-package/providers/bybit`

### Types

- `@anrmk/str-package/types`
- `@anrmk/str-package/types/bybit`
- `@anrmk/str-package/types/challenge`

### Utilities

- `@anrmk/str-package/utils/bybitHelper`
- `@anrmk/str-package/utils/challengeHelper`
- `@anrmk/str-package/utils/helper`

## Install

```bash
npm install @anrmk/str-package
```

## Usage

```ts
import { getApiKeyInfo } from "@anrmk/str-package/providers/bybit";
import type { TChallengeItem } from "@anrmk/str-package/types/challenge";
```

## Use In A Project

1. Install dependency:

```bash
npm install @anrmk/str-package
```

2. Import from package subpaths in your app code:

```ts
import { applyDemoMoney } from "@anrmk/str-package/providers/bybit";
import type { IBybitApiResponse } from "@anrmk/str-package/types/bybit";
```

## Development

```bash
npm install
npm run build
```

## Publish Updates (Push)

When you change package code and want consumers to receive updates:

1. Bump package version:

```bash
npm version patch
```

Use `minor` or `major` when needed.

2. Build and publish:

```bash
npm run build
npm publish --access public
```

3. Push git commit and tags:

```bash
git push origin main --tags
```

Note: npm does not allow publishing the same version twice.

## Get Updates In Consumers (Pull)

In `str` or `str-worker`, fetch latest package version:

```bash
npm install @anrmk/str-package@latest
```

or

```bash
npm update @anrmk/str-package
```

Verify installed version:

```bash
npm list @anrmk/str-package
```

## Recommended Release Flow

1. Update code in this repo.
2. Run tests/build.
3. Bump version.
4. Publish to npm.
5. Update package in consumer repos.
6. Validate and deploy.