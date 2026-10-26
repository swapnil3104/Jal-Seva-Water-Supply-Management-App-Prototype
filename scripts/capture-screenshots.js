import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '..', 'screenshots');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const routes = [
  { name: '01-welcome-landing.png', path: '/', width: 1280, height: 850 },
  { name: '02-citizen-dashboard.png', path: '/citizen', width: 1280, height: 950 },
  { name: '03-water-schedule.png', path: '/schedule', width: 1280, height: 950 },
  { name: '04-new-complaint.png', path: '/complaints/new', width: 1280, height: 950 },
  { name: '05-complaint-tracking.png', path: '/complaints/JS-2026-001', width: 1280, height: 950 },
  { name: '06-bills-payment.png', path: '/bills', width: 1280, height: 950 },
  { name: '07-emergency-tanker.png', path: '/tanker-request', width: 1280, height: 950 },
  { name: '08-admin-dashboard.png', path: '/admin', width: 1280, height: 950 },
  { name: '09-admin-complaints.png', path: '/admin/complaints', width: 1280, height: 950 },
  { name: '10-admin-tanker-dispatch.png', path: '/admin/tanker-requests', width: 1280, height: 950 },
  { name: '11-mobile-citizen-home.png', path: '/citizen', width: 412, height: 915, isMobile: true }
];

async function dismissSplashIfVisible(page) {
  try {
    const skipBtn = await page.$('button[aria-label="Skip start screen"]');
    if (skipBtn) {
      await skipBtn.click();
      await new Promise(r => setTimeout(r, 600));
    }
  } catch (e) {
    // ignore
  }
}

async function capture() {
  console.log('Launching Chrome for screenshot capture...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // First capture splash screen
  console.log('Capturing 00-splash-screen.png...');
  await page.setViewport({ width: 1280, height: 850, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outputDir, '00-splash-screen.png') });

  // Now capture each route with splash dismissed
  for (const item of routes) {
    console.log(`Capturing ${item.name} from ${item.path}...`);
    await page.setViewport({
      width: item.width,
      height: item.height,
      deviceScaleFactor: 2,
      isMobile: !!item.isMobile
    });

    try {
      await page.goto(`http://localhost:5174${item.path}`, {
        waitUntil: 'networkidle0',
        timeout: 15000
      });
      
      // Dismiss splash if present
      await dismissSplashIfVisible(page);

      // Wait a moment for layout stabilization & animations
      await new Promise(r => setTimeout(r, 1000));

      const filePath = path.join(outputDir, item.name);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`Saved: ${filePath}`);
    } catch (err) {
      console.error(`Error capturing ${item.name}:`, err.message);
    }
  }

  // Also capture services modal
  try {
    console.log('Capturing 12-services-modal.png...');
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
    await page.goto('http://localhost:5174/citizen', { waitUntil: 'networkidle0' });
    await dismissSplashIfVisible(page);
    const servicesBtn = await page.$('button[aria-label="जल सेवा सुलभ नेव्हिगेशन व सर्व सेवा"], button[aria-label="Open Services Navigation"]');
    if (servicesBtn) {
      await servicesBtn.click();
      await new Promise(r => setTimeout(r, 800));
      await page.screenshot({ path: path.join(outputDir, '12-services-modal.png') });
      console.log('Saved 12-services-modal.png');
    }
  } catch (err) {
    console.error('Error capturing services modal:', err.message);
  }

  await browser.close();
  console.log('Finished capturing all screenshots!');
}

capture().catch(console.error);
