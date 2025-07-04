import { Given, When, Then } from "@cucumber/cucumber";
import { LandingPage } from "../pages/landing-page";

Given('I am on the landing page', { timeout: 10000 }, async function () {
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

Then('I should be logged in successfully', { timeout: 10000 }, async function () {
    await new LandingPage(this.page).verifyDashboardHeadingVisible();
});