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
})