import { Before, After, AfterStep } from '@cucumber/cucumber';
import { CustomWorld } from './custom-world';
import * as fs from 'fs';

Before(async function (this: CustomWorld) {
  const dir = 'reports/screenshots';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await this.init(); 
});

AfterStep(async function (this: CustomWorld & { attach?: Function }, step) {
  if (this.page) {
    const dir = 'reports/screenshots';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filename = `${dir}/${Date.now()}-${step.pickleStep.text.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    const screenshot = await this.page.screenshot({ path: filename, fullPage: true });
    if (this.attach) {
      await this.attach(screenshot, 'image/png');
    }
  }
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
