import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LandingPage } from "../pages/landing-page";

Given('I am on the landing page', { timeout: 10000 }, async function () {
    await new LandingPage(this.page!).openLandingPage();
});

When('I fill in the login form with username {string} and password {string}', async function (username: string, password: string) {
    await new LandingPage(this.page).fillCredentials(username, password);
});

When('I hit the login button', async function () {
    await new LandingPage(this.page).hitLoginButton();
});

Then('I should be logged in successfully', { timeout: 10000 }, async function () {
    await new LandingPage(this.page).verifyDashboardHeadingVisible();
});