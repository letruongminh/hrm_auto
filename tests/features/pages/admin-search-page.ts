import { Page, Locator, expect } from "@playwright/test";
import { CommonPage } from "./common-page";

export class AdminSearchPage extends CommonPage {
    protected page: Page;
    protected usernameTextbox: Locator;
    protected searchButton: Locator;
    protected employeeNameTextbox: Locator;

    // Error
    protected noRecordFoundMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.usernameTextbox = this.page.getByText('System UsersUsernameUser Role').getByRole('textbox').nth(0);
        this.employeeNameTextbox = this.page.locator('div').filter({ hasText: /^Employee Name$/ }).nth(1).getByRole('textbox');
        this.noRecordFoundMessage = this.page.getByText('No Records Found');
        this.searchButton = this.page.getByRole('button', { name: 'Search' });
    }

    public async searchByTextboxField(
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

    /**
     * Search by a given field name and value. Supports 'username' and 'employeename'.
     */
    public async searchByField(fieldName: string, fieldVal: string) {
        if (fieldName === 'username') {
            await this.usernameTextbox.fill(fieldVal);
        } else if (fieldName === 'employee name') {
            await this.employeeNameTextbox.fill(fieldVal);
        } else {
            throw new Error(`Unsupported field name: ${fieldName}`);
        }
    }

    public async hitSearchButton() {
        await this.searchButton.click();
        await this.page.waitForLoadState();
    }
}