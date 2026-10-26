# BUDB — база данных имён и телефонов

BUDB («Best Undefined DataBase») — база данных имён и телефонов, которую предстоит написать с нуля на Rust.
Она хранит контакты (имя и до 10 телефонов), ищет телефоны по имени и имена по номеру, точно и по префиксу.
Есть визуальный веб-интерфейс, программное HTTP API и Admin CLI. Цель проектирования: 10^8 контактов на одном узле
с надёжным хранением (долговечность подтверждённых записей, бэкап, восстановление, проверка целостности).
Сторонние СУБД, KV-хранилища, WAL и индексные движки не используются (NFR-SCRATCH).

## Статус

Спецификация v1 завершена (351 требование, 827 сценариев, 18 ADR, 10 CUJ), реализация не начата. Кода в репозитории нет.
Change `openspec/changes/add-phonebook-db-v1` остаётся активным: он не архивирован, его дельта-спецификации не слиты
в `openspec/specs/` (решение D-122).

## Ключевая архитектура

- **Движок.** Copy-on-write B+tree, страницы 4 KiB с CRC32C, две мета-страницы, один писатель и MVCC-читатели: [ADR-0003](docs/adr/0003-storage-engine-cow-btree.md).
- **Без mmap.** Чтение и запись через `pread`/`pwrite`, собственный кэш страниц: [ADR-0004](docs/adr/0004-no-mmap-own-page-cache.md).
- **Долговечность.** Подтверждение только после fsync страниц и мета-страницы; ошибка fsync означает fail-stop: [ADR-0005](docs/adr/0005-commit-and-durability-protocol.md).
- **С нуля.** Allowlist прямых зависимостей и denylist по всему графу (cargo-deny): [ADR-0006](docs/adr/0006-dependency-policy-from-scratch.md); `unsafe` только в крейте `budb-sys`: [ADR-0018](docs/adr/0018-unsafe-isolation-budb-sys.md).
- **Поиск.** Ключ имени NFKC_Casefold, затем ё→е ([ADR-0009](docs/adr/0009-name-search-key.md)); телефоны хранятся в E.164, разбор написан самостоятельно ([ADR-0008](docs/adr/0008-phone-normalization.md)).
- **Интерфейсы.** HTTP/JSON `/api/v1`, поиск через POST (ПДн не в URL), Admin CLI: [ADR-0010](docs/adr/0010-api-style.md); UI на чистом TypeScript и Web Components: [ADR-0016](docs/adr/0016-web-ui-technology.md).
- **Безопасность и ПДн.** Локальные учётные записи и роли, корзина, purge по запросу субъекта: [ADR-0011](docs/adr/0011-authentication-and-authorization.md), [ADR-0012](docs/adr/0012-deletion-trash-and-purge.md).
- **Надёжность.** Онлайн-бэкап из снимка ([ADR-0013](docs/adr/0013-backup-from-snapshot.md)); детерминированная симуляция, fault injection, kill -9, LazyFS ([ADR-0015](docs/adr/0015-reliability-testing.md)).

Полный список решений: [docs/adr/README.md](docs/adr/README.md). Сводка для реализации: [design.md](openspec/changes/add-phonebook-db-v1/design.md).

## Как начать реализацию

1. Прочитайте [CLAUDE.md](CLAUDE.md): правила для агентов и контрибьюторов (источник истины, ID требований, проверки, git).
2. Откройте [tasks.md](openspec/changes/add-phonebook-db-v1/tasks.md): 154 задачи в фазах 0…17 (каркас и CI, формат страниц,
   B+tree, COW и коммит, восстановление, домен, HTTP API, безопасность, бэкап, CLI, UI, бенчмарки, crash-тесты).
3. Реализуйте задачи по порядку фаз командой `/opsx:apply` (Claude Code, OpenSpec 1.15.0): она берёт следующую
   невыполненную задачу и отмечает её. Что строить, определяют `specs/*/spec.md`; как строить, описывает `design.md`.
4. Решение, меняющее ADR или требование, оформляйте новым ADR или записью D-NNN в [docs/orchestrator-decisions.md](docs/orchestrator-decisions.md).

Не запускайте `archive` и `sync` до завершения реализации: change остаётся активным.

## Карта репозитория

```
README.md, CLAUDE.md, AGENTS.md   вход, правила работы, указатель для агентов
REPORT.md                         отчёт о создании спецификации (ДЗ)
openspec/config.yaml              контекст и правила OpenSpec
openspec/changes/add-phonebook-db-v1/
  proposal.md                     вводные, критерии «хорошей БД», вне скоупа v1
  design.md                       техническое решение, риски, сводка решений
  tasks.md                        чек-лист реализации, фазы 0…17
  specs/<capability>/spec.md      15 спецификаций (нормативны)
docs/adr/                         18 ADR (MADR 4.0) и индекс
docs/cuj.md                       CUJ-01…CUJ-10, SLI/SLO
docs/orchestrator-decisions.md    решения D-001…D-127
docs/traceability.md              матрица CUJ → требования → ADR (генерируется)
docs/research/, docs/reviews/     исследования и ревью (Goldfish, эксперты)
docs/assignment.md, glossary.md   текст задания, термины
scripts/                          traceability.mjs, check-links.mjs
.github/workflows/spec-check.yml  CI: проверки спецификации
```

## Проверки и команды

Нужны Node.js 22 и доступ к npm. Команды выполняются из корня репозитория:

```
npx --yes @fission-ai/openspec@1.15.0 validate --all --strict   # структура и формат спецификаций
node scripts/traceability.mjs --check                           # трассировка CUJ → требования → задачи
node scripts/traceability.mjs                                   # перегенерировать docs/traceability.md
node scripts/check-links.mjs                                    # битые относительные ссылки в *.md
```

Те же три проверки (без перегенерации) запускает CI при каждом push и pull request.
Если нужен чистый запуск без телеметрии, задайте `OPENSPEC_TELEMETRY=0`.

## Как создавалась спецификация

[REPORT.md](REPORT.md) — отчёт о том, как создавалась спецификация (учебное ДЗ): процесс, принципы (CUJ, Elephant + Goldfish,
ADR, LLM-expert review, Fact Grounding), реестр решений и результаты четырёх раундов ревью.
Исходное задание: [docs/assignment.md](docs/assignment.md).

## Лицензия

Не выбрана (решение владельца).
