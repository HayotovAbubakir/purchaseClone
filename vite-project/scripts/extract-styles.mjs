import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://purchase.lookingglasstheatre.org/Events', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(3000);

const data = await page.evaluate(() => {
  const style = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      bg: cs.backgroundColor,
      color: cs.color,
      font: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      textTransform: cs.textTransform,
      padding: cs.padding,
      height: cs.height,
      borderRadius: cs.borderRadius,
      boxShadow: cs.boxShadow,
      letterSpacing: cs.letterSpacing,
    };
  };
  const navLinks = [...document.querySelectorAll('a')].filter(a => a.textContent?.trim() === 'EVENTS' || a.textContent?.includes('GIFT'));
  const subNav = document.querySelector('[class*="subnav"], [class*="SubNav"], [class*="secondary"]');
  const allDivs = [...document.querySelectorAll('div, nav, header')];
  const orangeBar = allDivs.find(el => {
    const bg = getComputedStyle(el).backgroundColor;
    return bg.includes('rgb(255') && bg.includes('140') || bg.includes('rgb(242') || bg.includes('rgb(247') || bg.includes('255, 152') || bg.includes('255, 165') || bg.includes('255, 111');
  });
  const orangeLinks = [...document.querySelectorAll('a')].filter(a => ['EVENTS','GIFT CERTIFICATES','MONTHLY GIVING','DONATE NOW'].includes(a.textContent?.trim()));
  const cards = document.querySelectorAll('[class*="EventCard"], [class*="event-card"], article, .MuiCard-root');
  const card = document.querySelector('.MuiCard-root') || cards[0];
  const bookBtn = [...document.querySelectorAll('a, button')].find(el => el.textContent?.trim() === 'Book Now');
  const pageTitle = document.querySelector('h1, h2, [class*="page-title"], [class*="PageTitle"]');
  const h1s = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span')].filter(el => el.textContent?.trim() === 'EVENTS').map(el => ({
    tag: el.tagName,
    class: el.className,
    ...style(null),
    styles: (() => { const cs = getComputedStyle(el); return { bg: cs.backgroundColor, color: cs.color, font: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight, textTransform: cs.textTransform, letterSpacing: cs.letterSpacing, margin: cs.margin }; })()
  }));
  return {
    orangeBar: orangeBar ? { class: orangeBar.className, ...(() => { const cs = getComputedStyle(orangeBar); return { bg: cs.backgroundColor, height: cs.height, padding: cs.padding }; })() } : null,
    orangeLinks: orangeLinks.map(a => ({
      text: a.textContent?.trim(),
      href: a.getAttribute('href'),
      parentBg: getComputedStyle(a.parentElement).backgroundColor,
      styles: (() => { const cs = getComputedStyle(a); return { bg: cs.backgroundColor, color: cs.color, font: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight, padding: cs.padding, textTransform: cs.textTransform }; })()
    })),
    bookBtn: bookBtn ? (() => { const cs = getComputedStyle(bookBtn); return { bg: cs.backgroundColor, color: cs.color, font: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight, padding: cs.padding, borderRadius: cs.borderRadius, textTransform: cs.textTransform }; })() : null,
    card: card ? (() => { const cs = getComputedStyle(card); return { class: card.className, bg: cs.backgroundColor, borderRadius: cs.borderRadius, boxShadow: cs.boxShadow, width: cs.width }; })() : null,
    pageTitle: h1s,
    cssVars: [...document.styleSheets].flatMap(ss => { try { return [...ss.cssRules].filter(r => r.cssText?.includes('--custom')).map(r => r.cssText); } catch { return []; } }).slice(0, 40),
    rootStyles: style(':root'),
  };
});

writeFileSync('scripts/output/styles.json', JSON.stringify(data, null, 2));
await browser.close();
console.log(JSON.stringify(data, null, 2));
