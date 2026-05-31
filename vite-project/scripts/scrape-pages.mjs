import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';

const BASE = 'https://purchase.lookingglasstheatre.org';
const pages = [
  { route: '/Donations?Attribute_SLExcludeFromDonationsPage=0', name: 'Donations' },
  { route: '/LoginLogout', name: 'LoginLogout' },
  { route: '/Memberships', name: 'Memberships' },
];

mkdirSync('scripts/output', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const report = {};
for (const { route, name } of pages) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `scripts/output/${name}.png`, fullPage: true });

  report[name] = await page.evaluate(() => {
    const main = document.querySelector('main') || document.querySelector('#main') || document.body;
    const title = document.querySelector('h1, .custom-title');
    const inputs = [...document.querySelectorAll('input, select, textarea, button')].map((el) => ({
      tag: el.tagName,
      type: el.type || el.getAttribute('role'),
      name: el.name,
      placeholder: el.placeholder,
      label: el.labels?.[0]?.textContent?.trim() || el.getAttribute('aria-label'),
      text: el.textContent?.trim().slice(0, 80),
      class: el.className?.slice?.(0, 80),
    }));
    const labels = [...document.querySelectorAll('label, .MuiFormLabel-root, p, span, h1, h2, h3, legend')].map((el) => ({
      tag: el.tagName,
      text: el.textContent?.trim().slice(0, 120),
      class: el.className?.slice?.(0, 60),
    })).filter((l) => l.text && l.text.length > 2 && l.text.length < 120);
    const forms = [...document.querySelectorAll('form')].map((f) => f.innerHTML.slice(0, 3000));
    const iframes = [...document.querySelectorAll('iframe')].map((f) => ({ src: f.src, id: f.id, class: f.className }));
    const buttons = [...document.querySelectorAll('button, a.MuiButton-root, input[type=submit]')].map((b) => ({
      text: b.textContent?.trim() || b.value,
      class: b.className?.slice?.(0, 80),
    })).filter((b) => b.text);
    const mainHtml = main.innerHTML.slice(0, 8000);
    const mainText = main.innerText.slice(0, 4000);
    return {
      title: title?.textContent?.trim(),
      titleClass: title?.className,
      inputs: inputs.slice(0, 40),
      labels: labels.slice(0, 50),
      buttons: buttons.slice(0, 30),
      forms: forms.length,
      iframes,
      mainText,
      mainHtml,
    };
  });
}

writeFileSync('scripts/output/pages-detail.json', JSON.stringify(report, null, 2));
await browser.close();
console.log('done');
