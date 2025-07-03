import { Page, Locator, expect } from "@playwright/test";
import { CommonPage } from "./common-page";

export class LandingPage extends CommonPage {
    protected page: Page;

    // Landing page locator
    protected usernameTextbox: Locator;
    protected passwordTextbox: Locator;
    protected loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.usernameTextbox = this.page.getByRole('textbox', { name: 'Username' });
        this.passwordTextbox = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
    }

    public async fillCredentials(username: string, password: string) {
        await this.usernameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.page.waitForLoadState();
    }

    public async hitLoginButton() {
        await this.loginButton.click();
        await this.page.waitForLoadState();
        await this.waitForElementVisible(this.dashboardHeading);
    }
}