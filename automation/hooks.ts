import { Before, After, AfterStep } from '@cucumber/cucumber';
import { CustomWorld } from './custom-world';
import * as fs from 'fs';
import path from 'path';

// Utility to ensure a directory exists
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Utility to sanitize filenames
function sanitizeFilename(text: string) {
  return text.replace(/[^a-zA-Z0-9-_]/g, '_').slice(0, 80);
}

Before(async function (this: CustomWorld) {
  ensureDir('reports/screenshots');
  ensureDir('reports/videos');
  await this.init();
});

AfterStep(async function (this: CustomWorld & { attach?: Function }, step) {
  if (this.page) {
    ensureDir('reports/screenshots');
    const stepText = step?.pickleStep?.text || 'step';
    const filename = `reports/screenshots/${Date.now()}-${sanitizeFilename(stepText)}.png`;
    const screenshot = await this.page.screenshot({ path: filename, fullPage: true });
    if (this.attach) {
      await this.attach(screenshot, 'image/png');
    }
  }
});

After(async function (this: CustomWorld & { attach?: Function }, scenario) {
  if (scenario.result?.status === 'FAILED' && this.page) {
    ensureDir('reports/screenshots');
    const scenarioName = scenario.pickle?.name || 'scenario';
    const filename = `reports/screenshots/${Date.now()}-${sanitizeFilename(scenarioName)}-FAILED.png`;
    const screenshot = await this.page.screenshot({ path: filename, fullPage: true });
    if (this.attach) {
      await this.attach(screenshot, 'image/png');
    }
    // Attach video if available
    if (this.page && this.page.video) {
      const video = this.page.video();
      if (video) {
        const videoPath = await video.path();
        if (videoPath && fs.existsSync(videoPath)) {
          const videoBuffer = fs.readFileSync(videoPath);
          if (this.attach) {
            await this.attach(videoBuffer, 'video/webm');
          }
        }
      }
    }
  }
  await this.cleanup();
});
