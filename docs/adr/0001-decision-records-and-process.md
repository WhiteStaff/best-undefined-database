---
status: accepted
date: 2026-10-24
decision-makers: Elephant (оркестратор, прокси заказчика по D-008)
consulted: агент-исследователь (docs/research/01-principles-and-openspec.md)
informed: все агенты-исполнители (Goldfish)
---

# 0001. Запись решений и процесс: OpenSpec + Elephant/Goldfish + LLM-expert review + Fact Grounding

## Status

Accepted, 2026-10-24. Решения D-001, D-002, D-003, D-004, D-005, D-006, D-007, D-008, D-030 (см. `docs/orchestrator-decisions.md`).

## Context and Problem Statement

BUDB специфицируется LLM-агентами без участия человека-заказчика: человек заявил, что в процессе не участвует (D-008). Нужен процесс, при котором решения не теряются между сессиями агентов, спецификация проверяется независимо от автора, утверждения о внешнем мире подкреплены источниками, а история изменений сохраняется как доказательство для отчёта по ДЗ.

Как записывать решения и как устроить цикл «написать → проверить → исправить», чтобы результат был самодостаточным и проверяемым?

## Decision Drivers

* Агенты-исполнители не имеют памяти между сессиями; всё решённое должно попасть в файлы (Rensin: «Feed the Elephant; test it against the Goldfish», docs/research/01, §A2).
* Спецификация должна проходить механическую проверку структуры (`openspec validate --strict`, docs/research/01, §B6).
* Автор не должен оценивать сам себя: LLM-судьи подвержены self-enhancement bias (Zheng et al., docs/research/01, §A4).
* Утверждения о стандартах, ОС и законах должны ссылаться на источник (Fact Grounding, docs/research/01, §A5).
* Решения неизменяемы; отменённое решение замещается, а не переписывается (Nygard, docs/research/01, §A3).

## Considered Options

1. **OpenSpec 1.15 + Elephant/Goldfish + LLM-expert review + Fact Grounding + ADR в MADR 4.0 со статусами Nygard** (выбрано).
2. **Свободный дизайн-документ без OpenSpec** с ручным ревью одним агентом.
3. **Официальный плагин Google EGM** (`google/elephant-goldfish-model`) вместо ручного запуска ревьюеров.
4. **Только `design.md` из OpenSpec без отдельных ADR.**

## Decision Outcome

Выбран вариант 1, потому что только он одновременно даёт механическую проверку структуры, независимое ревью свежими агентами и неизменяемый журнал решений.

Состав процесса:

* **OpenSpec CLI** закреплён на `@fission-ai/openspec@1.15.0`; контекст проекта — в `openspec/config.yaml`, поле `context:` (D-003). Текст спецификаций на русском, SHALL/MUST и WHEN/THEN по-английски (D-004).
* **Elephant/Goldfish** (D-001): оркестратор (Elephant) хранит контекст и принимает решения в `docs/orchestrator-decisions.md`; агенты-исполнители (Goldfish) получают узкую задачу и свежий контекст и решений не меняют.
* **Ревью Goldfish** (D-006): три роли в стиле EGM — Comprehension, Critic, Readiness — запускаются вручную как субагенты; журнал — `docs/reviews/GOLDFISH.md`. Внешний плагин не ставится.
* **LLM-expert review:** отдельные агенты-эксперты (не автор) с рубрикой, составленной до ревью (docs/research/01, §A4, §C2 п. 4).
* **Fact Grounding:** каждое нетривиальное утверждение о внешнем мире ссылается на `docs/research/0N` (раздел); непроверенное помечается `[НЕ ПОДТВЕРЖДЕНО]`, допущение — `[ДОПУЩЕНИЕ]` (docs/research/01, §A5).
* **ADR** — `docs/adr/NNNN-kebab-title.md`, MADR 4.0 + статусы Nygard (proposed / accepted / deprecated / superseded); принятый ADR не переписывается, а замещается новым (D-005).
* **Технологическая нейтральность** (D-007, уточнено D-030): поведенческие спецификации не называют технологий. Исключения: `build-constraints` (одно требование «с нуля на Rust» со ссылкой на ADR 0002, 0006) и `storage-engine`, `backup-restore`, `performance-capacity` — они МОГУТ называть механизмы движка (CRC32C страниц, мета-страницы, COW, протокол fsync, MVCC), потому что это проверяемые гарантии движка, написанного с нуля (D-030).
* **Гейт:** человеческий гейт цикла EGM закрывает оркестратор как прокси заказчика; в отчёте это пишется прямо (D-008).
* **Git:** история ведётся локально, без push (D-002).

Почему выбран формат ADR MADR 4.0 + Nygard (D-005): MADR даёт структурированный шаблон с рассмотренными вариантами (Considered Options), а модель Nygard — неизменяемость и сквозную нумерацию. Почему ревью вручную (D-006): внешняя зависимость не нужна, свежих субагентов достаточно. Почему спецификации нейтральны (D-007): их можно проверять независимо от стека, а ADR можно заменить (supersede), не трогая спецификации.

### Consequences

* Good, потому что решения переживают смену агентов: всё записано в файлах, а не в чате.
* Good, потому что `validate --strict` ловит структурные ошибки (нет SHALL, нет сценария, описание > 500 символов — docs/research/01, §B6).
* Good, потому что отвергнутые варианты зафиксированы в ADR и не предлагаются повторно (docs/research/01, §A3, интерпретация исследователя).
* Bad, потому что гейт закрывает не человек, а оркестратор; независимость финального решения ниже, чем в исходной методологии EGM (docs/research/01, §A2: поле `human_review_gate` меняет только человек).
* Bad, потому что валидатор не проверяет смысл, WHEN/THEN и трассировку к CUJ (docs/research/01, §B6, итог) — это ложится на ревью.
* Bad, потому что исключение D-030 размывает границу нейтральности: в четырёх capability появляются названия механизмов, и при замене движка эти спецификации придётся менять вместе с ADR 0003–0005.

### Confirmation

* `npx --yes @fission-ai/openspec@1.15.0 validate --all --strict` завершается с кодом 0.
* `npx --yes @fission-ai/openspec@1.15.0 instructions specs --change add-phonebook-db-v1` показывает правила из `openspec/config.yaml`, включая исключение D-030.
* `docs/reviews/GOLDFISH.md` содержит раунды A/B/C до уровня nit и запись «гейт закрыт оркестратором».
* Ревью: в ADR нет фактов без ссылки на `docs/research/` или без пометки; каждый ADR имеет статус и ссылку на решение D-NNN.

## Pros and Cons of the Options

### OpenSpec + EGM + эксперты + Fact Grounding + ADR

* Good, потому что структура проверяется CLI (docs/research/01, §B6).
* Good, потому что ревью ведут свежие агенты без утечки контекста Elephant (docs/research/01, §A2).
* Bad, потому что процесс длиннее: несколько раундов ревью.

### Свободный дизайн-документ без OpenSpec

* Good, потому что меньше церемоний.
* Bad, потому что нет механической проверки и формата «требование → сценарий».

### Плагин Google EGM

* Good, потому что готовые персоны ревьюеров (docs/research/01, §A2).
* Bad, потому что это внешняя зависимость; репозиторий помечен «not an officially supported Google product» (docs/research/01, §A2).

### Только design.md без ADR

* Good, потому что `design.md` уже содержит раздел Decisions с альтернативами (docs/research/01, §A3).
* Bad, потому что нет неизменяемости и сквозной нумерации между changes (docs/research/01, §A3).

## More Information

* Rensin D., «Elephants, Goldfish and the New Golden Age of Software Engineering», 2026-04-27 — https://drensin.medium.com/elephants-goldfish-and-the-new-golden-age-of-software-engineering-c33641a48874 (docs/research/01, §A2).
* Google EGM — https://github.com/google/elephant-goldfish-model ; marcus-darden/egm — https://github.com/marcus-darden/egm (docs/research/01, §A2).
* Nygard M., «Documenting Architecture Decisions», 2011 — https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions ; MADR 4.0.0 — https://adr.github.io/madr/ (docs/research/01, §A3).
* Zheng et al., arXiv:2306.05685 — https://arxiv.org/abs/2306.05685 (docs/research/01, §A4).
* Vertex AI grounding — https://docs.cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview ; FACTS Grounding — https://arxiv.org/abs/2501.03200 (docs/research/01, §A5).
* OpenSpec — https://github.com/Fission-AI/OpenSpec (docs/research/01, §B1–§B6).
* Связанные ADR: все остальные ADR этого каталога следуют процессу, описанному здесь.
