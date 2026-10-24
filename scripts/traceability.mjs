#!/usr/bin/env node
// Генератор матрицы трассировки BUDB: CUJ → требования, требование → ADR,
// требования без CUJ, CUJ без требований, сводка по capability.
//
// Источники (только чтение):
//   openspec/changes/<change>/specs/*/spec.md — требования `### Requirement: <ID> <название>`,
//     строка `Трассировка: CUJ-NN[, …]; ADR-NNNN[, …]; D-NNN[, …]` и сценарии `#### Scenario:`;
//   docs/cuj.md — заголовки `## CUJ-NN. <название>`.
// Результат: docs/traceability.md (перезаписывается целиком).
//
// Запуск из любого каталога (Node ≥ 18, без зависимостей):
//   node scripts/traceability.mjs            — перегенерировать docs/traceability.md
//   node scripts/traceability.mjs --check    — то же, плюс код выхода 1, если есть требования
//                                              без CUJ, CUJ без требований, требования без
//                                              сценариев или повторяющиеся ID
//   node scripts/traceability.mjs --stdout   — вывести матрицу в stdout, файл не трогать
//   node scripts/traceability.mjs --change <id> — другой change (по умолчанию add-phonebook-db-v1)

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};

const CHANGE = opt('--change', 'add-phonebook-db-v1');
const SPECS_DIR = join(ROOT, 'openspec', 'changes', CHANGE, 'specs');
const CUJ_FILE = join(ROOT, 'docs', 'cuj.md');
const ADR_DIR = join(ROOT, 'docs', 'adr');
const OUT_FILE = join(ROOT, 'docs', 'traceability.md');

const rel = (p) => relative(ROOT, p).split('\\').join('/');
const read = (p) => readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const uniq = (xs) => [...new Set(xs)];
const byNum = (a, b) => a.localeCompare(b, 'en', { numeric: true });

// ---------- CUJ ----------
function parseCujs() {
  const cujs = new Map(); // id -> title
  for (const line of read(CUJ_FILE).split('\n')) {
    const m = line.match(/^##\s+(CUJ-\d{2})\.\s*(.+?)\s*$/);
    if (m) cujs.set(m[1], m[2]);
  }
  return cujs;
}

// ---------- ADR ----------
function parseAdrs() {
  const adrs = new Map(); // '0003' -> {file, title}
  if (!existsSync(ADR_DIR)) return adrs;
  for (const f of readdirSync(ADR_DIR).sort()) {
    const m = f.match(/^(\d{4})-.+\.md$/);
    if (!m) continue;
    const title = (read(join(ADR_DIR, f)).match(/^#\s+\d{4}\.\s*(.+)$/m) || [, f])[1].trim();
    adrs.set(m[1], { file: f, title });
  }
  return adrs;
}

// ---------- Требования ----------
function parseSpecs() {
  const caps = readdirSync(SPECS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(SPECS_DIR, d.name, 'spec.md')))
    .map((d) => d.name)
    .sort();
  const reqs = [];
  for (const cap of caps) {
    const file = join(SPECS_DIR, cap, 'spec.md');
    let cur = null;
    for (const line of read(file).split('\n')) {
      const h = line.match(/^###\s+Requirement:\s*(\S+)\s*(.*)$/);
      if (h) {
        cur = { id: h[1], title: h[2].trim(), cap, file: rel(file), cujs: [], adrs: [], decisions: [], scenarios: 0, traced: false };
        reqs.push(cur);
        continue;
      }
      if (/^##\s/.test(line) && !/^###/.test(line)) { cur = null; continue; }
      if (!cur) continue;
      if (/^####\s+Scenario:/.test(line)) { cur.scenarios++; continue; }
      const t = line.match(/^\s*Трассировка:\s*(.*)$/);
      if (t) {
        cur.traced = true;
        const body = t[1];
        cur.cujs = uniq([...cur.cujs, ...[...body.matchAll(/CUJ-(\d{2})/g)].map((m) => `CUJ-${m[1]}`)]).sort(byNum);
        cur.adrs = uniq([...cur.adrs, ...[...body.matchAll(/ADR[-\s]?(\d{4})/g)].map((m) => m[1])]).sort(byNum);
        cur.decisions = uniq([...cur.decisions, ...[...body.matchAll(/D-(\d{3})/g)].map((m) => `D-${m[1]}`)]).sort(byNum);
      }
    }
  }
  return { caps, reqs };
}

// ---------- Сборка отчёта ----------
function build() {
  const cujs = parseCujs();
  const adrs = parseAdrs();
  const { caps, reqs } = parseSpecs();

  const ids = reqs.map((r) => r.id);
  const dupIds = uniq(ids.filter((id, i) => ids.indexOf(id) !== i));
  const noCuj = reqs.filter((r) => r.cujs.length === 0);
  const noAdr = reqs.filter((r) => r.adrs.length === 0);
  const noScenario = reqs.filter((r) => r.scenarios === 0);
  const unknownCuj = reqs.filter((r) => r.cujs.some((c) => !cujs.has(c)));
  const unknownAdr = reqs.filter((r) => r.adrs.some((a) => adrs.size && !adrs.has(a)));

  const cujToReqs = new Map([...cujs.keys()].map((c) => [c, []]));
  for (const r of reqs) for (const c of r.cujs) {
    if (!cujToReqs.has(c)) cujToReqs.set(c, []);
    cujToReqs.get(c).push(r);
  }
  const cujWithout = [...cujs.keys()].filter((c) => cujToReqs.get(c).length === 0);

  const adrToReqs = new Map([...adrs.keys()].map((a) => [a, []]));
  for (const r of reqs) for (const a of r.adrs) {
    if (!adrToReqs.has(a)) adrToReqs.set(a, []);
    adrToReqs.get(a).push(r);
  }
  const adrWithout = [...adrs.keys()].filter((a) => adrToReqs.get(a).length === 0);

  const totalScen = reqs.reduce((s, r) => s + r.scenarios, 0);
  const L = [];
  const p = (s = '') => L.push(s);
  const list = (rs) => (rs.length ? rs.map((r) => r.id).join(', ') : '—');

  p('# Матрица трассировки BUDB');
  p();
  p(`Файл сгенерирован скриптом \`scripts/traceability.mjs\` из \`${rel(SPECS_DIR)}/*/spec.md\` (строки \`Трассировка:\` и \`#### Scenario:\`) и \`docs/cuj.md\`. Вручную не редактировать: после изменения спецификаций выполнить \`node scripts/traceability.mjs\` (проверка без расхождений — \`node scripts/traceability.mjs --check\`).`);
  p();
  p('Содержание: 1 — сводка по capability; 2 — CUJ → требования; 3 — требования без CUJ; 4 — CUJ без требований; 5 — требование → CUJ, ADR, решения; 6 — ADR → требования; 7 — прочие проверки.');
  p();

  // 1. Сводка
  p('## 1. Сводка: требования и сценарии по capability');
  p();
  p('| Capability | Префикс ID | Требований | Сценариев | CUJ, на которые ссылается |');
  p('|---|---|---:|---:|---|');
  for (const cap of caps) {
    const rs = reqs.filter((r) => r.cap === cap);
    const prefixes = uniq(rs.map((r) => r.id.replace(/-\d+$/, ''))).join(', ');
    const sc = rs.reduce((s, r) => s + r.scenarios, 0);
    const cc = uniq(rs.flatMap((r) => r.cujs)).sort(byNum).map((c) => c.slice(4)).join(', ');
    p(`| \`${cap}\` | ${prefixes} | ${rs.length} | ${sc} | ${cc} |`);
  }
  p(`| **Всего** (${caps.length} capability) | | **${reqs.length}** | **${totalScen}** | ${cujs.size} CUJ |`);
  p();

  // 2. CUJ → требования
  p('## 2. CUJ → требования');
  p();
  p('В строку CUJ попадают ID всех требований, у которых в строке `Трассировка:` есть этот CUJ. Одно требование может трассироваться к нескольким CUJ.');
  p();
  p('| CUJ | Название | Требований | ID требований |');
  p('|---|---|---:|---|');
  for (const [c, rs] of [...cujToReqs.entries()].sort((a, b) => byNum(a[0], b[0]))) {
    const title = cujs.get(c) || '**нет в docs/cuj.md**';
    const sorted = [...rs].sort((a, b) => byNum(a.id, b.id));
    p(`| ${c} | ${title} | ${rs.length} | ${list(sorted)} |`);
  }
  p();

  // 3. Требования без CUJ
  p('## 3. Требования без CUJ');
  p();
  p(noCuj.length ? noCuj.map((r) => `- ${r.id} ${r.title} (\`${r.cap}\`)`).join('\n') : 'Нет: у каждого требования в строке `Трассировка:` указан хотя бы один CUJ.');
  p();

  // 4. CUJ без требований
  p('## 4. CUJ без требований');
  p();
  p(cujWithout.length ? cujWithout.map((c) => `- ${c} ${cujs.get(c)}`).join('\n') : 'Нет: на каждый CUJ из `docs/cuj.md` ссылается хотя бы одно требование.');
  p();

  // 5. Требование → ADR
  p('## 5. Требование → CUJ, ADR, решения');
  p();
  for (const cap of caps) {
    const rs = reqs.filter((r) => r.cap === cap);
    p(`### ${cap}`);
    p();
    p('| ID | Требование | Сценариев | CUJ | ADR | Решения |');
    p('|---|---|---:|---|---|---|');
    for (const r of rs) {
      const adrCell = r.adrs.length ? r.adrs.map((a) => (adrs.has(a) ? `[${a}](adr/${adrs.get(a).file})` : `${a} (нет файла)`)).join(', ') : '—';
      p(`| ${r.id} | ${r.title.replace(/\|/g, '\\|')} | ${r.scenarios} | ${r.cujs.map((c) => c.slice(4)).join(', ') || '—'} | ${adrCell} | ${r.decisions.join(', ') || '—'} |`);
    }
    p();
  }

  // 6. ADR → требования
  p('## 6. ADR → требования');
  p();
  p('| ADR | Название | Требований | ID требований |');
  p('|---|---|---:|---|');
  for (const [a, rs] of [...adrToReqs.entries()].sort((x, y) => byNum(x[0], y[0]))) {
    const meta = adrs.get(a);
    const name = meta ? `[${meta.title}](adr/${meta.file})` : '**файла ADR нет**';
    p(`| ${a} | ${name} | ${rs.length} | ${list([...rs].sort((x, y) => byNum(x.id, y.id)))} |`);
  }
  p();

  // 7. Прочие проверки
  p('## 7. Прочие проверки');
  p();
  p('| Проверка | Результат |');
  p('|---|---|');
  p(`| Повторяющиеся ID требований | ${dupIds.length ? dupIds.join(', ') : 'нет'} |`);
  p(`| Требования без сценариев | ${noScenario.length ? list(noScenario) : 'нет'} |`);
  p(`| Требования без ADR в строке «Трассировка» | ${noAdr.length ? list(noAdr) : 'нет'} |`);
  p(`| Ссылки на CUJ, которых нет в docs/cuj.md | ${unknownCuj.length ? list(unknownCuj) : 'нет'} |`);
  p(`| Ссылки на ADR, которых нет в docs/adr/ | ${unknownAdr.length ? list(unknownAdr) : 'нет'} |`);
  p(`| ADR, на которые не ссылается ни одно требование | ${adrWithout.length ? adrWithout.map((a) => `${a} (${adrs.get(a).title})`).join('; ') : 'нет'} |`);
  p();

  const problems = dupIds.length + noCuj.length + cujWithout.length + noScenario.length + unknownCuj.length;
  return { text: L.join('\n'), problems, stats: { caps: caps.length, reqs: reqs.length, scenarios: totalScen, noCuj: noCuj.length, cujWithout: cujWithout.length } };
}

const { text, problems, stats } = build();
if (flag('--stdout')) {
  process.stdout.write(text);
} else {
  writeFileSync(OUT_FILE, text, 'utf8');
  console.error(`traceability: ${stats.caps} capability, ${stats.reqs} требований, ${stats.scenarios} сценариев; без CUJ: ${stats.noCuj}; CUJ без требований: ${stats.cujWithout} → ${rel(OUT_FILE)}`);
}
if (flag('--check') && problems > 0) {
  console.error(`traceability: найдено проблем: ${problems}`);
  process.exit(1);
}
