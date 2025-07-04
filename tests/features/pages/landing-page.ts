import { Page, Locator } from "@playwright/test";
import { CommonPage } from "./common-page";

export class LandingPage extends CommonPage {
    protected page: Page;

    // Landing page locator
    protected usernameTextbox: Locator;
    protected passwordTextbox: Locator;
    protected loginButton: Locator;
    protected forgotPasswordLink: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.usernameTextbox = this.page.getByRole('textbox', { name: 'Username' });
        this.passwordTextbox = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.forgotPasswordLink = this.page.getByText('Forgot your password?');
    }

    public async fillCredentials(username: string, password: string) {
        // If username or password is wrapped in single quotes, extract the value inside
        const cleanUsername = username.match(/^'.*'$/) ? username.slice(1, -1) : username;
        const cleanPassword = password.match(/^'.*'$/) ? password.slice(1, -1) : password;
        await this.usernameTextbox.fill(cleanUsername);
        await this.passwordTextbox.fill(cleanPassword);
        await this.page.waitForLoadState();
    }

    public async hitLoginButton() {
        // Wait for either navigation or dashboard heading to appear (robust for SPA and MPA)
        await Promise.race([
            this.page.waitForLoadState('load').catch(() => {}),
            this.page.waitForSelector('text=Dashboard', { timeout: 15000 }).catch(() => {})
        ]);
        await this.loginButton.click();
    }

    public async hitForgotPasswordLink() {
        await this.waitForElementVisible(this.forgotPasswordLink);
        await this.forgotPasswordLink.click();
        await this.page.waitForLoadState('networkidle');
    }
}