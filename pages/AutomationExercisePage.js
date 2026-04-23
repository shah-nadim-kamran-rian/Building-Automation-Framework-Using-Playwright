const { expect } = require('@playwright/test');

class AutomationExercisePage {
  constructor(page) {
    this.page = page;

    this.homeLink = page.locator('a[href="/"]');
    this.productsLink = page.locator('a[href="/products"]');
    this.cartLink = page.locator('a[href="/view_cart"]');
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.contactUsLink = page.locator('a[href="/contact_us"]');


    this.adIframe = page.locator('iframe');
    this.adCloseButton = page.locator('#dismiss-button, .ns-ccxps-e-16, .fc-close, .close, [aria-label="Close"]');

    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsTitle = page.locator('text=Searched Products');

    this.viewProductLinks = page.locator('a:has-text("View Product")');
    this.addToCartButtons = page.locator('.product-overlay a:has-text("Add to cart")');
    this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
    this.viewCartLinkInModal = page.locator('u:has-text("View Cart"), a:has-text("View Cart")');

    this.proceedToCheckoutButton = page.locator('a:has-text("Proceed To Checkout")');
    this.registerLoginLink = page.locator('.modal-body a[href="/login"]');
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loggedInText = page.locator('text=Logged in as');

    this.contactNameInput = page.locator('input[data-qa="name"]');
    this.contactEmailInput = page.locator('input[data-qa="email"]');
    this.contactSubjectInput = page.locator('input[data-qa="subject"]');
    this.contactMessageInput = page.locator('textarea[data-qa="message"]');
    this.contactSubmitButton = page.locator('input[data-qa="submit-button"]');
    this.contactSuccessMessage = page.locator('.status.alert.alert-success');
    this.newUserNameInput = page.locator('input[data-qa="signup-name"]');
    this.newUserEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');

    this.passwordInput = page.locator('input[data-qa="password"]');
    this.daysSelect = page.locator('select[data-qa="days"]');
    this.monthsSelect = page.locator('select[data-qa="months"]');
    this.yearsSelect = page.locator('select[data-qa="years"]');
    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.addressInput = page.locator('input[data-qa="address"]');
    this.countrySelect = page.locator('select[data-qa="country"]');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    this.accountCreatedText = page.locator('text=Account Created!');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  async openHomePage() {
    await this.page.goto('https://automationexercise.com/');
  }

  async goToProducts() {
    await this.productsLink.click();
  }

  async searchProduct(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async goToSignupLogin() {
    await this.signupLoginLink.click();
  }

  async login(email, password) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async openContactUs() {
    await this.contactUsLink.click();
  }

  async submitContactForm(name, email, subject, message) {
    await this.contactNameInput.fill(name);
    await this.contactEmailInput.fill(email);
    await this.contactSubjectInput.fill(subject);
    await this.contactMessageInput.fill(message);
    await this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.contactSubmitButton.click();
  }

  async signupNewUser(name, email) {
    await this.newUserNameInput.fill(name);
    await this.newUserEmailInput.fill(email);
    await this.signupButton.click();
  }
  async fillAccountInformation(password) {
    await this.passwordInput.fill(password);
    await this.daysSelect.selectOption('1');
    await this.monthsSelect.selectOption('1');
    await this.yearsSelect.selectOption('2000');
    await this.firstNameInput.fill('Test');
    await this.lastNameInput.fill('User');
    await this.addressInput.fill('Dhaka Street 1');
    await this.countrySelect.selectOption('India');
    await this.stateInput.fill('Dhaka');
    await this.cityInput.fill('Dhaka');
    await this.zipcodeInput.fill('1207');
    await this.mobileNumberInput.fill('01700000000');
    await this.createAccountButton.click();
  }

  async closeAdIfVisible() {
    try {
      if (await this.adCloseButton.first().isVisible({ timeout: 3000 })) {
        await this.adCloseButton.first().click({ force: true });
        await this.page.waitForTimeout(1000);
      }
    } catch (error) {
    }
  }
}

module.exports = { AutomationExercisePage };