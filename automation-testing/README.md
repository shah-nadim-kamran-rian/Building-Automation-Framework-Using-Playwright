# Automation Testing: Playwright Framework

Playwright and JavaScript framework for testing [Automation Exercise](https://automationexercise.com/). It contains **98 UI and API tests in 36 spec files**, built from the manual test cases in [`../manual-testing/manual_test_cases.xlsx`](../manual-testing/manual_test_cases.xlsx).

## Tech stack

- Playwright (`@playwright/test`)
- JavaScript
- Node.js

## How to run

```bash
npm ci                          # install dependencies
npx playwright install          # install browsers
npx playwright test             # run all tests
npx playwright show-report      # open the HTML report
npx playwright test --list      # list all tests
```

Run one file: `npx playwright test tests/login-negative.spec.js`

## Structure

```text
automation-testing/
├── pages/
│   └── AutomationExercisePage.js   # Page Object: locators, page actions, ad pop-up handling
├── test-data/
│   └── userData.js                 # contact form data and search keyword
├── tests/                          # 36 spec files
├── utils/
│   └── randomData.js               # unique email generator for new users
├── automation_coverage_traceability.xlsx
├── playwright.config.js            # base URL, retries, reports, screenshots, traces
├── package.json
└── package-lock.json
```

## Configuration

Set in `playwright.config.js`:

- Base URL: `https://automationexercise.com`
- Browser: Chromium (Desktop Chrome), headless
- 1 retry per failed test
- Screenshot and video kept on failure, trace recorded on retry
- HTML and list reporters

## Stability note

The target site shows ads and sometimes loads slowly, so a test can fail for reasons that are not real bugs. To reduce this, most UI tests block ad requests, the page object can close ad pop-ups, and the config retries a failed test once.
