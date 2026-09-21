# ci-demo - DevOps Lab Exercise 2

## Aim

To demonstrate **Continuous Integration (CI) using GitHub Actions**. The
project is a small two-tier Node.js application (backend + frontend) whose
workflow automatically **installs dependencies, runs unit tests, and
simulates a build** whenever code is pushed to (or pulled against) the
`main` branch.

---

## Project Structure

```
ci-demo/
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions CI pipeline definition
├── backend/
│   ├── server.js             # Node.js server module exposing add(a, b)
│   ├── test.js               # Unit tests for add() using node:assert
│   └── package.json          # Backend metadata + "test" script
├── frontend/
│   ├── app.js                # Simple frontend Node.js script w/ greeting
│   └── package.json          # Frontend metadata + "build" script
└── README.md                 # This file
```

### File descriptions

| File                              | Purpose                                                                 |
| --------------------------------- | ----------------------------------------------------------------------- |
| `.github/workflows/ci.yml`        | YAML definition of the CI pipeline (triggers, job, steps).              |
| `backend/server.js`               | Exports `add(a, b)`; prints a demo line when run directly.              |
| `backend/test.js`                 | 6 assertions against `add()` using the built-in `assert` module.        |
| `backend/package.json`            | Declares the `test` script run by CI (`node test.js`).                  |
| `frontend/app.js`                 | Prints a greeting and simulates a build result.                         |
| `frontend/package.json`           | Declares the `build` script run by CI (`node app.js`).                  |

---

## Steps to Run Locally

Requirement: **Node.js >= 18** installed.

```bash
# 1. Clone / enter the project
cd ci-demo

# 2. Backend - install deps and run tests
cd backend
npm install
npm test

# 3. Backend - run the server file directly
npm start

# 4. Frontend - install deps and simulate build
cd ../frontend
npm install
npm run build
```

Expected terminal output (backend tests):

```
All add() tests passed. CI pipeline is happy :)
```

Expected terminal output (frontend build):

```
Hello from the ci-demo frontend!
Frontend build simulation: OK
```

---

## GitHub Actions Workflow Explanation

The workflow file `.github/workflows/ci.yml` performs the following:

| Section                    | What it does                                                                  |
| -------------------------- | ----------------------------------------------------------------------------- |
| `name`                     | Names the workflow **"CI Pipeline"** (visible in the Actions tab).            |
| `on: push / pull_request`  | Triggers the run on pushes to `main` and on PRs targeting `main`.             |
| `jobs.build.runs-on`       | Runs on a clean **ubuntu-latest** virtual machine.                            |
| `strategy.matrix`          | Declares **Node.js 18** as the test version (extensible to more versions).    |
| `Checkout repository`      | Downloads the repo with `actions/checkout@v4`.                                |
| `Setup Node.js 18`         | Installs Node 18 and enables the npm cache via `actions/setup-node@v4`.       |
| `Install backend deps`     | `npm install` in `backend/`.                                                  |
| `Run backend tests`        | `npm test` in `backend/` → runs `test.js`; non-zero exit fails the pipeline.  |
| `Install frontend deps`    | `npm install` in `frontend/`.                                                 |
| `Simulate frontend build`  | `npm run build` in `frontend/` → runs `app.js`.                               |
| `CI status`                | Prints a success banner in the job log.                                       |

> **Why is this Continuous Integration?** Every change is automatically
> built and tested in a clean environment. A red check on a commit tells
> developers the change is broken **before** it ever reaches `main`.

---

## Expected Output

After pushing to GitHub, open the **Actions** tab → **CI Pipeline** run and you
should see a green `✓` with steps like:

```
✓ Checkout repository
✓ Setup Node.js 18
✓ Install backend dependencies
✓ Run backend tests          -> "All add() tests passed. CI pipeline is happy :)"
✓ Install frontend dependencies
✓ Simulate frontend build    -> "Hello from the ci-demo frontend!" / "Frontend build simulation: OK"
✓ CI status                  -> "CI pipeline completed successfully for Node 18"
```

The overall job status shows **green / success**, proving the project is
healthy — a finished, working **CI pipeline**.