# Playwright + Cucumber TypeScript Test Automation Framework

## Overview
This framework combines Playwright and Cucumber with TypeScript for scalable, maintainable, and cross-browser end-to-end testing. It is designed for CI/CD environments (GitHub Actions, GitLab), robust reporting, and best practices in modular test automation.

---

## Structure & Rationale

```
├── automation/                # Core framework logic (hooks, world, utilities)
│   ├── custom-world.ts        # Custom Cucumber World for Playwright context/page
│   └── hooks.ts               # Cucumber hooks for setup, teardown, reporting
├── tests/
│   ├── features/              # Feature files, step definitions, and page objects
│   │   ├── login/             # Example feature area
│   │   │   ├── login.feature
│   │   │   ├── pages/
│   │   │   │   └── landing-page.ts
│   │   │   └── steps/
│   │   │       └── login-steps.ts
│   │   └── search/            # (Other features)
│   └── example.spec.ts        # Playwright test example (non-Cucumber)
├── tests-examples/            # Additional demo scripts
│   └── demo-todo-app.spec.ts
├── playwright.config.ts       # Playwright config (cross-browser, video, etc.)
├── cucumber.js                # Cucumber config
├── .github/workflows/         # CI/CD workflows (GitHub Actions)
│   └── playwright.yml
├── reports/                   # Test artifacts (screenshots, videos, reports)
│   ├── screenshots/
│   └── videos/
└── README.md                  # This file
```

- **Modular Page Objects:** Each page object (e.g., `landing-page.ts`) extends a common base for DRY code and maintainability.
- **Step Definitions:** One instance per scenario, strongly typed, and reusable.
- **Hooks:** Robust setup/teardown, screenshot/video capture, and artifact management.
- **Cross-Browser:** Configured for Chromium, Firefox, and WebKit.
- **Reporting:** Screenshots and videos attached to Cucumber reports; artifacts uploaded in CI.
- **CI/CD Ready:** GitHub Actions and GitLab templates provided, with artifact handling and headless support.

---

## Running Demo Scripts

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Install dependencies
```sh
npm install
```

### 2. Run Playwright demo test (non-Cucumber)
```sh
npx playwright test tests-examples/demo-todo-app.spec.ts
```

### 3. Run Cucumber BDD tests
```sh
npx cucumber-js --require-module ts-node/register --require tests/features/**/*.ts --publish-quiet
```

Or use the script in `package.json` (if present):
```sh
npm run test:bdd
```

### 4. View Reports & Artifacts
- **Screenshots:** `reports/screenshots/`
- **Videos:** `reports/videos/`
- **Cucumber HTML/JSON reports:** (if configured, see `reports/` or CI artifacts)

### 5. Cross-Browser Testing
By default, Playwright runs all browsers. To specify:
```sh
npx playwright test --project=firefox
```

### 6. CI/CD
- **GitHub Actions:** See `.github/workflows/playwright.yml` for matrix runs, artifact upload, and scheduling.
- **GitLab:** Use similar steps in `.gitlab-ci.yml` (template provided in docs or on request).

---

## Best Practices
- Keep page objects and step definitions DRY and modular.
- Use hooks for all setup/teardown and artifact management.
- Exclude `reports/` from git (see `.gitignore`).
- Review CI artifacts for screenshots/videos on failures.
- For advanced reporting (e.g., Allure), see docs or request integration.

---

## Support
For questions, improvements, or CI/CD integration help, open an issue or contact Minh Le for further assistance.
