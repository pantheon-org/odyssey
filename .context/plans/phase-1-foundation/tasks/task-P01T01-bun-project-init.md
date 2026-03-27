# P01T01 — Bun project init

## Goal
Bootstrap the repo with a Bun project: `package.json`, `bun.lockb`, `tsconfig.json`
(strict mode), `biome.json`, `markdownlint-cli2` config, and a YAML parse-check script.

## Files
- `package.json`
- `tsconfig.json`
- `biome.json`
- `.bun-version`
- `.markdownlint.jsonc`
- `scripts/check-yaml.ts`

## Implementation
- `package.json`: declare `name`, `version`, `scripts` stubs (`test`, `generate:schema`,
  `check:schema`, `lint`, `lint:md`, `check:yaml`), and runtime deps (`yaml`, `zod`, `ajv`, `p-limit`).
- `tsconfig.json`: `strict: true`, `target: "ESNext"`, `module: "Preserve"`, `moduleResolution: "Bundler"`.
- `biome.json`: formatter + linter enabled; organise-imports on. Covers TS/JS/JSON only.
- `.bun-version`: pin Bun version; `setup-bun@v2` reads it automatically — see `../../../knowledge-base/toolchain.md`.
- `.markdownlint.jsonc`: markdownlint-cli2 config — see `../../../knowledge-base/toolchain.md` for template.
- `scripts/check-yaml.ts`: glob all `**/*.yaml` / `**/*.yml` files (excluding `node_modules`),
  parse each with the `yaml` package, print filename + error on failure, exit non-zero if any fail.

## Depends on

Nothing — this is the first task (greenfield).

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/toolchain.md` — `tsconfig.json` fields, `biome.json` template, `.markdownlint.jsonc` template, Bun version pinning

## References
- `../../../knowledge-base/toolchain.md` — exact `tsconfig.json` fields, `biome.json` template,
  `.markdownlint.jsonc` template, `check-yaml.ts` implementation, Bun version pinning

## Verification
```sh
bun --version
bun run lint        # biome ci
bun run lint:md     # markdownlint-cli2
bun run check:yaml  # parse-check all .yaml/.yml
npx tsc --noEmit
```

## Status
pending
