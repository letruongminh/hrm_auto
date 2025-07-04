import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  async init() {
    const browserType = process.env.BROWSER || 'chromium';
    let browserLauncher;
    switch (browserType) {
      case 'firefox':
        browserLauncher = firefox;
        break;
      case 'webkit':
        browserLauncher = webkit;
        break;
      case 'chromium':
      default:
        browserLauncher = chromium;
    }
    this.browser = await browserLauncher.launch({ headless: false });
    this.context = await this.browser.newContext({
      recordVideo: { dir: 'reports/videos/' },
    });
    this.page = await this.context.newPage();
  }

  async cleanup() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
