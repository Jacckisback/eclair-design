#!/usr/bin/env node
// Audit visuel d'un site Éclair : captures ordinateur et mobile + relevé chiffré des règles du skill eclair-design.
// Usage : node audit.mjs <url> [url2 …] [--out dossier]
// Prérequis : Playwright (npm i -D playwright && npx playwright install chromium), ou déjà installé globalement.
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const require = createRequire(import.meta.url);
let chromium, devices;
for (const from of [process.cwd() + '/', import.meta.url]) {
  try {
    ({ chromium, devices } = createRequire(from)('playwright'));
    break;
  } catch {}
}
if (!chromium) {
  try {
    ({ chromium, devices } = require('playwright'));
  } catch {
    console.error('Playwright est introuvable. Installe-le : npm i -D playwright && npx playwright install chromium');
    process.exit(2);
  }
}

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const outDir = resolve(outIdx >= 0 ? args.splice(outIdx, 2)[1] : 'eclair-audit');
const urls = args.filter((a) => /^https?:\/\//.test(a));
if (!urls.length) {
  console.error('Usage : node audit.mjs <url> [url2 …] [--out dossier]');
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

// Relevé exécuté dans la page. Reprend les vérifications du Score Design d'Éclair, plus des contrôles de rendu.
function inspect() {
  const HOLLOW = {
    fr: "révolutionnaire|innovant(?:e|s|es)?|de pointe|à la pointe|leader du marché|incontournable|clé en main|synergie|disruptif|disruptive|sans compromis|expérience unique|n[’']attendez plus|inégalé(?:e|s|es)?|boostez|propulsez|solutions? sur mesure|accompagnement personnalisé|n[’']hésitez pas",
    en: 'seamless(?:ly)?|cutting-edge|revolutionary|game-?chang(?:er|ing)|unlock|elevate|empower|leverage|synergy|best-in-class|world-class|next-generation|innovative|supercharge|effortless(?:ly)?|delve|unleash',
    es: 'revolucionari[oa]s?|innovador(?:a|es|as)?|de vanguardia|líder del sector|sin igual|llave en mano|sinergia|disruptiv[oa]s?|experiencia única|de primer nivel|potencia tu|impulsa tu',
    de: 'revolutionär(?:e|en|er)?|innovativ(?:e|en|er)?|bahnbrechend(?:e|en|er)?|nahtlos(?:e|en|er)?|erstklassig(?:e|en|er)?|synergie|ganzheitlich(?:e|en|er)?|spitzenklasse|einzigartiges erlebnis|gamechanger',
    it: "rivoluzionari[oa]|innovativ[oaie]|all[’']avanguardia|leader di settore|senza pari|chiavi in mano|sinergia|esperienza unica|di prim[’']ordine|potenzia",
    pt: 'revolucionári[oa]s?|inovador(?:a|es|as)?|de ponta|líder de mercado|sem igual|chave na mão|sinergia|experiência única|de primeira linha|potencialize|alavanque',
  };
  const words = (s) => (s.trim().match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []).length;
  const css = getComputedStyle(document.documentElement);
  const v = (name) => css.getPropertyValue(name).trim();
  const rgb = (c) => {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillStyle = c;
    const h = ctx.fillStyle;
    if (h.startsWith('#')) return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    return (h.match(/[\d.]+/g) || [0, 0, 0]).slice(0, 3).map(Number);
  };
  const lum = (c) => {
    const [r, g, b] = rgb(c).map((x) => {
      x /= 255;
      return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
    return Math.round(((x + 0.05) / (y + 0.05)) * 100) / 100;
  };
  const main = document.querySelector('main') || document.body;
  // Le texte tel qu'il est écrit, pas tel que la direction l'affiche (titres en capitales par CSS).
  const upperHero = getComputedStyle(main.querySelector('.hero-title') || main).textTransform === 'uppercase';
  const neutral = document.createElement('style');
  neutral.textContent = '*{text-transform:none!important}';
  document.head.append(neutral);
  const text = main.innerText || '';
  const lang = (document.documentElement.lang || 'fr').slice(0, 2);
  const issues = [];
  const add = (level, rule, detail) => issues.push({ level, rule, detail });

  // Identité visuelle
  const direction = v('--hs') !== '';
  const h1 = document.querySelector('h1');
  const headFont = h1 ? getComputedStyle(h1).fontFamily : '';
  const bodyFont = getComputedStyle(document.body).fontFamily;
  const headLoaded = h1 ? document.fonts.check(`${getComputedStyle(h1).fontWeight} 1em ${headFont.split(',')[0]}`) : null;
  const colors = { bg: v('--bg'), surface: v('--bg-soft'), text: v('--text'), muted: v('--muted'), accent: v('--accent'), onAccent: v('--on-accent') };
  const contrast = colors.bg && colors.text ? {
    text: ratio(colors.text, colors.bg),
    muted: colors.muted ? ratio(colors.muted, colors.bg) : null,
    button: colors.accent && colors.onAccent ? ratio(colors.onAccent, colors.accent) : null,
  } : null;
  if (!direction) add('ok', 'direction', 'Thème classique : choisis une direction artistique (Réglages › Apparence).');
  if (headLoaded === false) add('ok', 'police', `La police de titre (${headFont.split(',')[0]}) n'est pas chargée : police de secours affichée (téléchargement bloqué ?).`);
  if (contrast && contrast.text < 7) add('bad', 'contraste', `Texte à ${contrast.text}:1 sur le fond (7:1 attendu).`);
  if (contrast && contrast.muted !== null && contrast.muted < 4.5) add('bad', 'contraste', `Texte secondaire à ${contrast.muted}:1 (4,5:1 attendu).`);

  // Titres
  const hs = [...main.querySelectorAll('h1,h2,h3,h4')].filter((h) => h.offsetParent !== null);
  const h1s = document.querySelectorAll('h1').length;
  if (h1s !== 1) add('bad', 'titres', `${h1s} H1 sur la page (1 attendu).`);
  let prev = 1, skips = 0;
  for (const h of hs) {
    const lvl = +h.tagName[1];
    if (lvl > prev + 1) skips++;
    prev = lvl;
  }
  if (skips) add('bad', 'titres', `${skips} saut(s) de niveau dans les intertitres.`);
  const longH = hs.filter((h) => h.tagName !== 'H1' && words(h.innerText) > 12).map((h) => h.innerText.trim());
  if (longH.length) add('ok', 'titres', `Intertitres de plus de 12 mots : ${longH.slice(0, 3).join(' | ')}`);
  const emojiH = hs.filter((h) => /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(h.innerText)).length;
  if (emojiH) add('ok', 'titres', `${emojiH} intertitre(s) avec un émoji.`);

  // Bannière
  const hero = main.querySelector('.hero');
  const heroInfo = hero ? {
    title: hero.querySelector('.hero-title')?.innerText.trim() || '',
    words: words(hero.querySelector('.hero-title')?.innerText || ''),
    buttons: hero.querySelectorAll('.btn').length,
    image: !!hero.querySelector('.hero-img img'),
    upper: upperHero,
  } : null;
  if (heroInfo) {
    const max = heroInfo.upper ? 6 : 8;
    if (heroInfo.words > max) add(heroInfo.words > max + 6 ? 'bad' : 'ok', 'bannière', `Titre de bannière de ${heroInfo.words} mots (${max} au plus) : « ${heroInfo.title} ».`);
    if (!heroInfo.buttons) add('ok', 'bannière', 'Bannière sans bouton d’action.');
    if (!heroInfo.image) add('ok', 'bannière', 'Bannière sans image (obligatoire en plein cadre et éditorial).');
  }

  // Appels à l'action, atouts
  const buttons = main.querySelectorAll('.btn').length;
  if (buttons > 3) add(buttons > 5 ? 'bad' : 'ok', 'boutons', `${buttons} boutons dans la page (3 au plus).`);
  const features = [...main.querySelectorAll('.features')].map((f) => {
    const items = [...f.querySelectorAll('.feature')];
    return { items: items.length, bare: items.filter((i) => !i.querySelector('p') || !i.querySelector('p').innerText.trim()).length, noIcon: items.filter((i) => !i.querySelector('.feature-icon svg, .feature-icon')).length };
  });
  features.forEach((f, i) => {
    if (f.items < 3 || f.items > 6) add('ok', 'atouts', `Bloc Atouts n° ${i + 1} : ${f.items} éléments (3 à 6).`);
    if (f.bare) add('ok', 'atouts', `Bloc Atouts n° ${i + 1} : ${f.bare} atout(s) sans description.`);
  });

  // Texte
  const re = HOLLOW[lang] ? new RegExp(`(?<![\\p{L}\\p{N}])(?:${HOLLOW[lang]})(?![\\p{L}\\p{N}])`, 'giu') : null;
  const hollow = re ? [...new Set((text.match(re) || []).map((s) => s.toLowerCase()))] : [];
  if (hollow.length) add(hollow.length >= 3 ? 'bad' : 'ok', 'texte', `Formules creuses : ${hollow.join(', ')}.`);
  const total = words(text);
  const dashes = (text.match(/—/g) || []).length;
  if (total >= 150 && dashes > Math.max(2, Math.floor(total / 150))) add('ok', 'texte', `${dashes} tirets cadratins.`);
  const caps = text.match(/(?:(?<!\p{L})\p{Lu}{2,}(?!\p{L})[\s,’'-]+){3,}\p{Lu}{2,}(?!\p{L})/gu) || [];
  if (caps.length) add('ok', 'texte', `${caps.length} passage(s) en MAJUSCULES dans le HTML.`);
  let run = 0, wall = 0;
  for (const el of main.querySelectorAll('.content > *, article > *')) {
    run = el.tagName === 'P' ? run + words(el.innerText) : 0;
    wall = Math.max(wall, run);
  }
  if (wall > 350) add(wall > 600 ? 'bad' : 'ok', 'rythme', `Mur de texte de ${wall} mots.`);

  // Rendu
  const imgs = [...main.querySelectorAll('img')];
  const noAlt = imgs.filter((i) => !i.hasAttribute('alt')).length;
  if (noAlt) add('bad', 'images', `${noAlt} image(s) sans attribut alt.`);
  const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
  if (overflow) add('bad', 'mise en page', `Débordement horizontal : ${document.documentElement.scrollWidth}px pour ${document.documentElement.clientWidth}px.`);
  const small = innerWidth < 600 ? [...document.querySelectorAll('a,button,input,select,textarea')].filter((e) => {
    const r = e.getBoundingClientRect();
    return r.width && r.height && r.height < 24 && !e.closest('p,li,td,.crumbs,.meta,.footer-bottom');
  }).length : 0;
  if (small) add('ok', 'mobile', `${small} cible(s) tactile(s) de moins de 24 px de haut hors texte.`);
  neutral.remove();
  const inlineCss = [...document.querySelectorAll('style')].reduce((n, s) => n + s.textContent.length, 0);

  return {
    title: document.title, lang, theme: document.body.className, direction, headFont, bodyFont, headLoaded, colors, contrast,
    hero: heroInfo, buttons, features, words: total, inlineCssKb: Math.round(inlineCss / 102.4) / 10, issues,
  };
}

const browser = await chromium.launch();
const report = [];
try {
  for (const [i, url] of urls.entries()) {
    const slug = String(i + 1).padStart(2, '0') + '-' + (new URL(url).pathname.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'accueil');
    const entry = { url };
    for (const [name, opts] of [
      ['ordinateur', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
      ['mobile', { ...devices['iPhone 13'] }],
    ]) {
      // bypassCSP : la politique stricte d'Éclair bloquerait le style de lecture injecté par le relevé.
      const ctx = await browser.newContext({ ...opts, reducedMotion: 'reduce', bypassCSP: true });
      const page = await ctx.newPage();
      const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: join(outDir, `${slug}-${name}-ecran.png`) });
      await page.screenshot({ path: join(outDir, `${slug}-${name}-page.png`), fullPage: true });
      entry[name] = { status: res?.status(), ...(await page.evaluate(inspect)) };
      await ctx.close();
    }
    report.push(entry);
  }
} finally {
  await browser.close();
}

writeFileSync(join(outDir, 'rapport.json'), JSON.stringify(report, null, 2));
const lines = [];
for (const r of report) {
  const d = r.ordinateur;
  lines.push(`\n## ${r.url}\n`);
  lines.push(`- Titre : ${d.title} · langue ${d.lang} · ${d.direction ? 'direction artistique' : 'thème classique'} (${d.theme || 'aucune classe'})`);
  lines.push(`- Titres : ${d.headFont.split(',')[0]}${d.headLoaded === false ? ' (non chargée)' : ''} · texte : ${d.bodyFont.split(',')[0]}`);
  lines.push(`- Couleurs : fond ${d.colors.bg} · bandes ${d.colors.surface} · texte ${d.colors.text} · secondaire ${d.colors.muted} · accent ${d.colors.accent}`);
  if (d.contrast) lines.push(`- Contrastes : texte ${d.contrast.text}:1 · secondaire ${d.contrast.muted}:1 · bouton ${d.contrast.button}:1`);
  if (d.hero) lines.push(`- Bannière : « ${d.hero.title} » (${d.hero.words} mots) · ${d.hero.buttons} bouton(s) · ${d.hero.image ? 'avec' : 'sans'} image`);
  lines.push(`- ${d.words} mots · ${d.buttons} bouton(s) · ${d.features.length} bloc(s) Atouts · CSS en ligne ${d.inlineCssKb} Ko`);
  const seen = new Set();
  const issues = [...d.issues, ...r.mobile.issues.map((x) => ({ ...x, detail: '[mobile] ' + x.detail }))]
    .filter((x) => !seen.has(x.detail.replace('[mobile] ', '')) && seen.add(x.detail.replace('[mobile] ', '')));
  lines.push(issues.length ? '\n' + issues.map((x) => `- ${x.level === 'bad' ? '🔴' : '🟠'} **${x.rule}** : ${x.detail}`).join('\n') : '\n- ✅ Aucune alerte.');
}
writeFileSync(join(outDir, 'rapport.md'), '# Audit Éclair Design\n' + lines.join('\n') + '\n');
console.log(lines.join('\n'));
console.log(`\nCaptures et rapport : ${outDir}`);
