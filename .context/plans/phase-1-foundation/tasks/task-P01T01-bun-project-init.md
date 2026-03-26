# P01T01 — Bun project init

## Goal
Bootstrap the repo with a Bun project: `package.json`, `bun.lockb`, `tsconfig.json`
(strict mode), and `biome.json`.

## Files
- `package.json`
- `tsconfig.json`
- `biome.json`
- `.bun-version`

## Implementation
- `package.json`: declare `name`, `version`, `scripts` stubs (`test`, `generate:schema`,
  `check:schema`), and runtime deps (`yaml`, `zod`, `ajv`, `p-limit`).
- `tsconfig.json`: `strict: true`, `target: "ESNext"`, `module: "Preserve"`, `moduleResolution: "Bundler"`.
- `biome.json`: formatter + linter enabled; organise-imports on.
- `.bun-version`: pin Bun version; `setup-bun@v2` reads it automatically — see `toolchain.md`.

## References
- `toolchain.md` — exact `tsconfig.json` fields, `biome.json` template, Bun version pinning

## Verification
```sh
bun --version
bun run biome check .
npx tsc --noEmit
```

## Status
pending
