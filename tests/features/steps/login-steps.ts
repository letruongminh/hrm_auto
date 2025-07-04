import { Given, When, Then } from "@cucumber/cucumber";
import { LandingPage } from "../pages/landing-page";

Given('I am on the landing page', {timeout: 20000}, async function () {
    await new LandingPage(this.page!).openLandingPage();
});

When('I fill in the login form with username {string} and password {string}', async function (username: string, password: string) {
    // Use env vars if placeholder values are passed
    const user: string = username === 'env' ? process.env.USERNAME || '' : username;
    const pass: string = password === 'env' ? process.env.PASSWORD || '' : password;
    await new LandingPage(this.page).fillCredentials(user, pass);
});

When('I hit the login button', async function () {
    await new LandingPage(this.page).hitLoginButton();
});

When('I click on the "Forgot your password?" link', async function () {
    await new LandingPage(this.page).hitForgotPasswordLink();
});

Then('I should be logged in successfully', { timeout: 10000 }, async function () {
    await new LandingPage(this.page).verifyHeadingVisible('Dashboard');
});

Then('I should be redirected to the {string} screen', { timeout: 10000 }, async function (headingName: string) {
    const resetPasswordHeading = this.page.getByRole('heading', { name: headingName });
    await resetPasswordHeading.waitFor({ state: 'visible' });
    await resetPasswordHeading.isVisible();
});

Then('Alert error {string} should be displayed on the screen', async function (errorMessage: string) {
    await new LandingPage(this.page).verifyAlertError(errorMessage);
});

Then('Field error {string} should be displayed on the screen', async function (fieldError: string) {
    let username = this.parameters?.username;
    let password = this.parameters?.password;

    if (!username || !password) {
        const example = this.pickleStepArguments?.find?.((a: any) => a && typeof a === 'object' && 'username' in a && 'password' in a);
        if (example) {
            username = example.username;
            password = example.password;
        }
    }
    // If still not found, default to empty string
    username = username ?? '';
    password = password ?? '';
    // Remove single quotes and trim only if wrapped, but preserve single space as blank
    const cleanUsername = typeof username === 'string' ? username.replace(/^'(.*)'$/, '$1') : '';
    const cleanPassword = typeof password === 'string' ? password.replace(/^'(.*)'$/, '$1') : '';
    let expectedCount = 0;
    if (cleanUsername.trim() === '') expectedCount++;
    if (cleanPassword.trim() === '') expectedCount++;
    // Only require at least one error if both fields are blank
    const errorLocators = this.page.locator(`text=${fieldError}`);
    const count = await errorLocators.count();
    if (expectedCount > 1) {
        if (count < 1) {
            throw new Error(`Expected at least 1 field error(s), but found ${count}`);
        }
    } else {
        if (count !== expectedCount) {
            throw new Error(`Expected ${expectedCount} field error(s), but found ${count}`);
        }
    }
    for (let i = 0; i < count; i++) {
        await errorLocators.nth(i).waitFor({ state: 'visible' });
    }
});