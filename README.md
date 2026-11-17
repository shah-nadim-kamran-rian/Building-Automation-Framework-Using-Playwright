# End-to-End QA of Automation Exercise: Manual Testing and Playwright Automation

A software quality assurance project on [Automation Exercise](https://automationexercise.com/), a public e-commerce practice website. I tested it in two phases: first manually, to learn how the site behaves and write the test cases, then with a Playwright and JavaScript framework that automates the repeatable, high-priority checks.

## At a glance

| | |
|---|---|
| Manual test cases | **137**, across 7 modules |
| Suites | 26 smoke, 111 regression |
| Execution | All 137 executed; results are in the *Actual Result* and *Status* columns |
| Automated tests | **98** UI and API tests in 36 spec files |
| Framework | Playwright + JavaScript, Page Object Model |
| Browser | Chromium (Desktop Chrome) |

## Application under test

**Automation Exercise**: https://automationexercise.com/

Areas covered: homepage and navigation, signup and login, product listing, product details and search, categories and brands, cart, checkout and payment, Contact Us form, footer subscription, REST APIs, and end-to-end user journeys.

## Phase 1: Manual testing

All manual test cases are in one workbook: [`manual-testing/manual_test_cases.xlsx`](manual-testing/manual_test_cases.xlsx).

| Sheet | What it holds |
|---|---|
| Dashboard | Test case counts per module, smoke and regression totals |
| Homepage | 18 test cases |
| Signup_Login | 40 test cases |
| Products | 24 test cases |
| Cart | 16 test cases |
| Checkout | 12 test cases |
| Contact_Us | 12 test cases |
| Combined_Flows | 15 end-to-end test cases |
| Bug_Report | Defects with severity, priority, steps to reproduce and the linked test case |
| Traceability | Each test case mapped to its automation candidate and spec file |

Each test case has an ID, priority (High, Medium, Low), type (positive, negative, boundary, UI, E2E), suite tag (smoke or regression), preconditions, steps, expected result, actual result and status. Negative and boundary cases were designed with equivalence partitioning and boundary value analysis.

## Phase 2: Automation

The framework lives in [`automation-testing/`](automation-testing/).

| Area | Tests | Spec files |
|---|---|---|
| Products, search, categories, brands, reviews | 31 | `products`, `product-details`, `product-catalog`, `product-extra`, `product-review`, `product-review-extended`, `search-advanced`, `search-filter`, `category-brand`, `category-brand-extended` |
| Signup, login, logout, registration | 17 | `auth`, `auth-ui-validation`, `login-negative`, `logout-session`, `duplicate-signup`, `registration-boundary` |
| Checkout, payment, invoice | 14 | `checkout`, `checkout-logged-in`, `payment-validation`, `invoice-download`, `e2e-registered-checkout` |
| Homepage, navigation, footer, subscription, static pages, user flow | 13 | `homepage`, `navigation`, `scroll-footer`, `static-pages`, `subscription`, `e2e-user-flow` |
| Cart | 10 | `cart`, `cart-multi-item`, `cart-price-quantity`, `cart-remove` |
| REST API (positive and negative) | 8 | `api`, `api-negative` |
| Contact Us | 5 | `contact`, `contact-validation`, `contact-file-upload` |
| **Total** | **98** | **36 files** |

Framework features:

- **Page Object Model**: page actions and locators in `pages/AutomationExercisePage.js`
- **Test data** kept separately in `test-data/`, and a unique-email generator in `utils/` for new users
- **Ad handling**: most UI tests block ad requests, and the page object can close ad pop-ups
- **Retries, screenshots, video and traces** on failure, set in `playwright.config.js`
- **HTML report** for every run

## How to run

Requires Node.js.

```bash
cd automation-testing
npm ci                          # install dependencies
npx playwright install          # install browsers
npx playwright test             # run all tests
npx playwright show-report      # open the HTML report
npx playwright test --list      # list every test without running it
```

Run one file: `npx playwright test tests/cart.spec.js`

## Repository structure

```text
Building-Automation-Framework-Using-Playwright/
├── automation-testing/
│   ├── pages/
│   │   └── AutomationExercisePage.js
│   ├── test-data/
│   │   └── userData.js
│   ├── tests/                      # 36 spec files, 98 tests
│   ├── utils/
│   │   └── randomData.js
│   ├── automation_coverage_traceability.xlsx
│   ├── playwright.config.js
│   ├── package.json
│   └── package-lock.json
├── manual-testing/
│   └── manual_test_cases.xlsx      # 137 manual test cases
├── report/
│   └── Playwright_JavaScript_Automation_Framework_E_Commerce_Web_Testing.pdf
└── README.md
```

## Project report

The full write-up of the process, from manual testing to automation, is in [`report/Playwright_JavaScript_Automation_Framework_E_Commerce_Web_Testing.pdf`](report/Playwright_JavaScript_Automation_Framework_E_Commerce_Web_Testing.pdf).

## A note on stability

Automation Exercise is a shared public site that shows ads and sometimes loads slowly. A test can occasionally fail for those reasons rather than because of a real bug, which is why the config uses one retry and most UI tests block ad requests.

## Tools

Playwright, JavaScript, Node.js, Postman, Jira, Excel, Git, GitHub

## Author

**Shah Nadim Kamran Rian**
[LinkedIn](https://www.linkedin.com/in/shah-nadim-kamran-rian) · [GitHub](https://github.com/shah-nadim-kamran-rian)
