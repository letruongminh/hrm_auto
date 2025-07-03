import { Before, After } from '@cucumber/cucumber';
import { CustomWorld } from './custom-world';
import * as fs from 'fs';

Before(async function (this: CustomWorld) {
  await this.init(); 
});

After(async function (this: CustomWorld & { attach?: Function }, scenario) {
  if (scenario.result?.status === 'FAILED' && this.page) {
    const dir = 'reports/screenshots';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const screenshot = await this.page.screenshot({ path: `${dir}/${Date.now()}.png`, fullPage: true });
    if (this.attach) {
      await this.attach(screenshot, 'image/png');
    }
  }
  await this.cleanup();
});
