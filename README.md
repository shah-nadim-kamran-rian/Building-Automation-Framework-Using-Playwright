# Playwright JavaScript Automation Framework for Automation Exercise

## Overview

This repository contains a Software Quality Assurance project for testing the public e-commerce practice website [Automation Exercise](https://automationexercise.com/).

The project follows a complete manual-to-automation workflow. Manual testing was performed first to understand the application behavior, user flows, validation rules, and regression areas. After manual test cases were prepared, selected high-priority and repeatable scenarios were automated using Playwright with JavaScript.

The goal of this project is to demonstrate a realistic SQA process, including manual test design, automation framework development, test execution, reporting, debugging, and GitHub-based project documentation.

---

## Application Under Test

**Website:** Automation Exercise  
**URL:** https://automationexercise.com/

### Core Features Covered

- Homepage validation
- Signup and login
- Product listing and product details
- Product search
- Cart functionality
- Checkout flow
- Contact Us form
- Subscription validation
- API validation
- End-to-end user journeys

---

## Project Objectives

- Perform structured manual testing before automation
- Design feature-wise manual test cases
- Identify smoke, regression, negative, API, and end-to-end scenarios
- Build a Playwright JavaScript automation framework
- Automate stable, repeatable, and high-value test cases
- Maintain traceability between manual test cases and automation coverage
- Generate Playwright execution reports
- Document the full SQA workflow in a final project report

---

## Testing Approach

### Phase 1: Manual Testing

Manual testing was performed first to understand website behavior and identify important testing areas.

This phase includes:

- Manual exploration
- Feature-wise test case design
- Smoke and regression classification
- Priority assignment
- Negative and boundary testing
- Bug tracking
- Traceability preparation
- Automation candidate selection

### Phase 2: Automation Testing

After manual coverage was defined, selected scenarios were automated using Playwright with JavaScript.

This phase includes:

- UI automation testing
- API testing
- Negative testing
- End-to-end testing
- Reusable page actions
- Test data handling
- Utility functions
- HTML reporting with Playwright

---

## Repository Structure

```text
Building-Automation-Framework-Using-Playwright/
│
├── automation-testing/
│   ├── pages/
│   ├── test-data/
│   ├── tests/
│   ├── utils/
│   ├── package.json
│   ├── package-lock.json
│   ├── playwright.config.js
│   └── automation_coverage_traceability_report.xlsx
│
├── manual-testing/
│   ├── automation_test_cases_v1.xlsx
│   ├── automation_test_cases_v2.xlsx
│   ├── automation_test_cases_v3.xlsx
│   └── automation_test_cases_v4.xlsx
│
├── report/
│   └── Playwright_JavaScript_Automation_Framework_E_Commerce_Web_Testing.pdf
│
└── README.md
