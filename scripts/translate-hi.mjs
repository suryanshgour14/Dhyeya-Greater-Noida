#!/usr/bin/env node
/**
 * Auto-translates locales/en/*.json → locales/hi/*.json
 * Uses free Google Translate (no API key required).
 *
 * Usage:
 *   node scripts/translate-hi.mjs              # translate all files
 *   node scripts/translate-hi.mjs --file home  # translate only home.json
 *
 * After running, search locales/hi/ for any coaching-specific terms that
 * auto-translate poorly (e.g. "Prelims" → "प्रारंभिक" is fine;
 * "Mains" → check it looks right, etc.).
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT    = join(__dirname, '..');
const EN_DIR  = join(ROOT, 'locales', 'en');
const HI_DIR  = join(ROOT, 'locales', 'hi');

// These terms must NOT be translated — they stay in English inside the Hindi text.
const PRESERVE_RE = /\b(UPSC|IAS|IPS|IFS|IRS|UPPSC|UKPSC|BPSC|MPPSC|MPSC|HPSC|RAS|KAS|AIR|GS|CSAT|Dhyeya|Prelims|Mains|Rank)\b/g;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function translateText(text) {
  if (!text || typeof text !== 'string' || !text.trim()) return text;

  // Replace proper nouns with numbered placeholders
  const preserved = [];
  const masked = text.replace(PRESERVE_RE, (m) => {
    preserved.push(m);
    return `__P${preserved.length - 1}__`;
  });

  const url =
    `https://translate.googleapis.com/translate_a/single` +
    `?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(masked)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // data[0] is an array of [translatedChunk, originalChunk] pairs
    let result = data[0].map((seg) => seg[0]).join('');

    // Put proper nouns back
    preserved.forEach((term, i) => {
      result = result.replace(new RegExp(`__P${i}__`, 'g'), term);
    });

    return result;
  } catch {
    console.warn(`  ⚠  Failed to translate: "${text.slice(0, 50)}" — keeping English`);
    return text;
  }
}

async function translateValue(value) {
  if (typeof value === 'string')  return translateText(value);
  if (Array.isArray(value)) {
    const out = [];
    for (const item of value) out.push(await translateValue(item));
    return out;
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = await translateValue(v);
      await sleep(120); // gentle pacing — avoids Google rate-limit
    }
    return out;
  }
  return value; // numbers, booleans, null — untouched
}

async function translateFile(name) {
  const filename = name.endsWith('.json') ? name : `${name}.json`;
  const src = join(EN_DIR, filename);
  const dst = join(HI_DIR, filename);

  let en;
  try {
    en = JSON.parse(readFileSync(src, 'utf8').replace(/^﻿/, ''));
  } catch (e) {
    console.error(`  ✗ Skipping ${filename} — ${e.message}`);
    return;
  }

  console.log(`\n📄  ${filename}`);
  const hi = await translateValue(en);

  mkdirSync(HI_DIR, { recursive: true });
  writeFileSync(dst, JSON.stringify(hi, null, 2) + '\n', 'utf8');
  console.log(`    ✓ Written → locales/hi/${filename}`);
}

// ─── main ────────────────────────────────────────────────────────────────────

const args    = process.argv.slice(2);
const fileIdx = args.indexOf('--file');
const target  = fileIdx !== -1 ? args[fileIdx + 1] : null;

const files = target
  ? [target]
  : readdirSync(EN_DIR).filter((f) => f.endsWith('.json'));

console.log(`\n🌐  Translating ${files.length} file(s)  EN → HI\n`);

for (const f of files) {
  await translateFile(f);
}

console.log('\n✅  Done!');
console.log('   Review locales/hi/ — fix any terms that sound unnatural in context.\n');
