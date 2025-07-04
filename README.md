# Playwright + Cucumber TypeScript Test Automation Framework

## Overview
This framework combines Playwright and Cucumber with TypeScript for scalable, maintainable, and cross-browser end-to-end testing. It is designed for CI/CD environments (GitHub Actions), robust reporting, and best practices in modular test automation.

---

## Structure & Rationale

```
├── automation/                # Core framework logic (hooks, world, utilities)
│   ├── custom-world.ts        # Custom Cucumber World for Playwright context/page
│   └── hooks.ts               # Cucumber hooks for setup, teardown, reporting
├── tests/
│   └── features/              # Feature files, step definitions, and page objects
│       ├── login/             # Login feature
│       │   ├── login.feature
│       │   ├── pages/
│       │   │   └── landing-page.ts
│       │   └── steps/
│       │       └── login-steps.ts
│       └── search/            # (Other features)
├── playwright.config.ts       # Playwright config (cross-browser, video, etc.)
├── cucumber.js                # Cucumber config
├── .github/workflows/         # CI/CD workflows (GitHub Actions)
│   └── playwright.yml
├── reports/                   # Test artifacts (screenshots, videos, reports)
│   ├── screenshots/
│   └── videos/
└── README.md                  # This file is to help newcomer to understand the project
```

- **Modular Page Objects:** Each page object (e.g., `landing-page.ts`) extends a common base for DRY code and maintainability.
- **Step Definitions:** One instance per scenario, strongly typed, and reusable.
- **Hooks:** Robust setup/teardown, screenshot/video capture, and artifact management.
- **Cross-Browser:** Configured for Chromium, Firefox, and WebKit.
- **Reporting:** Screenshots and videos attached to Cucumber reports, artifacts uploaded in CI.
- **CI/CD Ready:** GitHub Actions provided, with artifact handling and headless support.

---

## Running Demo Scripts

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Install dependencies
```sh
npm install
```

### 2. Install Playwright browser
```sh
npx playwright install --with-deps chromium
```

### 3. Run test
```sh
npm test
```

### 4. View Reports & Artifacts
From local: 
- **Screenshots:** `reports/screenshots/`
- **Videos:** `reports/videos/`
- **Cucumber HTML/JSON reports:** see `reports/` or CI artifacts

In the pipeline:
- Go to Actions tab in Github --> Select the workflow run --> Scroll to the Artifacts section

### 5. Cross-Browser Testing
By default, Playwright runs all browsers. To specify:
```sh
npx playwright test --project=firefox
```

### 6. CI/CD
- **GitHub Actions:** See `.github/workflows/playwright.yml` for matrix runs, artifact upload, and scheduling.

---

## Best Practices
- Keep page objects and step definitions DRY and modular.
- Use hooks for all setup/teardown and artifact management.
- Exclude `reports/` from git (see `.gitignore`).
- Review CI artifacts for screenshots/videos on failures.

---
## Apply Lint checks
In the codebase, I've applied simple lint checks to analyze code for potential errors, stylistic issues, or bad practices before the code is run with the following checks:
- @typescript-eslint/no-unused-vars: Warns about unused variables, but ignores unused arguments if they start with _.
- @typescript-eslint/explicit-function-return-type: Disabled, so functions don’t need explicitly declared return types.
- @typescript-eslint/no-explicit-any: Warns if any is used, good for flagging places to improve type safety.
- no-console: Warns when console.log or other console methods are used (not an error, just a warning).

---

## Future Improvements
- **Apply ESLint:** Add ESLint to enforce code style and catch errors early. Integrate with CI for automatic lint checks.
- **SonarQube Integration:** Use SonarQube for static code analysis, code quality, and security checks. Add a SonarQube scan step in your CI pipeline.
- **Test Management Integration:** Integrate with a test management tool (e.g., Azure DevOps Test Plans, Xray, Zephyr) to sync test results automatically. For Azure DevOps, use the official Playwright reporter or a custom script to publish results to Test Plans.

---

## Support
For questions, improvements, or CI/CD integration help, open an issue or contact Minh Le for further assistance.
