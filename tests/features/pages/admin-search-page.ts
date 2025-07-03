import { Page, Locator, expect } from "@playwright/test";
import { CommonPage } from "./common-page";

const QA_WEB = 'https://opensource-demo.orangehrmlive.com/';

export class AdminSearchPage extends CommonPage {
    protected page: Page;
    protected usernameTextbox: Locator;
    protected searchButton: Locator;

    // Error
    protected noRecordFoundMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.usernameTextbox = this.page.getByText('System UsersUsernameUser Role').getByRole('textbox').nth(0);
        this.noRecordFoundMessage = this.page.getByText('No Records Found');
        this.searchButton = this.page.getByRole('button', { name: 'Search' });
    }

    public async searchByUsername(
        username?: string
    ) {
        if (username !== undefined) {
            await this.usernameTextbox.fill(username);
        }
        await this.searchButton.click();
        await this.page.waitForLoadState();
    }

    public async verifyAdminSearchResultsVisible() {
        await expect(this.noRecordFoundMessage).not.toBeVisible();
    }
}