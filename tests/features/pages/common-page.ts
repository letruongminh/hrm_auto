import { Page, Locator, expect } from "@playwright/test";

const QA_WEB = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/';

export class CommonPage {
    protected page: Page;
    protected dashboardHeading: Locator;

    // Side Menu bar
    protected adminSearchMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardHeading = this.page.getByRole('heading', { name: 'Dashboard' });
        this.adminSearchMenu = this.page.getByRole('link', { name: 'Admin' });
    }

    async waitForElementVisible(locator: Locator, timeout = 10000) {
        await locator.waitFor({ state: 'visible', timeout });
    }

    public async verifyDashboardHeadingVisible() {
        await this.waitForElementVisible(this.dashboardHeading);
        await expect(this.dashboardHeading).toBeVisible();
    }

    public async openLandingPage() {
        await this.page.goto(QA_WEB, { waitUntil: 'networkidle' });
    }

    public async accessMenu(menuName: string) {
        const menuLocator = this.page.getByRole('link', { name: menuName });
        await this.waitForElementVisible(menuLocator);
        await menuLocator.click();
        await this.waitForElementVisible(menuLocator)
    }
}