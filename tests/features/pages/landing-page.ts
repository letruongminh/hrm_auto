import { Page, Locator } from "@playwright/test";
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
        // Wait for either navigation or dashboard heading to appear (robust for SPA and MPA)
        await Promise.race([
            this.page.waitForLoadState('load').catch(() => {}),
            this.page.waitForSelector('text=Dashboard', { timeout: 15000 }).catch(() => {})
        ]);
        await this.loginButton.click();
    }

    public async hitForgotPasswordLink() {
        const forgotPasswordLink = this.page.getByText('Forgot your password?');
        await this.waitForElementVisible(forgotPasswordLink);
        await forgotPasswordLink.click();
        await this.page.waitForLoadState('networkidle');
    }
}