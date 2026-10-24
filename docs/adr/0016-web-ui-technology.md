---
status: accepted
date: 2026-10-24
decision-makers: Elephant (оркестратор, прокси заказчика по D-008)
consulted: агент-исследователь (docs/research/03-domain-api-ui-security.md)
informed: все агенты-исполнители (Goldfish)
---

# 0016. Технология веб-UI: чистый TypeScript и нативные Web Components, ассеты в бинарнике, строгая CSP, i18n ru/en

## Status

Accepted, 2026-10-24. Решение D-031.

## Context and Problem Statement

ДЗ требует визуальный веб-интерфейс. Оператор ищет контакт во время звонка (CUJ-01, CUJ-02), редактор правит контакты (CUJ-03, CUJ-04), администратор смотрит состояние (CUJ-08). Имена контактов — ввод пользователя и главный вектор stored XSS (docs/research/03, §6.4, [S46]). Строгая CSP требует, чтобы все скрипты и стили отдавал сам сервер, без inline-кода и CDN (docs/research/03, §5.4, [S45]).

На чём писать UI, чтобы он был безопасным, доступным и не тянул большую цепочку поставок?

## Decision Drivers

* Минимальная цепочка поставок (D-031).
* Строгая CSP и малая поверхность атаки (D-031; docs/research/03, §5.4, §6.4).
* Дух «с нуля» (D-031).
* Работа без интернета: все ассеты отдаёт сервер (docs/research/03, §5.4).
* WCAG 2.2 AA и i18n ru/en с плюралами CLDR (docs/research/03, §5.2, §5.3).

## Considered Options

1. **Чистый TypeScript + нативные Web Components, без UI-фреймворков и CDN; собранные ассеты встраиваются в бинарник** — выбрано.
2. **SPA на UI-фреймворке** (React, Vue, Svelte и т. п.) с бандлером из npm.
3. **Серверный рендеринг HTML-шаблонов** без клиентского JS (или с минимальным).
4. **Готовая библиотека частичных обновлений с CDN** (класс htmx).

## Decision Outcome

Выбран вариант 1 (D-031):

* **Код UI** — чистый TypeScript, компоненты — нативные Web Components; UI-фреймворков нет.
* **Ассеты** (JS, CSS, шрифты, иконки) собираются заранее и встраиваются в бинарник сервера; CDN не используется (D-031; встраивание средствами std `include_bytes!`/`include_str!`, docs/research/02, §6.2).
* **Строгая CSP** (по docs/research/03, §5.4, [S45]): `default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'`; без inline-скриптов и inline-обработчиков.
* **Вывод данных** — через `textContent`, без `innerHTML`; подсветка совпадений элементом `<mark>` по позициям в исходной строке (docs/research/03, §5.1 п. 2, §6.4, [S37], [S46]).
* **i18n ru/en** с плюралами CLDR: у `ru` формы one/few/many/other, у `en` — one/other; правила для двух языков зашиваются вручную, ICU не нужен (docs/research/03, §5.3, [S40]). `lang` у `<html>` (WCAG 3.1.1).
* **Доступность** — WCAG 2.2 AA (docs/research/03, §5.2, [S34], [S35]); поиск — паттерн combobox по ARIA APG или поле + live region (docs/research/03, §5.1 п. 3, [S36]).

Как собирается TypeScript (компилятор `tsc`, его версия, есть ли бандлер, где фиксируются npm-зависимости сборки и как они проверяются), журнал не решает. `[ПРЕДЛОЖЕНИЕ АГЕНТА]`: единственная сборочная зависимость — компилятор TypeScript закреплённой версии с lock-файлом; выход — ES-модули без бандлера; npm-пакетов в рантайме UI нет. Вынесено в вопросы.

Обоснование (D-031): минимальная цепочка поставок, строгая CSP, малая поверхность атаки, дух «с нуля».

### Consequences

* Good, потому что в рантайме UI нет стороннего кода, и строгая CSP с `script-src 'self'` выполнима без исключений.
* Good, потому что нет «аварийных выходов» фреймворков, которые обходят экранирование (docs/research/03, §6.4, [S46]); правило «без `innerHTML`» проверяется поиском по исходникам.
* Good, потому что UI работает в изолированной сети (docs/research/03, §5.4).
* Bad, потому что состояние, роутинг, формы, i18n и доступный combobox пишутся вручную; объём кода UI больше, чем с фреймворком `[ДОПУЩЕНИЕ]`.
* Bad, потому что для TypeScript нужна сборочная цепочка вне Cargo; cargo-deny её не проверяет `[ДОПУЩЕНИЕ]`.
* Bad, потому что поддержка Web Components зависит от браузера; минимальные версии браузеров не зафиксированы `[НЕ ПОДТВЕРЖДЕНО]` — исследование их не рассматривало.

### Confirmation

* Тест: каждый ответ с HTML содержит заголовок `Content-Security-Policy` с политикой выше; браузерный тест не фиксирует нарушений CSP (`securitypolicyviolation`) на всех экранах `[ПРЕДЛОЖЕНИЕ АГЕНТА]`.
* Поиск по исходникам UI: нет `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `eval`, inline-обработчиков; нет `import` из внешних URL.
* Тест: в ответах сервера нет ссылок на внешние домены; UI работает без сети.
* Тест XSS: контакт с именем `<img src=x onerror=alert(1)>` отображается как текст.
* Тест i18n: «1 контакт», «2 контакта», «5 контактов», «1,5 контакта»; «1 contact», «2 contacts».
* Автоматическая проверка доступности ключевых экранов на критерии WCAG 2.2 AA (docs/research/03, §5.2) — инструмент не выбран `[ПРЕДЛОЖЕНИЕ АГЕНТА]`.

## Pros and Cons of the Options

### Чистый TS + Web Components

* Good: нет стороннего рантайм-кода, строгая CSP, дух «с нуля».
* Bad: больше ручного кода.

### SPA на фреймворке

* Good: быстрая разработка, готовые компоненты `[ДОПУЩЕНИЕ]`.
* Bad: большая цепочка поставок npm; «аварийные выходы» фреймворков для HTML (docs/research/03, §6.4, [S46]); противоречит D-031.

### Серверные шаблоны

* Good: минимум клиентского кода, тривиальная CSP.
* Bad: поиск «при вводе» с debounce 200–300 мс (docs/research/03, §5.1 п. 1, [S38]) требует клиентского JS; на сервере появляется шаблонизатор — новая зависимость или собственный код `[ДОПУЩЕНИЕ]`.

### Библиотека частичных обновлений с CDN

* Good: мало кода.
* Bad: CDN противоречит D-031 и строгой CSP (docs/research/03, §5.4).

## More Information

* OWASP CSP Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html ; OWASP XSS Prevention — https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html (docs/research/03, §5.4, §6.4).
* WCAG 2.2 — https://www.w3.org/TR/WCAG22/ ; What's new in 2.2 — https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/ ; ARIA APG Combobox — https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ (docs/research/03, §5.1, §5.2).
* CLDR plural rules — https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html (docs/research/03, §5.3).
* MDN `<mark>` — https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/mark ; Algolia debouncing — https://www.algolia.com/doc/ui-libraries/autocomplete/guides/debouncing-sources ; NN/g response times — https://www.nngroup.com/articles/response-times-3-important-limits/ (docs/research/03, §5.1).
* Связанные ADR: 0006 (зависимости), 0010 (API), 0011 (сессия и CSRF), 0017 (встраивание в бинарник).

## Изменения после ревью 2026-10-24

По D-005 принятый ADR не переписывается: текст выше оставлен как был, а решения, принятые после его написания и затрагивающие этот ADR, перечислены здесь (разбор ревью раунда 1 — `docs/reviews/GOLDFISH.md`, полный текст решений — `docs/orchestrator-decisions.md`). Этот раздел добавлен решением D-114: ADR 0003, 0006, 0013, 0014, 0015, 0016 и 0017 ранее были затронуты решениями только в деталях. При расхождении с текстом выше действует этот раздел.

* **Восстановление из корзины (D-041).** writer И admin могут просматривать корзину и восстанавливать любой контакт в пределах срока хранения через `POST /api/v1/contacts/{id}:restore`. «Очистить сейчас» (purge) — только admin. Решение заменяет предложенный агентом 5-минутный `:undelete`. Кнопка…
* **Атрибуты cookie сессии (D-043).** С TLS cookie ОБЯЗАТЕЛЬНО имеет префикс `__Host-` и атрибуты `Secure`, `HttpOnly`, `SameSite=Strict`, `Path=/`. На loopback без TLS (режим разработки по умолчанию) — те же атрибуты, но без `__Host-` и `Secure`. Поведение браузеров на `http://127.0.0.1`…
* **Транзитивные зависимости, сборка UI, SLO CUJ, CSV-инъекция (D-060).** Allowlist охватывает прямые зависимости; denylist проверяется по всему транзитивному графу (cargo-deny bans). Добавить: proptest-state-machine (только для тестов), sha2, hmac, getrandom/rand_core (RustCrypto и CSPRNG). Сборка UI: только закреплённый tsc…
* **API сессий веб-UI (D-068).** `POST /api/v1/session` — вход, сервер ставит cookie. `GET /api/v1/session` — возвращает пользователя, роль и `csrf_token` в JSON; UI держит токен в памяти и отправляет его в заголовке `X-CSRF-Token`. `DELETE /api/v1/session` — выход.
* **UI, CSV-инъекция, исправление research/03 (D-106).** Предупреждение об истечении сессии за 2 мин с кнопкой «Продлить» (WCAG 2.2.1). Автофокус поля поиска и горячая клавиша «/». Кнопка копирования номера в списке результатов (CUJ-02: 2 + n нажатий). Набор опасных первых символов CSV-инъекции дополняется Tab, CR…
* **Остаточные «частичные» замечания и вопросы 8–11 design.md (D-113).** Имя cookie на loopback — `budb_session`; CSRF обязателен на каждом небезопасном методе с cookie-аутентификацией, включая `POST :search`; позиции подсветки вычисляются на клиенте.
