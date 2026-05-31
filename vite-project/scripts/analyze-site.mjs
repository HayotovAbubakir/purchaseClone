import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';

const BASE = 'https://purchase.lookingglasstheatre.org';
const routes = ['/Events', '/GiftVouchers', '/Donations', '/Basket', '/LoginLogout'];

mkdirSync('scripts/output', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const styles = {};
for (const route of routes) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(3000);
  const name = route.replace(/\//g, '_').slice(1);
  await page.screenshot({ path: `scripts/output/${name}.png`, fullPage: true });

  styles[route] = await page.evaluate(() => {
    const getStyles = (el) => {
      if (!el) return null;
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName,
        class: el.className,
        text: el.textContent?.trim().slice(0, 100),
        bg: cs.backgroundColor,
        color: cs.color,
        font: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        padding: cs.padding,
        height: cs.height,
      };
    };
    const header = document.querySelector('header') || document.querySelector('[class*="AppBar"]') || document.querySelector('nav');
    const nav2 = document.querySelectorAll('nav, [class*="nav"], [class*="Nav"]');
    const links = [...document.querySelectorAll('a')].slice(0, 30).map((a) => ({
      text: a.textContent?.trim(),
      href: a.getAttribute('href'),
    }));
    const buttons = [...document.querySelectorAll('button')].slice(0, 20).map((b) => b.textContent?.trim());
    const cards = document.querySelectorAll('[class*="card"], [class*="Card"], article');
    return {
      title: document.title,
      header: getStyles(header),
      allNavs: [...nav2].map((n) => getStyles(n)),
      links,
      buttons,
      cardCount: cards.length,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      html: document.querySelector('main')?.innerHTML?.slice(0, 2000) || document.body.innerHTML.slice(0, 3000),
    };
  });
}

writeFileSync('scripts/output/analysis.json', JSON.stringify(styles, null, 2));
await browser.close();
console.log('done');
