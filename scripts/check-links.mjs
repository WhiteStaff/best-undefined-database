#!/usr/bin/env node
// Проверка относительных ссылок в отслеживаемых Markdown-файлах BUDB.
//
// Что делает:
//   - берёт список файлов `*.md` из `git ls-files`;
//   - находит ссылки `[текст](путь)`, `![альт](путь)`, `[текст](путь#якорь)` и определения
//     `[id]: путь`; код (блоки ``` и ~~~, фрагменты в обратных кавычках) пропускается;
//   - проверяет, что файл или каталог, на который указывает путь, существует (регистр имени
//     учитывается, как на Linux, чтобы CI на ubuntu не расходился с Windows и macOS);
//   - якоря `#раздел` не проверяются; ссылки `http(s):`, `mailto:` и любые другие со схемой,
//     а также ссылки вида `#якорь` пропускаются.
// Код выхода: 0 — битых ссылок нет; 1 — есть (список печатается); 2 — ошибка запуска.
//
// Запуск из любого каталога (Node ≥ 18, без зависимостей):
//   node scripts/check-links.mjs

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, isAbsolute, join, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function trackedMarkdown() {
  const out = execFileSync('git', ['ls-files', '-z', '--', '*.md'], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  return out.split('\0').filter(Boolean);
}

const dirCache = new Map();
function entries(dir) {
  if (!dirCache.has(dir)) {
    let names = [];
    try {
      names = readdirSync(dir);
    } catch {
      names = [];
    }
    dirCache.set(dir, new Set(names));
  }
  return dirCache.get(dir);
}

// Существует ли путь внутри репозитория; каждый сегмент сверяется с точным регистром.
function existsExact(abs) {
  const rel = relative(ROOT, abs);
  if (rel === '') return true;
  if (rel === '..' || rel.startsWith('..' + sep) || isAbsolute(rel)) return false;
  let cur = ROOT;
  for (const seg of rel.split(sep)) {
    if (!entries(cur).has(seg)) return false;
    cur = join(cur, seg);
  }
  return existsSync(abs);
}

const SCHEME = /^[a-zA-Z][a-zA-Z0-9+.-]*:/;
const INLINE = /\]\(\s*(<[^>]*>|[^)\s]*)(?:\s+(?:"[^"]*"|'[^']*'))?\s*\)/g;
const DEFINITION = /^\s{0,3}\[[^\]]+\]:\s*(<[^>]*>|\S+)/;

function* linksOf(text) {
  let fence = null;
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const f = raw.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (f) {
      if (!fence) fence = f[1][0];
      else if (f[1][0] === fence) fence = null;
      continue;
    }
    if (fence) continue;
    const line = raw.replace(/`[^`]*`/g, (m) => ' '.repeat(m.length));
    for (const m of line.matchAll(INLINE)) yield [i + 1, m[1]];
    const d = line.match(DEFINITION);
    if (d) yield [i + 1, d[1]];
  }
}

function checkTarget(file, target) {
  let t = target.trim();
  if (t.startsWith('<') && t.endsWith('>')) t = t.slice(1, -1).trim();
  if (t === '' || t.startsWith('#') || SCHEME.test(t) || t.startsWith('//')) return null;
  t = t.split('#')[0].split('?')[0];
  if (t === '') return null;
  try {
    t = decodeURIComponent(t);
  } catch {
    /* оставляем как есть */
  }
  const abs = t.startsWith('/') ? join(ROOT, t) : resolve(ROOT, dirname(file), t);
  return existsExact(abs) ? null : t;
}

let files;
try {
  files = trackedMarkdown();
} catch (e) {
  console.error(`check-links: не удалось получить список файлов из git: ${e.message}`);
  process.exit(2);
}

const broken = [];
let checked = 0;
for (const file of files) {
  const abs = join(ROOT, file);
  if (!existsSync(abs)) continue; // удалён в рабочем каталоге, но ещё в индексе
  for (const [line, target] of linksOf(readFileSync(abs, 'utf8'))) {
    checked++;
    const bad = checkTarget(file, target);
    if (bad !== null) broken.push(`${file}:${line}: ${target}`);
  }
}

if (broken.length > 0) {
  console.error(`check-links: битых ссылок: ${broken.length}`);
  for (const b of broken) console.error(`  ${b}`);
  process.exit(1);
}
console.log(`check-links: ${files.length} файлов *.md, ${checked} ссылок, битых нет`);
