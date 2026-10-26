# Исследование 01: принципы курса и OpenSpec 1.15

- **Дата:** 2026-10-24 (все ссылки ниже открывались в этот день, если не сказано иное)
- **Автор:** агент-исследователь (по поручению оркестратора)
- **Назначение:** база фактов для спецификации «best-undefined-database» (БД имён и телефонов, написанная с нуля, с UI и программным API)
- **Обозначения:** `[НЕ ПОДТВЕРЖДЕНО]` — не удалось проверить по первоисточнику; `[ИНТЕРПРЕТАЦИЯ]` — вывод агента, а не утверждение источника; `[ПРОВЕРЕНО ЛОКАЛЬНО]` — проверено запуском OpenSpec CLI 1.15.0 в локальном каталоге агента.

---

## Часть A. Пять принципов

### A1. Critical User Journey (CUJ)

**Что это и откуда.**
- В Google SRE Workbook (глава «Implementing SLOs», раздел «Modeling User Journeys») CUJ определён так: *"A critical user journey is a sequence of tasks that is a core part of a given user's experience"*. Там же: SLO стоит писать «in terms of user-centric actions», а измеримое событие пути «becomes just another SLI, which you can track alongside your existing SLIs and SLOs». Пример: для интернет-магазина CUJ — поиск товара, добавление в корзину, покупка. Источник: https://sre.google/workbook/implementing-slos/ (обращение 2026-10-24).
- Google Cloud в практическом руководстве по SLO описывает CUJ как «a set of interactions a user has with a service to achieve some end result» и советует ранжировать пути по влиянию на бизнес до выбора SLI/SLO. Источник: https://cloud.google.com/blog/products/management-tools/practical-guide-to-setting-slos (через поисковую выдачу 2026-10-24; полный текст статьи не открывался — формулировка `[НЕ ПОДТВЕРЖДЕНО]` дословно).
- UX-трактовка Google: Javier Bargas-Avila (UX Director, Google) — CUJ состоит из трёх частей: **user** (сформулирован с точки зрения пользователя), **goal** (глубинная потребность), **tasks** («the how», шаги, по возможности без привязки к конкретным фичам). Рекомендация: выбрать **5–7 главных целей** продукта и разложить каждую на задачи; измерять «CUJ happiness» и «CUJ task success». Источник: https://www.mindtheproduct.com/product-development-and-ux-critical-user-journeys/ (дата публикации статьи `[НЕ ПОДТВЕРЖДЕНО]`).

**Как применять при составлении спецификации с LLM-агентами.**
1. До написания требований зафиксировать 5–7 CUJ в формате «пользователь → цель → задачи» (UX-трактовка).
2. Для каждого CUJ сформулировать измеримый критерий успеха (аналог SLI/SLO: латентность поиска, сохранность после сбоя и т.п.) — SRE-трактовка.
3. Каждый CUJ должен покрываться хотя бы одним `#### Scenario:` в OpenSpec-дельте; требования без CUJ — кандидаты на вычёркивание `[ИНТЕРПРЕТАЦИЯ]`.

**Артефакт.** Документ со списком CUJ (ID, пользователь, цель, задачи, критерий успеха) и матрица трассировки CUJ → Requirement → Scenario.

**Типичные ошибки.**
- Описывать фичи вместо целей пользователя (у Bargas-Avila задачи должны быть «feature-agnostic»).
- Слишком много путей (Google считает больше 5–7 бесполезным — по статье Mind the Product).
- Мерить только факт завершения, а не весь путь (там же: надо измерять действия между началом и концом задачи).
- Не связывать CUJ с измеримыми критериями (SRE Workbook: путь становится SLI только когда он измерим).

### A2. Elephant + Goldfish (Elephant-Goldfish Model, EGM)

**Первоисточник найден однозначно.**
- **Dave Rensin**, «Elephants, Goldfish and the New Golden Age of Software Engineering», Medium, опубликовано **2026-04-27**. https://drensin.medium.com/elephants-goldfish-and-the-new-golden-age-of-software-engineering-c33641a48874 (Medium отдаёт 403 напрямую; текст прочитан через reader-прокси `r.jina.ai`, 2026-10-24). Статья внесена в каталог публикаций Google Research: https://research.google/pubs/elephants-goldfish-and-the-new-golden-age-of-software-engineering/ . Автор — Distinguished Engineer в Google (по профилю https://research.google/people/david-k-rensin/ ).
- В статье есть пометка «Update: 2026–10–21»: Google разрешил открыть плагин, которым команда автора пользуется для этой методологии, — https://egm.dev .
- Официальный open-source плагин: https://github.com/google/elephant-goldfish-model (Apache-2.0, «not an officially supported Google product»; репозиторий создан 2026-09-13 по GitHub API). Команды: `/egm-brainstorm`, `/egm-draft`, `/egm-review`, `/egm-review-loop`, `/egm-resolve`, `/egm-drift-report`, `/egm-bootstrap`; персоны ревьюеров в `agents/`: comprehension, design_critic, implementation_readiness, structural, style, zoom_out, synthesizer и др.
- Независимая реализация в виде Agent Skills для Claude Code: https://github.com/marcus-darden/egm (MIT; создан 2026-10-12; используется в курсе UMich EECS 498 AASE — по README). Навыки: `peanuts`, `elephant`, `goldfish`, `egm-implement`, `mean-review`, `decide`.
- Поиск по-русски («слон и золотая рыбка» + ИИ/агенты/ревью) совпадений не дал (WebSearch 2026-10-24). Русскоязычного первоисточника нет; термин используется в английском виде.

**Суть (цитаты Rensin).**
- *"The Elephant: 'An elephant never forgets.' This is the heavily-prompted, context-rich AI session, and the resulting Design Document it helps you write."*
- *"The Goldfish: A brand new, completely fresh AI session with zero memory. It only knows exactly what is put right in front of it."*
- Процесс: **"Feed the Elephant; test it against the Goldfish."**
- Тезис: *"Design is the new code."*; «sizeof(docs) << sizeof(code)».

**Фазы по статье.**
1. *Phase 1 — Growing the Elephant (No Code Yet):* загрузка контекста; правило «No Code» (промпт «I do not want you to create code… ask me clarifying questions and challenge my assumptions»); «Sycophant Challenge» («You are not being helpful. Your highest and best use is to challenge my thinking.»); **ИИ первым предлагает техническое решение** прозой и блок-схемами («It's very important that you ask the AI to propose the first design»).
2. *Phase 2 — Teaching the Elephant:* дизайн-документ пишется **по секциям, не за один раз**: (1) The Problem, 3–5 предложений; (2) The Technical Plan, прозой + блок-диаграмма; (3) Alternatives — отвергнутые идеи, «guardrails against future hallucinations and arguments»; (4) Detailed Implementation — перечислить *каждый* создаваемый/изменяемый файл и обоснование.
3. *Phase 3 — The Goldfish Protocol:* три свежие сессии — **Comprehension Test** (объясни, что делает документ и как работает система), **Critic Review** («all the things I missed, all the faulty assumptions, all the edge cases…»; автор оценивает, что ~30% замечаний ценны), **Implementation Readiness** («Does it absolutely have all the information you would require…?»). Повторять, пока замечания не станут «nit pick». Затем — ревью живым человеком.
4. *Phase 4 — Implementation:* «Now, and only now, do you write code»; «Mean» code review.
- Дополнительно (Part 1): сохранять тройку «описание + критерии приёмки + результат»; полные чаты хранить не нужно («mostly token noise»).

**Как реализован «свежий» Goldfish (marcus-darden/egm, `skills/goldfish/SKILL.md`).**
- Ревьюер стартует без истории, получает **только путь к документу и задание**, ему запрещено читать дизайн-переписку, память проекта и файлы, на которые документ не ссылается.
- Три ревьюера запускаются **параллельно одним сообщением**, чтобы оркестратор не передал вывод A в B.
- Обязательная преамбула («You are a Goldfish reviewer… If the design doc does not say it and the referenced files do not prove it, treat it as unknown…»).
- Отчёты сохраняет оркестратор (`goldfish-A-comprehension.md`, `-B-critic.md`, `-C-readiness.md`, суффикс `-rN` для следующих раундов) + журнал `GOLDFISH.md`.
- Условие остановки: замечания последнего раунда — уровня nit **и** поле `human_review_gate` = `passed` или `skipped-solo`; поле меняет только человек.
- Антипаттерны: последовательный запуск; утечка контекста через ссылку на журнал; ревьюер «пробежал глазами» без ссылок на секции; правка документа по критике без оценки; перезапись отчётов прошлых раундов; остановка после одного раунда.

**Как применять при спецификации с LLM-агентами (в терминах OpenSpec) `[ИНТЕРПРЕТАЦИЯ]`.**
- Elephant = сессия оркестратора + артефакты change (`proposal.md`, `design.md`, `specs/**/spec.md`, `tasks.md`) + ADR + CUJ. Всё, что решено в чате, обязано попасть в файлы.
- Goldfish = 3 субагента с пустым контекстом, которым передаются только пути к артефактам change (и файлам, на которые они ссылаются), с тремя заданиями A/B/C.
- Отображение 4 секций Rensin на OpenSpec: Problem → `proposal.md` «Why»; Technical Plan → `design.md` «Context/Decisions»; Alternatives → `design.md` «Decisions» (alternatives considered) + ADR; Detailed Implementation → `tasks.md` (с перечнем файлов/модулей).

**Артефакт.** Журнал раундов (`GOLDFISH.md`) + сохранённые отчёты ревьюеров + исправленные артефакты; финальный статус готовности.

**Типичные ошибки.** Передать Goldfish резюме из чата («утечка Elephant»); один раунд вместо цикла; принять всю критику без суждения (ценно ~30%); дать человеку/ИИ предложить первый дизайн вместо ИИ; писать дизайн-документ одним запросом; поддаться сикофантии модели.

### A3. (Architectural) Decision Record — ADR

**Что это и откуда.**
- **Michael Nygard**, «Documenting Architecture Decisions», 2011-11-15. https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions . Формат: **Title** (короткая именная группа, напр. «ADR 1: Deployment on Ruby on Rails 3.0.10»), **Context** («describes the forces at play, including technological, political, social, and project local», нейтральным языком), **Decision** (полными предложениями, активный залог, «We will …»), **Status** (proposed / accepted / deprecated / superseded), **Consequences** («All consequences should be listed here, not just the 'positive' ones»). Хранение: «doc/arch/adr-NNN.md»; номера последовательны и «will not be reused»; отменённое решение не удаляют, а помечают superseded; объём — «one or two pages».
- **adr.github.io**: ADR фиксирует «a single AD and its rationale»; AD — «a justified design choice that addresses a functional or non-functional requirement that is architecturally significant»; совокупность ADR — decision log. https://adr.github.io/
- **MADR 4.0.0** (2024-09-17), https://adr.github.io/madr/ : секции `Context and Problem Statement`, `Decision Drivers` (opt), `Considered Options`, `Decision Outcome`, `Consequences` (opt), `Confirmation` (opt), `Pros and Cons of the Options` (opt), `More Information` (opt); front matter `status, date, decision-makers, consulted, informed` (opt). Имена файлов `NNNN-title-with-dashes.md`, каталог `docs/decisions/`.

**Как применять с LLM-агентами.** Каждое архитектурное решение (формат файла хранения, журнал/WAL, индексы, нормализация телефонов, протокол API, стек UI) → отдельный ADR со списком рассмотренных вариантов; агент предлагает варианты (по Rensin — ИИ предлагает первым), человек/оркестратор выбирает. Секция Alternatives у Rensin и ADR решают одну задачу: не давать модели снова предлагать отвергнутое `[ИНТЕРПРЕТАЦИЯ]`. В OpenSpec `design.md` уже содержит «Decisions: Key technical choices with rationale (why X over Y?). Include alternatives considered for each decision» `[ПРОВЕРЕНО ЛОКАЛЬНО]` — ADR даёт сверх этого неизменяемость и сквозную нумерацию между changes.

**Артефакт.** `docs/adr/NNNN-*.md` (или `docs/decisions/`) + индекс.

**Типичные ошибки.** Переписывать принятый ADR вместо нового superseding; писать только плюсы; ADR без рассмотренных альтернатив; несколько решений в одном ADR; ADR «задним числом» без контекста.

### A4. LLM-expert review (LLM-as-a-judge, multi-persona review)

**Что это и откуда.**
- Zheng et al., «Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena», arXiv:2306.05685 (2023-06-09, v4 2023-12-24): сильный судья (GPT-4) даёт «over 80% agreement» с людьми — на уровне согласия людей между собой; выявлены **position bias, verbosity bias, self-enhancement bias**, ограниченность рассуждений. https://arxiv.org/abs/2306.05685
- Обзоры: «A Survey on LLM-as-a-Judge», arXiv:2411.15594 (рекомендует не использовать одну и ту же модель как генератор и судью — «stopgap»); «LLMs-as-Judges: A Comprehensive Survey», arXiv:2412.05579. (Сведения по выдаче поиска; PDF целиком не читались — детали `[НЕ ПОДТВЕРЖДЕНО]`.)
- Multi-agent / multi-persona: ChatEval (Chan et al., arXiv:2308.07201, 2023-08-14) — коллегия LLM-судей в формате дебатов; Solo Performance Prompting (Wang et al., arXiv:2307.05300, NAACL 2024) — несколько детализированных персон лучше одной/фиксированного числа, эффект проявляется только у сильных моделей.
- Anthropic, «Building effective agents» (2024-12-19), паттерн **evaluator-optimizer**: «one LLM call generates a response while another provides evaluation and feedback in a loop»; уместен при ясных критериях оценки. https://www.anthropic.com/engineering/building-effective-agents
- В Google EGM персоны ревьюеров: Design Critic, Naive Reader, Tech Lead, Codebase Auditor, Structural Validator, Style Editor, Zoom Out Architect (README https://github.com/google/elephant-goldfish-model ).
- Rensin (Part 1, «Trust But Verify»): заранее, в отдельном диалоге, составить **критерии приёмки/рубрику** в роли «expert skeptical fact checker» и только потом отдавать задачу исполнителю.

**Как применять.** Отдельные субагенты-эксперты с явной ролью и рубрикой (напр. «инженер СУБД/надёжность хранения», «API-дизайнер», «UX», «QA/тестируемость», «скептик-фактчекер»), каждый выдаёт замечания с severity и ссылкой на конкретное требование. Отличие от Goldfish `[ИНТЕРПРЕТАЦИЯ]`: Goldfish проверяет *самодостаточность* документа (контекст пуст), эксперт проверяет *правильность по предметной области* (может получать research-документы и рубрику). Против biases: судья — не тот агент, что писал; рубрика заранее; требовать цитаты на строки; при сравнении вариантов менять порядок.

**Артефакт.** Рубрика (`docs/review/rubric.md`), отчёты экспертов, сводка с решениями (accepted/rejected + причина).

**Типичные ошибки.** Судья = автор (self-enhancement); оценка «на глаз» без рубрики; принять длинный ответ за лучший (verbosity); вливать все замечания без триажа; одна персона на всё.

### A5. Fact Grounding

**Что это и откуда.**
- Google Cloud Vertex AI: *"In generative AI, grounding is the ability to connect model output to verifiable sources of information."* Grounding снижает галлюцинации, «Anchors model responses to your data sources», даёт аудитируемость через «grounding support, which are links to sources». https://docs.cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview
- Google DeepMind **FACTS Grounding** (блог 2024-12-17; статья Jacovi et al., arXiv:2501.03200, 2025-01-06): ответ должен быть «fully grounded in information contained in the provided document, with no hallucinations»; 1 719 примеров (860 public / 859 private), документы до 32k токенов; два этапа оценки — eligibility (отвечает ли на запрос) и grounding (каждое утверждение подкреплено документом); три судьи (Gemini 1.5 Pro, GPT-4o, Claude 3.5 Sonnet) для снижения пристрастности к своей семье моделей. https://deepmind.google/discover/blog/facts-grounding-a-new-benchmark-for-evaluating-the-factuality-of-large-language-models/ , https://arxiv.org/abs/2501.03200
- Chain-of-Verification (Dhuliawala et al., Meta, arXiv:2309.11495, 2023): черновик → план проверочных вопросов → независимые ответы на них → исправленный ответ; снижает галлюцинации. https://arxiv.org/abs/2309.11495
- Anthropic: агенту нужно получать «"ground truth" from the environment at each step» (результаты инструментов, выполнение кода). https://www.anthropic.com/engineering/building-effective-agents

**Как применять в спецификации.** Каждое нетривиальное утверждение о внешнем мире (гарантии `fsync`/`FlushFileBuffers`, атомарность rename, формат E.164, нормализация Unicode, пределы файловых систем, поведение OpenSpec) — со ссылкой и датой обращения в реестре источников; неподтверждённое помечать. Для поведения инструментов — «ground truth from environment»: запуск `openspec validate --strict`, а не память модели. Проверочный проход в стиле CoVe/FACTS: отдельный агент извлекает утверждения и сверяет каждое с источником.

**Артефакт.** Реестр источников (`docs/research/sources.md` или раздел в каждом research-файле), пометки `[НЕ ПОДТВЕРЖДЕНО]`, отчёт fact-check.

**Типичные ошибки.** Ссылки «для вида», которые не подтверждают утверждение; цитирование по памяти модели; смешение фактов и интерпретаций без пометки; отсутствие даты обращения (документация меняется — см. OpenSpec, у которого 1.15.0 вышла сегодня).

---

## Часть B. OpenSpec 1.15.x (Fission-AI)

### B1. Версия и источники
- npm `@fission-ai/openspec`: 1.15.0 опубликована **2026-10-24T00:51Z** (т.е. сегодня); 1.14.3 — 2026-10-17 (`npm view @fission-ai/openspec time`). Рекомендуется пинить `@1.15.0`.
- Репозиторий и документация: https://github.com/Fission-AI/OpenSpec , docs: `docs/writing-specs.md`, `docs/multi-language.md`, `docs/migration-guide.md`, `docs/reviewing-changes.md`, `docs/customization.md` (ветка `main`, 2026-10-24); сайт https://openspec.dev/docs/ .
- Требование README: Node.js ≥ 20.19.0.

### B2. CLI (из `openspec --help`, 1.15.0) `[ПРОВЕРЕНО ЛОКАЛЬНО]`
`init`, `update`, `install`, `list [--specs]`, `view`, `change`, `archive`, `spec`, `config`, `schema`, `store`, `doctor`, `context`, `workset`, `validate`, `show`, `feedback`, `completion`, `status`, `instructions`, `templates`, `schemas`, `new` (`new change <kebab-name>`).

`openspec init [options] [path]` — неинтерактивные флаги:
- `--tools <tools>` — `all`, `none` или список (в т.ч. `claude`);
- `--language <language>` — язык артефактов (пишется в `config.yaml` → `context`);
- `--profile <core|custom>`; `--force` (очистка legacy без вопросов); `--no-animation`; `--copilot-cloud/--no-copilot-cloud` (игнорируется без github-copilot).

`openspec validate [item] [--all|--changes|--specs] [--strict] [--json] [--type change|spec] [--no-interactive] [--archived]`.
`openspec archive [change] [-y] [--skip-specs] [--no-validate] [--json]`.

### B3. Что генерирует `init --tools claude` `[ПРОВЕРЕНО ЛОКАЛЬНО]`
Команда: `npx --yes @fission-ai/openspec@1.15.0 init --tools claude --language ru --no-animation --no-copilot-cloud .`
```
.claude/commands/opsx/{propose,explore,apply,update,sync,archive}.md   # slash-команды /opsx:*
.claude/skills/openspec-{propose,explore,apply-change,update-change,sync-specs,archive-change}/SKILL.md
openspec/config.yaml
openspec/specs/.gitkeep
openspec/changes/archive/.gitkeep
```
- Профиль `core` (по умолчанию): propose, explore, apply, update, sync, archive. Ещё 6 workflows (new, continue, ff, bulk-archive, verify, onboard) включаются через `openspec config profile` + `openspec update` (вывод init и README).
- **`project.md` и `AGENTS.md` в 1.15 не создаются.** По `docs/migration-guide.md` старый `openspec/project.md` заменён `openspec/config.yaml`, поле `context:` которого «actively injected into every OpenSpec planning request»; `project.md` при миграции не удаляется автоматически — перенести вручную.
- Сгенерированный `config.yaml` (с `--language ru`):
  ```yaml
  schema: spec-driven
  context: |
    Language: ru
    All artifacts must be written in ru.
    Keep OpenSpec structural headings and SHALL/MUST keywords in English.
  ```
  плюс закомментированные примеры `rules:` (по артефактам) и `operations:` (apply/archive). Скилл propose применяет `context`, если это строка ≤ 51 200 байт.
- Глобальный конфиг пользователя (`openspec config path`) хранит profile/telemetry; телеметрию отключить `OPENSPEC_TELEMETRY=0` или `openspec config set telemetry.enabled false`.
- Важные правила, зашитые в скиллы: propose создаёт только планирующие артефакты и **не начинает реализацию**; propose не должен сам делать `openspec init`; контекст и `rules` — ограничения для агента, их нельзя копировать в артефакты.

### B4. Структура и workflow
- `openspec/specs/<capability>/spec.md` — текущая «правда» (main specs); `openspec/changes/<change>/` — предлагаемые изменения; `openspec/changes/archive/YYYY-MM-DD-<change>/` — архив.
- Change (schema `spec-driven`): `.openspec.yaml` (`schema: spec-driven`, опц. `skip_specs: true`, `retire_capabilities: true`), `proposal.md` → (`specs/**/spec.md`, `design.md`) → `tasks.md`. Граф зависимостей из `openspec status --change <name> --json`: specs и design требуют proposal; tasks требует specs+design; `applyRequires: ["tasks"]`. `status` — только факт существования файлов.
- Шаблоны (`openspec instructions <artifact> --change <name>`):
  - `proposal.md`: `## Why`, `## What Changes` (BREAKING помечать), `## Capabilities` (`### New Capabilities` / `### Modified Capabilities`, kebab-case, имя — «durable system behavior», не работа), `## Impact`.
  - `design.md` (создаётся при сквозных/сложных изменениях): `## Context`, `## Goals / Non-Goals`, `## Decisions` (с альтернативами), `## Risks / Trade-offs` («[Risk] → Mitigation»), опц. Migration Plan, Open Questions (только действительно откладываемые).
  - `tasks.md`: `## 1. Группа`, `- [ ] 1.1 …`; каждая задача указывает способ проверки; тесты/доки — в той же группе, не в конце.
  - spec-дельта: см. B5.
- Slash-команды: `/opsx:explore` (думать, не писать код) → `/opsx:propose <идея>` → ревью плана → `/opsx:apply` → `/opsx:archive` (дельты сливаются в main specs). `/opsx:update` — согласованно править артефакты; `/opsx:sync` — агентное слияние дельт без архивации.
- Для ДЗ (только спецификация) достаточно: propose → ревью (Goldfish + эксперты) → правки → `validate --strict` → archive (чтобы `openspec/specs/` содержал итоговую спецификацию) `[ИНТЕРПРЕТАЦИЯ]`.

### B5. Точный формат дельты
Из `openspec instructions specs` и `docs/writing-specs.md`:
```markdown
# Spec Delta

## Purpose

Одна-две фразы (≥ 50 символов), зачем нужна capability. Только для НОВОЙ capability.

## ADDED Requirements

### Requirement: Поиск телефонов по имени
Система SHALL возвращать все телефоны, связанные с точно совпадающим именем.

#### Scenario: Имя найдено
- **WHEN** пользователь ищет имя «Иван Петров», у которого два телефона
- **THEN** система возвращает оба телефона

## MODIFIED Requirements      # полный текст требования целиком; заголовок совпадает с существующим
## REMOVED Requirements       # с **Reason** и **Migration**
## RENAMED Requirements       # FROM:/TO:
```
- Сценарии — ровно `####`; GIVEN/WHEN/THEN допустимы (в доках примеры с `- GIVEN`).
- Описание требования (текст между `### Requirement:` и первым сценарием) ≤ 500 символов; одно поведение на требование.
- Нормативные слова RFC 2119: `MUST`/`SHALL` — жёсткое; `SHOULD`, `MAY` — слабее (writing-specs.md).
- `docs/multi-language.md`: «OpenSpec's document structure and normative SHALL/MUST keywords remain in English because validation relies on them. The surrounding requirement and scenario prose can use your selected language.»
- При архивации ADDED дописываются, MODIFIED заменяют, REMOVED удаляют; удаление последнего требования требует `retire_capabilities: true`. MODIFIED/RENAMED к несуществующей спеке архив отвергнет.

### B6. Правила `openspec validate` — результаты проб `[ПРОВЕРЕНО ЛОКАЛЬНО]`
Пробы в локальном каталоге агента, проба `openspec-probe` (OpenSpec 1.15.0). `--strict` превращает WARNING в провал (exit code 1); ERROR проваливает и без `--strict`.

| # | Случай | Обычный | `--strict` |
|---|---|---|---|
| 0 | Русский текст + `SHALL` / `MUST` в теле, русские заголовки требований и сценариев, `**WHEN**/**THEN**` | valid | **valid** |
| 1 | Русский текст без ключевого слова («должна») | WARNING «should contain SHALL or MUST (RFC 2119…)» | **fail** |
| 2 | `shall` строчными | WARNING | **fail** (регистр важен) |
| 3 | `**КОГДА**/**ТОГДА**` вместо WHEN/THEN | valid | **valid** (ключи сценария не проверяются) |
| 4 | Требование без сценария | ERROR «must include at least one scenario» | fail |
| 5 | Сценарий `###` вместо `####` | INFO «not a "### Requirement:" header… ignored» + ERROR нет сценария | fail |
| 6 | `## Purpose` < 50 символов в дельте | valid | valid (проверка — только у main spec после архивации: WARNING «Purpose section is too brief», strict fail) |
| 7 | Нет `## Purpose` в дельте новой capability | valid | valid; после archive в main spec «TBD … Update Purpose after archive» → WARNING «placeholder», strict fail |
| 8 | Описание требования > 500 символов | WARNING «Requirement text is very long (>500 characters)» | **fail** |
| 9 | `SHALL` только в сценарии | WARNING | **fail** |
| 10 | `SHOULD` вместо SHALL | WARNING | **fail** |
| 11 | Нет заголовка `## ADDED Requirements` | ERROR «No delta sections found» + «Change must have at least one delta» | fail |
| 12 | Два требования с одним именем в ADDED | ERROR «Duplicate requirement in ADDED» | fail |
| 13 | `MUST` на второй строке описания | valid | valid (проверяется весь текст описания) |
| 14 | `SHALL` только в заголовке `### Requirement:` | WARNING «…not only in the header» | **fail** |
| 15 | Пустой сценарий (только заголовок) | ERROR (сценарий без тела не считается) | fail |
| 16 | MODIFIED к несуществующей спеке | valid + INFO «Archive would refuse this delta» | valid (но archive откажет) |
| 17 | REMOVED без Reason/Migration | valid | valid (не проверяется — правило только в инструкции) |
| 18 | `MUSTARD` (подстрока) | WARNING | fail (нужно отдельное слово) |
| 19 | `MUST NOT` | valid | valid |
| 20 | Change без `proposal.md`/`design.md`/`tasks.md`, только дельта | valid | valid (validate проверяет дельты, а не наличие артефактов; archive без tasks.md тоже прошёл) |
| 21 | Имя change с пробелами / заглавными | `new change` отказывает: «cannot contain spaces», «must be lowercase (use kebab-case)» | — |
| 22 | Кириллическое имя каталога capability (`specs/поиск-имён/`) | valid, архивируется | valid (но инструкции требуют kebab-case; лучше латиница) |

Итог: **русский текст требования со вставленным «SHALL»/«MUST» (заглавными, отдельным словом, в теле требования) проходит `validate --strict`**. Валидатор проверяет структуру markdown (дельта-заголовки, `### Requirement:`, `####` сценарии с телом), наличие SHALL/MUST в теле, длину ≤ 500, дубли, а для main specs — `## Purpose` (≥ 50 символов, не плейсхолдер) и `## Requirements`. Он **не** проверяет: смысл, WHEN/THEN, Reason/Migration у REMOVED, наличие proposal/design/tasks, соответствие Capabilities в proposal реальным файлам дельт.

---

## Часть C. Рекомендации для оркестратора

### C1. Рецепт инициализации OpenSpec в папке проекта
```bash
cd /e/projects/best-undefined-database
git init                                   # рекомендовано (история ADR/спек); OpenSpec git не требует
export OPENSPEC_TELEMETRY=0
npx --yes @fission-ai/openspec@1.15.0 init --tools claude --language "Russian" --profile core --no-animation --no-copilot-cloud .
npx --yes @fission-ai/openspec@1.15.0 list --json        # проверить, что root найден
```
`[ПРОВЕРЕНО ЛОКАЛЬНО]` команда init с этими флагами отработала в локальном каталоге агента (проба `openspec-probe2`) и записала `Language: Russian` в `config.yaml`.
Затем дописать в `openspec/config.yaml` → `context:` (кратко, это уходит в каждый запрос) и `rules:`:
```yaml
schema: spec-driven
context: |
  Language: Russian. All artifacts must be written in Russian.
  Keep OpenSpec structural headings (## ADDED Requirements, ### Requirement:, #### Scenario:, **WHEN**/**THEN**)
  and the normative keywords SHALL/MUST in English, uppercase, inside the requirement body (not only in the header).
  Product: from-scratch database of Names and Phones; visual UI + programmatic API;
  lookup phones by name and names by phone; durable storage of many records.
  Constraint: no existing DBMS or storage engine may be used.
  Every non-trivial factual claim cites a source from docs/research/ (Fact Grounding); unverified -> [НЕ ПОДТВЕРЖДЕНО].
  Architecture decisions live in docs/adr/ (MADR); design.md links to them.
  Each requirement traces to a CUJ id from docs/cuj.md.
rules:
  specs:
    - One behavior per requirement, description <= 500 characters, at least one scenario
    - Capability folder names in kebab-case Latin
    - Reference CUJ ids (e.g. CUJ-2) in scenario names or text
  design:
    - Every decision lists alternatives and links an ADR in docs/adr/
  proposal:
    - State out-of-scope explicitly
```
Проверка: `npx --yes @fission-ai/openspec@1.15.0 instructions proposal --change <name>` должна показать этот контекст. Гейт перед каждым ревью и перед archive: `openspec validate --all --strict` (exit code 0). После archive — проверить, что у main specs нет `TBD` в Purpose.

Команды в Claude Code: `/opsx:explore`, `/opsx:propose <идея>`, `/opsx:update`, `/opsx:archive`. Без интерактива: `openspec new change <kebab>`, `openspec status --change <n> --json`, `openspec instructions <artifact> --change <n> --json`.

### C2. Применение принципов в проекте
1. **CUJ** — `docs/cuj.md`: 5–7 путей `CUJ-1…`, формат user/goal/tasks + измеримый критерий (SRE-подход). Кандидаты `[ИНТЕРПРЕТАЦИЯ]`: добавить контакт через UI; найти телефоны по имени; найти имена по телефону; программная массовая загрузка/чтение через API; изменить/удалить запись; пережить аварийное завершение без потери подтверждённых записей; работа на большом объёме записей. Матрица трассировки CUJ → Requirement → Scenario (в `docs/cuj.md` или `docs/traceability.md`); каждый CUJ покрыт сценарием в дельтах.
2. **Elephant + Goldfish** — Elephant: сессия оркестратора + артефакты change; правило «No code»; ИИ предлагает первый дизайн, оркестратор/заказчик спорит; design пишется по секциям. Goldfish: после `validate --strict` — 3 параллельных субагента с пустым контекстом (A comprehension, B critic, C readiness) с преамбулой из `marcus-darden/egm` (`skills/goldfish/assets/goldfish-reviewer-prompts.md`), получают только пути к `openspec/changes/<n>/**` и файлам, на которые они ссылаются; запрет читать `docs/review/`, журналы и чат. Сохранять в `docs/review/<change>/goldfish-{A,B,C}-r<N>.md` + `docs/review/<change>/GOLDFISH.md` (раунды, промпты как отправлены, вердикты, `human_review_gate`). Цикл до nit-level + человеческий гейт (или `skipped-solo`).
3. **ADR** — `docs/adr/NNNN-kebab-title.md` в формате MADR 4.0 (Context and Problem Statement, Decision Drivers, Considered Options, Decision Outcome, Consequences) + поле Status по Nygard; неизменяемы, замена — новый ADR со `superseded by`. Ожидаемые ADR: язык/рантайм; формат файла и журнал (WAL/append-only); стратегия durability (fsync); индексы для двух направлений поиска; нормализация и уникальность телефонов; модель данных (многие-ко-многим имя↔телефон?); протокол API; технология UI; конкурентный доступ. `design.md` → «Decisions» ссылается на ADR.
4. **LLM-expert review** — `docs/review/rubric.md` (критерии: тестируемость, полнота CUJ, надёжность хранения, однозначность, «написано с нуля», соответствие ДЗ) составить **до** ревью (Rensin «Trust But Verify»). Эксперты-субагенты (не автор): «инженер СУБД/хранения», «API-дизайнер», «UX», «QA», «скептик-фактчекер»; вывод — список замечаний с severity и ссылкой на Requirement; сводка с решениями accepted/rejected+причина в `docs/review/<change>/experts.md`. Отличие от Goldfish: эксперты получают рубрику и research-документы.
5. **Fact Grounding** — `docs/research/NN-*.md` с URL и датой; утверждения о внешнем мире в design/ADR — со ссылкой; `[НЕ ПОДТВЕРЖДЕНО]` для непроверенного; отдельный проход fact-check (CoVe: извлечь утверждения → проверить независимо → исправить) с отчётом `docs/review/<change>/fact-check.md`; поведение инструментов подтверждать запуском (`openspec validate --strict`), а не памятью.

### C3. Предлагаемый порядок работы `[ИНТЕРПРЕТАЦИЯ]`
`docs/research/*` → `docs/cuj.md` → init OpenSpec + config → `/opsx:explore` (Elephant-диалог) → ADR-черновики → `/opsx:propose` (один или несколько changes, по одной цели на change) → `validate --strict` → Goldfish A/B/C → экспертное ревью → fact-check → правки (`/opsx:update`) → повтор до nit-level → человеческий гейт → `openspec archive -y` → `validate --all --strict`.

---

## Реестр источников (обращение 2026-10-24)
- Rensin D. «Elephants, Goldfish and the New Golden Age of Software Engineering», 2026-04-27 — https://drensin.medium.com/elephants-goldfish-and-the-new-golden-age-of-software-engineering-c33641a48874 ; https://research.google/pubs/elephants-goldfish-and-the-new-golden-age-of-software-engineering/
- Google EGM plugin — https://github.com/google/elephant-goldfish-model ; https://egm.dev
- marcus-darden/egm (Agent Skills) — https://github.com/marcus-darden/egm
- Google SRE Workbook, Implementing SLOs — https://sre.google/workbook/implementing-slos/
- Google Cloud, practical guide to setting SLOs — https://cloud.google.com/blog/products/management-tools/practical-guide-to-setting-slos
- Mind the Product, Bargas-Avila, CUJ — https://www.mindtheproduct.com/product-development-and-ux-critical-user-journeys/
- Nygard M., 2011-11-15 — https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions
- adr.github.io — https://adr.github.io/ ; MADR 4.0.0 — https://adr.github.io/madr/
- Zheng et al. 2023 — https://arxiv.org/abs/2306.05685 ; ChatEval — https://arxiv.org/abs/2308.07201 ; SPP — https://arxiv.org/abs/2307.05300 ; обзоры — https://arxiv.org/abs/2411.15594 , https://arxiv.org/abs/2412.05579
- Anthropic, Building effective agents, 2024-12-19 — https://www.anthropic.com/engineering/building-effective-agents
- Vertex AI grounding — https://docs.cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview
- FACTS Grounding — https://deepmind.google/discover/blog/facts-grounding-a-new-benchmark-for-evaluating-the-factuality-of-large-language-models/ ; https://arxiv.org/abs/2501.03200
- Chain-of-Verification — https://arxiv.org/abs/2309.11495
- OpenSpec — https://github.com/Fission-AI/OpenSpec (docs/*.md, ветка main); npm `@fission-ai/openspec` 1.15.0; локальные пробы CLI 1.15.0.
