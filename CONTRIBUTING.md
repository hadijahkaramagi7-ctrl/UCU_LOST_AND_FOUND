# Contributing Guide

## Branch Naming

All work must be done on a separate branch. Never work directly on `main`.

- `feat/short-name` — new feature
- `fix/short-name` — bug fix
- `docs/short-name` — documentation
- `test/short-name` — tests
- `chore/short-name` — setup, dependencies

## Workflow

1. `git checkout main`
2. `git pull`
3. `git checkout -b feat/your-feature`
4. Make small commits with clear messages
5. `git push -u origin feat/your-feature`
6. Open a Pull Request on GitHub
7. Request review from another member
8. Merge only after approval

## Commit Message Style

- `feat: add register endpoint`
- `fix: reject claim on returned item`
- `docs: add design brief`
- `test: add claim permission tests`
- `chore: update dependencies`

## Rules

- Never commit `.env`, `node_modules/`, or passwords.
- Never push directly to `main` (it is protected).
- Keep PRs small (one feature/fix each).
