# Матрица трассировки BUDB

Файл сгенерирован скриптом `scripts/traceability.mjs` из `openspec/changes/add-phonebook-db-v1/specs/*/spec.md` (строки `Трассировка:` и `#### Scenario:`) и `docs/cuj.md`. Вручную не редактировать: после изменения спецификаций выполнить `node scripts/traceability.mjs` (проверка без расхождений — `node scripts/traceability.mjs --check`).

Содержание: 1 — сводка по capability; 2 — CUJ → требования; 3 — требования без CUJ; 4 — CUJ без требований; 5 — требование → CUJ, ADR, решения; 6 — ADR → требования; 7 — прочие проверки.

## 1. Сводка: требования и сценарии по capability

| Capability | Префикс ID | Требований | Сценариев | CUJ, на которые ссылается |
|---|---|---:|---:|---|
| `access-control` | ACL | 22 | 41 | 01, 02, 03, 05, 06, 07, 09, 10 |
| `admin-cli` | CLI | 16 | 32 | 05, 06, 07, 08, 09, 10 |
| `backup-restore` | BKP | 12 | 21 | 07, 08, 09 |
| `build-constraints` | BLD | 19 | 29 | 01, 02, 03, 05, 07, 08, 10 |
| `contacts` | CON | 19 | 33 | 01, 03, 04, 05, 06, 07, 09 |
| `data-privacy` | PRV | 17 | 26 | 03, 06, 07, 08, 09, 10 |
| `http-api` | API | 28 | 63 | 01, 02, 03, 04, 05, 06, 07, 08, 09, 10 |
| `import-export` | IMP | 16 | 27 | 03, 05, 06, 07, 08, 09 |
| `name-normalization` | NAM | 12 | 21 | 02, 03, 06, 07, 08 |
| `observability` | OBS | 15 | 22 | 01, 02, 03, 05, 06, 07, 08, 09, 10 |
| `performance-capacity` | PERF | 16 | 23 | 01, 02, 03, 05, 06, 07, 08 |
| `phone-normalization` | PHN | 16 | 32 | 01, 03, 05, 06, 08 |
| `search` | SRCH | 15 | 31 | 01, 02, 03, 05, 08, 09 |
| `storage-engine` | STO | 24 | 42 | 01, 02, 03, 04, 05, 06, 07, 08 |
| `web-ui` | UI | 23 | 44 | 01, 02, 03, 04, 06, 07, 08, 09, 10 |
| **Всего** (15 capability) | | **270** | **487** | 10 CUJ |

## 2. CUJ → требования

В строку CUJ попадают ID всех требований, у которых в строке `Трассировка:` есть этот CUJ. Одно требование может трассироваться к нескольким CUJ.

| CUJ | Название | Требований | ID требований |
|---|---|---:|---|
| CUJ-01 | Кто звонит (телефон → имена) | 55 | ACL-03, ACL-11, ACL-12, ACL-19, API-05, API-10, API-11, BLD-15, CON-07, CON-11, OBS-04, OBS-06, PERF-02, PERF-03, PERF-04, PERF-05, PERF-08, PERF-09, PERF-10, PERF-11, PERF-13, PERF-15, PERF-16, PHN-01, PHN-02, PHN-05, PHN-06, PHN-11, SRCH-01, SRCH-02, SRCH-03, SRCH-06, SRCH-07, SRCH-08, SRCH-13, SRCH-14, SRCH-15, STO-03, STO-06, STO-09, STO-10, STO-19, STO-22, STO-24, UI-01, UI-02, UI-03, UI-04, UI-05, UI-06, UI-19, UI-20, UI-21, UI-22, UI-23 |
| CUJ-02 | Найти телефон по имени (префикс) | 48 | ACL-19, API-10, API-12, API-13, BLD-15, NAM-01, NAM-02, NAM-05, NAM-06, NAM-07, NAM-08, NAM-09, NAM-10, NAM-11, NAM-12, OBS-04, PERF-02, PERF-03, PERF-04, PERF-05, PERF-08, PERF-13, PERF-15, SRCH-04, SRCH-05, SRCH-06, SRCH-07, SRCH-08, SRCH-09, SRCH-10, SRCH-11, SRCH-12, SRCH-13, SRCH-14, SRCH-15, STO-03, STO-06, STO-09, STO-19, STO-22, UI-01, UI-02, UI-03, UI-04, UI-05, UI-06, UI-19, UI-22 |
| CUJ-03 | Добавить или изменить контакт с подтверждением долговечности | 95 | ACL-03, ACL-14, API-04, API-06, API-07, API-15, API-20, API-22, API-23, API-28, BLD-01, BLD-02, BLD-03, BLD-04, BLD-05, BLD-06, BLD-07, BLD-08, BLD-09, BLD-12, BLD-13, BLD-14, BLD-15, BLD-17, BLD-18, CON-01, CON-02, CON-03, CON-04, CON-05, CON-06, CON-07, CON-08, CON-09, CON-10, CON-12, CON-14, CON-15, CON-16, CON-17, CON-18, CON-19, IMP-09, NAM-01, NAM-02, NAM-03, NAM-04, OBS-04, OBS-07, OBS-08, OBS-10, PERF-02, PERF-03, PERF-06, PERF-11, PERF-13, PERF-14, PERF-15, PERF-16, PHN-01, PHN-02, PHN-03, PHN-04, PHN-05, PHN-06, PHN-07, PHN-09, PHN-10, PHN-11, PHN-12, PHN-14, PHN-15, PRV-02, PRV-03, SRCH-14, STO-04, STO-05, STO-06, STO-07, STO-08, STO-10, STO-11, STO-12, STO-13, STO-14, STO-16, STO-21, STO-23, UI-07, UI-08, UI-09, UI-11, UI-17, UI-20, UI-23 |
| CUJ-04 | Обнаружение конфликта одновременного редактирования | 6 | API-06, API-08, API-09, CON-13, STO-08, UI-10 |
| CUJ-05 | Интегратор подключается через API | 54 | ACL-04, ACL-07, ACL-08, ACL-09, ACL-17, ACL-20, API-01, API-02, API-03, API-04, API-05, API-09, API-10, API-11, API-12, API-13, API-14, API-15, API-16, API-17, API-18, API-19, API-21, API-28, BLD-02, BLD-10, CLI-06, CON-01, CON-02, CON-05, CON-11, CON-12, CON-13, CON-19, IMP-04, OBS-10, PERF-08, PERF-14, PHN-08, PHN-13, PHN-14, SRCH-01, SRCH-02, SRCH-03, SRCH-04, SRCH-05, SRCH-06, SRCH-07, SRCH-09, SRCH-10, SRCH-11, SRCH-12, SRCH-13, STO-12 |
| CUJ-06 | Массовый импорт и экспорт | 46 | ACL-03, ACL-22, API-16, API-17, API-18, API-25, API-26, CLI-10, CON-03, IMP-01, IMP-02, IMP-03, IMP-04, IMP-05, IMP-06, IMP-07, IMP-08, IMP-09, IMP-10, IMP-11, IMP-12, IMP-13, IMP-14, IMP-15, IMP-16, NAM-03, NAM-04, OBS-05, OBS-09, PERF-01, PERF-11, PERF-12, PHN-03, PHN-07, PHN-08, PHN-12, PHN-13, PHN-14, PHN-16, PRV-02, PRV-16, STO-09, STO-13, STO-24, UI-13, UI-14 |
| CUJ-07 | Бэкап, восстановление и восстановление после сбоя | 72 | ACL-18, API-27, BKP-01, BKP-02, BKP-03, BKP-04, BKP-05, BKP-06, BKP-07, BKP-08, BKP-09, BKP-10, BKP-11, BKP-12, BLD-01, BLD-03, BLD-04, BLD-05, BLD-06, BLD-07, BLD-08, BLD-09, BLD-10, BLD-11, BLD-12, BLD-13, BLD-14, BLD-16, BLD-17, BLD-18, BLD-19, CLI-01, CLI-02, CLI-03, CLI-04, CLI-07, CLI-13, CLI-14, CLI-15, CON-10, IMP-10, IMP-13, IMP-16, NAM-10, NAM-11, OBS-01, OBS-02, OBS-07, OBS-09, OBS-11, OBS-14, PERF-07, PRV-07, PRV-09, PRV-10, PRV-11, PRV-17, STO-01, STO-02, STO-03, STO-04, STO-05, STO-07, STO-11, STO-14, STO-15, STO-16, STO-17, STO-18, STO-20, STO-23, UI-15 |
| CUJ-08 | Мониторинг состояния и ёмкости | 51 | API-19, API-20, API-27, BKP-04, BKP-08, BKP-10, BKP-11, BLD-19, CLI-02, CLI-11, CLI-13, CLI-14, IMP-06, IMP-12, IMP-14, NAM-09, NAM-10, OBS-01, OBS-02, OBS-03, OBS-04, OBS-05, OBS-06, OBS-07, OBS-08, OBS-09, OBS-10, OBS-11, OBS-12, OBS-13, OBS-14, OBS-15, PERF-01, PERF-09, PERF-10, PERF-12, PERF-14, PERF-16, PHN-15, PHN-16, PRV-12, PRV-14, SRCH-12, STO-10, STO-16, STO-18, STO-19, STO-22, STO-24, UI-15, UI-23 |
| CUJ-09 | Удаление ПДн по запросу субъекта | 35 | ACL-03, API-07, API-22, API-24, BKP-07, BKP-09, BKP-12, CLI-08, CLI-09, CLI-15, CLI-16, CON-09, CON-14, CON-16, CON-17, IMP-08, OBS-12, OBS-13, PRV-01, PRV-03, PRV-04, PRV-05, PRV-06, PRV-07, PRV-08, PRV-09, PRV-10, PRV-11, PRV-12, PRV-13, PRV-14, PRV-15, PRV-16, SRCH-15, UI-12 |
| CUJ-10 | Администратор управляет пользователями и доступом | 33 | ACL-01, ACL-02, ACL-03, ACL-04, ACL-05, ACL-06, ACL-07, ACL-09, ACL-10, ACL-11, ACL-13, ACL-15, ACL-16, ACL-17, ACL-18, ACL-21, API-21, API-27, BLD-02, BLD-10, CLI-01, CLI-03, CLI-04, CLI-05, CLI-06, CLI-12, CLI-15, CLI-16, OBS-03, PRV-12, PRV-13, UI-16, UI-18 |

## 3. Требования без CUJ

Нет: у каждого требования в строке `Трассировка:` указан хотя бы один CUJ.

## 4. CUJ без требований

Нет: на каждый CUJ из `docs/cuj.md` ссылается хотя бы одно требование.

## 5. Требование → CUJ, ADR, решения

### access-control

| ID | Требование | Сценариев | CUJ | ADR | Решения |
|---|---|---:|---|---|---|
| ACL-01 | Локальные учётные записи | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| ACL-02 | Иерархия ролей | 1 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| ACL-03 | Матрица прав по операциям | 3 | 01, 03, 06, 09, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| ACL-04 | Проверка прав на каждом запросе | 2 | 05, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| ACL-05 | Хэширование паролей | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| ACL-06 | Политика паролей | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| ACL-07 | Выдача API-токена | 2 | 05, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| ACL-08 | Хранение только хэшей токенов | 2 | 05 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| ACL-09 | Срок жизни токенов | 2 | 05, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| ACL-10 | Отзыв токенов и сессий | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| ACL-11 | Cookie UI-сессии | 2 | 01, 10 | [0011](adr/0011-authentication-and-authorization.md), [0016](adr/0016-web-ui-technology.md) | D-015 |
| ACL-12 | Тайм-ауты сессии | 2 | 01 | [0011](adr/0011-authentication-and-authorization.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-015 |
| ACL-13 | Выход из системы | 1 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| ACL-14 | Защита от CSRF | 2 | 03 | [0011](adr/0011-authentication-and-authorization.md), [0016](adr/0016-web-ui-technology.md) | D-015 |
| ACL-15 | Ограничение попыток входа | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| ACL-16 | Единый ответ при неудачном входе | 1 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| ACL-17 | Версии TLS | 2 | 05, 10 | [0011](adr/0011-authentication-and-authorization.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-015 |
| ACL-18 | Адрес прослушивания по умолчанию | 2 | 07, 10 | [0011](adr/0011-authentication-and-authorization.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-032, D-033 |
| ACL-19 | Политика CSP | 2 | 01, 02 | [0011](adr/0011-authentication-and-authorization.md), [0016](adr/0016-web-ui-technology.md) | D-031 |
| ACL-20 | Заголовки безопасности | 2 | 05 | [0011](adr/0011-authentication-and-authorization.md) | D-013, D-015 |
| ACL-21 | Первичная инициализация администратора | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015, D-032 |
| ACL-22 | Отсутствие исходящих запросов | 1 | 06 | [0011](adr/0011-authentication-and-authorization.md) | D-016 |

### admin-cli

| ID | Требование | Сценариев | CUJ | ADR | Решения |
|---|---|---:|---|---|---|
| CLI-01 | Один исполняемый файл с подкомандами | 2 | 07, 10 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-017, D-032 |
| CLI-02 | Запуск сервера budb serve | 2 | 07, 08 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-032, D-033 |
| CLI-03 | Офлайн- и онлайн-режим | 2 | 07, 10 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-017, D-032 |
| CLI-04 | Команды, требующие остановленного сервера | 2 | 07, 10 | [0013](adr/0013-backup-from-snapshot.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-018, D-025 |
| CLI-05 | Управление пользователями | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| CLI-06 | Управление токенами | 2 | 05, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| CLI-07 | Бэкап, восстановление, проверка и уплотнение | 2 | 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0013](adr/0013-backup-from-snapshot.md), [0015](adr/0015-reliability-testing.md) | D-025 |
| CLI-08 | Purge из командной строки | 2 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012, D-013 |
| CLI-09 | Поиск данных субъекта | 2 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-013 |
| CLI-10 | Импорт и экспорт | 2 | 06 | [0010](adr/0010-api-style.md) | D-016 |
| CLI-11 | Состояние базы | 2 | 08 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-025 |
| CLI-12 | Первичная инициализация | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| CLI-13 | Коды выхода | 2 | 07, 08 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-032 |
| CLI-14 | Машиночитаемый вывод | 2 | 07, 08 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-032 |
| CLI-15 | Подтверждение деструктивных операций | 2 | 07, 09, 10 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-012 |
| CLI-16 | Секреты и ПДн не в аргументах и выводе | 2 | 09, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-013, D-015 |

### backup-restore

| ID | Требование | Сценариев | CUJ | ADR | Решения |
|---|---|---:|---|---|---|
| BKP-01 | Онлайн-бэкап из MVCC-снимка | 1 | 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0013](adr/0013-backup-from-snapshot.md) | D-018, D-025 |
| BKP-02 | Формат файла бэкапа | 2 | 07 | [0013](adr/0013-backup-from-snapshot.md) | D-025 |
| BKP-03 | Атомарная и долговечная запись бэкапа | 2 | 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0013](adr/0013-backup-from-snapshot.md) | D-019, D-025 |
| BKP-04 | Проверка созданного бэкапа | 2 | 07, 08 | [0013](adr/0013-backup-from-snapshot.md) | D-025 |
| BKP-05 | Восстановление в новый файл с атомарной подменой | 3 | 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0013](adr/0013-backup-from-snapshot.md) | D-019, D-025 |
| BKP-06 | Отказ восстанавливать из негодного бэкапа | 1 | 07 | [0013](adr/0013-backup-from-snapshot.md) | D-019, D-025 |
| BKP-07 | Повторное применение журнала purge после восстановления | 2 | 07, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0013](adr/0013-backup-from-snapshot.md) | D-012, D-025 |
| BKP-08 | Офлайн-проверка целостности | 2 | 07, 08 | [0013](adr/0013-backup-from-snapshot.md), [0015](adr/0015-reliability-testing.md) | D-025, D-026 |
| BKP-09 | Отчёт verify без ПДн и без изменения файла | 1 | 07, 09 | [0015](adr/0015-reliability-testing.md) | D-013, D-025 |
| BKP-10 | Онлайн-проверка целостности | 1 | 07, 08 | [0013](adr/0013-backup-from-snapshot.md), [0015](adr/0015-reliability-testing.md) | D-025 |
| BKP-11 | Офлайн-компактизация | 2 | 07, 08 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-018, D-019 |
| BKP-12 | Ротация бэкапов и срок хранения ПДн | 2 | 07, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0013](adr/0013-backup-from-snapshot.md) | D-012, D-025 |

### build-constraints

| ID | Требование | Сценариев | CUJ | ADR | Решения |
|---|---|---:|---|---|---|
| BLD-01 | Хранение написано с нуля на Rust (NFR-SCRATCH) | 2 | 03, 07 | [0002](adr/0002-implementation-language-rust.md), [0006](adr/0006-dependency-policy-from-scratch.md) | D-020, D-021 |
| BLD-02 | Allowlist runtime-зависимостей | 2 | 03, 05, 10 | [0006](adr/0006-dependency-policy-from-scratch.md) | D-015, D-021, D-033 |
| BLD-03 | Зависимости только для тестов | 1 | 03, 07 | [0006](adr/0006-dependency-policy-from-scratch.md), [0015](adr/0015-reliability-testing.md) | D-021, D-026 |
| BLD-04 | Denylist крейтов | 1 | 03, 07 | [0004](adr/0004-no-mmap-own-page-cache.md), [0006](adr/0006-dependency-policy-from-scratch.md) | D-021 |
| BLD-05 | Проверка политики зависимостей в CI | 1 | 03, 07 | [0006](adr/0006-dependency-policy-from-scratch.md) | D-021 |
| BLD-06 | Toolchain Rust | 2 | 03, 07 | [0002](adr/0002-implementation-language-rust.md) | D-020 |
| BLD-07 | Запрет unsafe-кода | 1 | 03, 07 | [0002](adr/0002-implementation-language-rust.md) | D-020 |
| BLD-08 | Собственная CRC32C | 2 | 03, 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0006](adr/0006-dependency-policy-from-scratch.md) | D-021 |
| BLD-09 | Платформы и уровни поддержки | 2 | 03, 07 | [0014](adr/0014-platforms.md) | D-023 |
| BLD-10 | Единый бинарник budb | 1 | 05, 07, 10 | [0016](adr/0016-web-ui-technology.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-017, D-031, D-032 |
| BLD-11 | Воспроизводимая сборка | 2 | 07 | [0006](adr/0006-dependency-policy-from-scratch.md) | D-021 |
| BLD-12 | Детерминированная симуляция | 2 | 03, 07 | [0015](adr/0015-reliability-testing.md) | D-026 |
| BLD-13 | Внедрение сбоев на каждом системном вызове коммита | 2 | 03, 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0015](adr/0015-reliability-testing.md) | D-019, D-026 |
| BLD-14 | Перебор состояний после сбоя | 2 | 03, 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0015](adr/0015-reliability-testing.md) | D-026 |
| BLD-15 | Модельные property-тесты | 2 | 01, 02, 03 | [0015](adr/0015-reliability-testing.md) | D-026 |
| BLD-16 | Фаззинг формата | 1 | 07 | [0015](adr/0015-reliability-testing.md) | D-026 |
| BLD-17 | Цикл kill -9 | 1 | 03, 07 | [0015](adr/0015-reliability-testing.md) | D-026 |
| BLD-18 | Эмуляция потери питания через LazyFS | 1 | 03, 07 | [0014](adr/0014-platforms.md), [0015](adr/0015-reliability-testing.md) | D-023, D-026 |
| BLD-19 | Проверка целостности в каждом тесте надёжности | 1 | 07, 08 | [0015](adr/0015-reliability-testing.md) | D-026 |

### contacts

| ID | Требование | Сценариев | CUJ | ADR | Решения |
|---|---|---:|---|---|---|
| CON-01 | Состав агрегата контакта | 2 | 03, 05 | [0007](adr/0007-data-model.md) | D-009, D-022 |
| CON-02 | Идентификатор контакта | 2 | 03, 05 | [0007](adr/0007-data-model.md) | D-009 |
| CON-03 | Лимиты имени | 3 | 03, 06 | [0007](adr/0007-data-model.md) | D-022 |
| CON-04 | Состав телефона | 2 | 03 | [0007](adr/0007-data-model.md), [0008](adr/0008-phone-normalization.md) | D-009, D-010 |
| CON-05 | Отказ при недопустимом телефоне | 1 | 03, 05 | [0008](adr/0008-phone-normalization.md) | D-010 |
| CON-06 | Уникальность телефона внутри контакта | 2 | 03 | [0007](adr/0007-data-model.md) | D-009 |
| CON-07 | Общий телефон у нескольких контактов | 1 | 01, 03 | [0007](adr/0007-data-model.md) | D-009 |
| CON-08 | Основной телефон | 2 | 03 | [0007](adr/0007-data-model.md) | D-009 |
| CON-09 | Запрет заметок и неизвестных полей | 1 | 03, 09 | [0007](adr/0007-data-model.md) | D-016 |
| CON-10 | Создание контакта | 2 | 03, 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0007](adr/0007-data-model.md) | D-019 |
| CON-11 | Чтение контакта | 2 | 01, 05 | [0007](adr/0007-data-model.md) | D-009, D-012 |
| CON-12 | Изменение контакта | 1 | 03, 05 | [0007](adr/0007-data-model.md), [0010](adr/0010-api-style.md) | D-009 |
| CON-13 | Проверка версии при изменении | 2 | 04, 05 | [0010](adr/0010-api-style.md) | D-009 |
| CON-14 | Удаление в корзину | 2 | 03, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012 |
| CON-15 | Восстановление из корзины | 2 | 03 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012 |
| CON-16 | Просмотр корзины | 1 | 03, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012 |
| CON-17 | Окно восстановления из корзины | 2 | 03, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012 |
| CON-18 | Подсказка о возможных дубликатах | 2 | 03 | [0007](adr/0007-data-model.md) | D-009 |
| CON-19 | Служебные метаданные | 1 | 03, 05 | [0007](adr/0007-data-model.md) | D-009 |

### data-privacy

| ID | Требование | Сценариев | CUJ | ADR | Решения |
|---|---|---:|---|---|---|
| PRV-01 | Имена и телефоны — персональные данные | 1 | 09 | [0007](adr/0007-data-model.md), [0012](adr/0012-deletion-trash-and-purge.md) | D-009, D-012 |
| PRV-02 | Минимизация состава данных | 1 | 03, 06 | [0007](adr/0007-data-model.md) | D-016 |
| PRV-03 | Срок хранения в корзине | 2 | 03, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-012, D-033 |
| PRV-04 | Автоматическая очистка корзины | 1 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012 |
| PRV-05 | Логическое удаление при purge | 2 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012 |
| PRV-06 | Физическое затирание в файлах базы | 1 | 09 | [0003](adr/0003-storage-engine-cow-btree.md), [0012](adr/0012-deletion-trash-and-purge.md), [0015](adr/0015-reliability-testing.md) | D-012 |
| PRV-07 | Затирание при активных снимках чтения | 2 | 07, 09 | [0003](adr/0003-storage-engine-cow-btree.md), [0012](adr/0012-deletion-trash-and-purge.md) | D-012, D-018 |
| PRV-08 | Квитанция purge | 1 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012 |
| PRV-09 | Журнал purge без ПДн | 1 | 07, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0013](adr/0013-backup-from-snapshot.md) | D-012 |
| PRV-10 | Повторное применение журнала при восстановлении | 2 | 07, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0013](adr/0013-backup-from-snapshot.md) | D-012, D-025 |
| PRV-11 | Срок хранения бэкапов | 2 | 07, 09 | [0013](adr/0013-backup-from-snapshot.md) | D-012, D-025 |
| PRV-12 | Журнал аудита изменений и доступа | 2 | 08, 09, 10 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012 |
| PRV-13 | Журнал аудита без значений ПДн | 2 | 09, 10 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012 |
| PRV-14 | Маскирование ПДн в логах и метриках | 2 | 08, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-013 |
| PRV-15 | Выгрузка данных субъекта | 2 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-013, D-016 |
| PRV-16 | Срок хранения результатов экспорта | 1 | 06, 09 | [0010](adr/0010-api-style.md) | D-016 |
| PRV-17 | Локализация данных — задача эксплуатации | 1 | 07 | [0013](adr/0013-backup-from-snapshot.md), [0014](adr/0014-platforms.md) | D-012 |

### http-api

| ID | Требование | Сценариев | CUJ | ADR | Решения |
|---|---|---:|---|---|---|
| API-01 | Версионированный базовый путь и формат JSON | 3 | 05 | [0010](adr/0010-api-style.md) | D-030 |
| API-02 | Документ OpenAPI 3.1 отдаётся сервером | 2 | 05 | [0010](adr/0010-api-style.md) | D-030 |
| API-03 | Совместимость в рамках v1 | 2 | 05 | [0010](adr/0010-api-style.md) | D-030 |
| API-04 | Создание контакта | 2 | 03, 05 | [0007](adr/0007-data-model.md), [0010](adr/0010-api-style.md) | D-009 |
| API-05 | Чтение контакта | 3 | 01, 05 | [0010](adr/0010-api-style.md) | D-009, D-012 |
| API-06 | Изменение контакта полной заменой | 2 | 03, 04 | [0010](adr/0010-api-style.md) | D-009 |
| API-07 | Удаление контакта в корзину | 2 | 03, 09 | [0010](adr/0010-api-style.md), [0012](adr/0012-deletion-trash-and-purge.md) | D-012 |
| API-08 | Отказ 412 при несовпадении версии | 1 | 04 | [0010](adr/0010-api-style.md) | D-009 |
| API-09 | Отказ 428 без условия If-Match | 2 | 04, 05 | [0010](adr/0010-api-style.md) | D-009 |
| API-10 | Поиск только через POST contacts:search | 3 | 01, 02, 05 | [0010](adr/0010-api-style.md) | D-013 |
| API-11 | ПДн и секреты не передаются в URL | 2 | 01, 05 | [0010](adr/0010-api-style.md), [0011](adr/0011-authentication-and-authorization.md) | D-013 |
| API-12 | Размер страницы | 3 | 02, 05 | [0010](adr/0010-api-style.md) | D-024 |
| API-13 | Непрозрачный курсор страницы | 2 | 02, 05 | [0010](adr/0010-api-style.md) | D-024 |
| API-14 | Ошибки в формате RFC 9457 | 2 | 05 | [0010](adr/0010-api-style.md) | D-013 |
| API-15 | Ошибки валидации с кодами полей | 3 | 03, 05 | [0010](adr/0010-api-style.md) | D-022 |
| API-16 | Повтор запроса с Idempotency-Key | 2 | 05, 06 | [0010](adr/0010-api-style.md) | D-030 |
| API-17 | Ошибки использования Idempotency-Key | 3 | 05, 06 | [0010](adr/0010-api-style.md) | D-030 |
| API-18 | Лимит размера тела | 2 | 05, 06 | [0010](adr/0010-api-style.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-033 |
| API-19 | Ограничение частоты 429 с Retry-After | 2 | 05, 08 | [0010](adr/0010-api-style.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-032 |
| API-20 | Перегрузка 503 с Retry-After | 2 | 03, 08 | [0010](adr/0010-api-style.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-032 |
| API-21 | Коды 401 и 403 | 2 | 05, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| API-22 | Корзина: просмотр и восстановление | 2 | 03, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012 |
| API-23 | Отмена своего удаления | 2 | 03 | [0012](adr/0012-deletion-trash-and-purge.md), [0016](adr/0016-web-ui-technology.md) | D-012 |
| API-24 | Немедленная очистка контакта (purge) | 2 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012 |
| API-25 | Импорт как асинхронная задача | 3 | 06 | [0010](adr/0010-api-style.md) | D-016 |
| API-26 | Экспорт как асинхронная задача | 2 | 06 | [0010](adr/0010-api-style.md) | D-016 |
| API-27 | Административные ресурсы | 3 | 07, 08, 10 | [0010](adr/0010-api-style.md), [0011](adr/0011-authentication-and-authorization.md) | D-017, D-025 |
| API-28 | Предпросмотр нормализации номера | 2 | 03, 05 | [0008](adr/0008-phone-normalization.md), [0010](adr/0010-api-style.md) | D-010 |

### import-export

| ID | Требование | Сценариев | CUJ | ADR | Решения |
|---|---|---:|---|---|---|
| IMP-01 | Форматы и кодировка | 2 | 06 | [0010](adr/0010-api-style.md) | D-016 |
| IMP-02 | Колонки CSV | 2 | 06 | [0007](adr/0007-data-model.md) | D-009, D-016, D-022 |
| IMP-03 | Телефоны в файлах | 2 | 06 | [0008](adr/0008-phone-normalization.md) | D-009, D-010 |
| IMP-04 | Записи NDJSON | 2 | 05, 06 | [0007](adr/0007-data-model.md), [0010](adr/0010-api-style.md) | D-016 |
| IMP-05 | Задание импорта | 1 | 06 | [0010](adr/0010-api-style.md) | D-016, D-032 |
| IMP-06 | Очередь заданий импорта | 1 | 06, 08 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-032 |
| IMP-07 | Пробный прогон | 1 | 06 | [0010](adr/0010-api-style.md) | D-016 |
| IMP-08 | Построчный отчёт | 2 | 06, 09 | [0010](adr/0010-api-style.md) | D-012, D-013 |
| IMP-09 | Применение пакетами | 1 | 03, 06 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019, D-032 |
| IMP-10 | Прерывание импорта | 2 | 06, 07 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019 |
| IMP-11 | Политика дубликатов | 2 | 06 | [0007](adr/0007-data-model.md) | D-009 |
| IMP-12 | Лимиты размера импорта | 2 | 06, 08 | [0010](adr/0010-api-style.md) | D-032 |
| IMP-13 | Экспорт согласованного снимка | 2 | 06, 07 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018 |
| IMP-14 | Потоковый экспорт | 1 | 06, 08 | [0010](adr/0010-api-style.md) | D-024 |
| IMP-15 | Защита от CSV-инъекции | 3 | 06 | [0010](adr/0010-api-style.md) | D-016 |
| IMP-16 | Обратимость экспорта | 1 | 06, 07 | [0007](adr/0007-data-model.md) | D-016 |

### name-normalization

| ID | Требование | Сценариев | CUJ | ADR | Решения |
|---|---|---:|---|---|---|
| NAM-01 | Хранение имени в NFC | 2 | 02, 03 | [0009](adr/0009-name-search-key.md) | D-009, D-011 |
| NAM-02 | Обрезка и схлопывание пробелов | 2 | 02, 03 | [0009](adr/0009-name-search-key.md) | D-011 |
| NAM-03 | Удаление управляющих символов | 1 | 03, 06 | [0009](adr/0009-name-search-key.md) | D-011 |
| NAM-04 | Запрет пустого имени | 3 | 03, 06 | [0009](adr/0009-name-search-key.md) | D-022 |
| NAM-05 | Построение ключа имени | 2 | 02 | [0009](adr/0009-name-search-key.md) | D-011 |
| NAM-06 | Полный case folding без тюркских правил | 2 | 02 | [0009](adr/0009-name-search-key.md) | D-011 |
| NAM-07 | Без снятия диакритики | 3 | 02 | [0009](adr/0009-name-search-key.md) | D-011 |
| NAM-08 | Данные case folding Unicode 16.0 | 2 | 02 | [0006](adr/0006-dependency-policy-from-scratch.md), [0009](adr/0009-name-search-key.md) | D-021 |
| NAM-09 | Версия правил ключа | 1 | 02, 08 | [0009](adr/0009-name-search-key.md) | D-011 |
| NAM-10 | Переиндексация при смене версии | 1 | 02, 07, 08 | [0009](adr/0009-name-search-key.md) | D-011 |
| NAM-11 | Атомарность переиндексации | 1 | 02, 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0009](adr/0009-name-search-key.md) | D-011, D-019 |
| NAM-12 | Ключ поискового запроса | 1 | 02 | [0009](adr/0009-name-search-key.md) | D-011 |

### observability

| ID | Требование | Сценариев | CUJ | ADR | Решения |
|---|---|---:|---|---|---|
| OBS-01 | Эндпоинт живости | 2 | 07, 08 | [0005](adr/0005-commit-and-durability-protocol.md), [0010](adr/0010-api-style.md) | D-019 |
| OBS-02 | Эндпоинт готовности | 3 | 07, 08 | [0010](adr/0010-api-style.md) | D-019, D-025 |
| OBS-03 | Эндпоинт метрик в текстовом формате Prometheus | 2 | 08, 10 | [0010](adr/0010-api-style.md), [0011](adr/0011-authentication-and-authorization.md) | D-015 |
| OBS-04 | Гистограммы задержек поиска и записи | 2 | 01, 02, 03, 08 | [0010](adr/0010-api-style.md) | D-024 |
| OBS-05 | Метрики объёма данных и хранилища | 1 | 06, 08 | [0010](adr/0010-api-style.md) | D-024 |
| OBS-06 | Метрики кэша | 1 | 01, 08 | [0010](adr/0010-api-style.md) | D-024 |
| OBS-07 | Метрики долговечности | 1 | 03, 07, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019 |
| OBS-08 | Номер последней подтверждённой транзакции | 1 | 03, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019 |
| OBS-09 | Возраст самого старого снимка чтения | 1 | 06, 07, 08 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018 |
| OBS-10 | Метрики очереди записи | 1 | 03, 05, 08 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-032 |
| OBS-11 | Метрики бэкапа и проверки целостности | 2 | 07, 08 | [0013](adr/0013-backup-from-snapshot.md) | D-025 |
| OBS-12 | Метрики без ПДн | 1 | 08, 09 | [0010](adr/0010-api-style.md) | D-012, D-013 |
| OBS-13 | Структурированные логи без ПДн | 2 | 08, 09 | [0010](adr/0010-api-style.md) | D-013 |
| OBS-14 | События надёжности в логе | 1 | 07, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019 |
| OBS-15 | Свежесть метрик | 1 | 08 | [0010](adr/0010-api-style.md) | D-024 |

### performance-capacity

| ID | Требование | Сценариев | CUJ | ADR | Решения |
|---|---|---:|---|---|---|
| PERF-01 | Цель проектирования 10^8 контактов | 1 | 06, 08 | [0003](adr/0003-storage-engine-cow-btree.md) | D-024 |
| PERF-02 | Эталонный стенд для SLO | 2 | 01, 02, 03 | [0003](adr/0003-storage-engine-cow-btree.md) | D-024 |
| PERF-03 | Профиль нагрузки 95/5 | 1 | 01, 02, 03 | [0003](adr/0003-storage-engine-cow-btree.md) | D-024 |
| PERF-04 | SLO точного поиска | 2 | 01, 02 | [0003](adr/0003-storage-engine-cow-btree.md), [0004](adr/0004-no-mmap-own-page-cache.md) | D-024 |
| PERF-05 | SLO префиксного поиска | 1 | 01, 02 | [0003](adr/0003-storage-engine-cow-btree.md) | D-024 |
| PERF-06 | SLO долговечной записи | 1 | 03 | [0005](adr/0005-commit-and-durability-protocol.md) | D-024 |
| PERF-07 | Время открытия после сбоя | 1 | 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-024 |
| PERF-08 | SLO поиска через API | 1 | 01, 02, 05 | [0010](adr/0010-api-style.md) | D-024 |
| PERF-09 | Размер кэша страниц | 2 | 01, 08 | [0004](adr/0004-no-mmap-own-page-cache.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-024, D-033 |
| PERF-10 | Минимум RAM | 1 | 01, 08 | [0003](adr/0003-storage-engine-cow-btree.md) | D-024 |
| PERF-11 | Пропускная способность | 2 | 01, 03, 06 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-024, D-032 |
| PERF-12 | Размер файла | 1 | 06, 08 | [0003](adr/0003-storage-engine-cow-btree.md) | D-024 |
| PERF-13 | Воспроизводимый бенчмарк | 2 | 01, 02, 03 | [0015](adr/0015-reliability-testing.md) | D-024 |
| PERF-14 | Backpressure при перегрузке | 2 | 03, 05, 08 | [0010](adr/0010-api-style.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-032 |
| PERF-15 | Метод измерения задержек | 2 | 01, 02, 03 | [0015](adr/0015-reliability-testing.md) | D-024 |
| PERF-16 | SLO как условие выпуска | 1 | 01, 03, 08 | [0015](adr/0015-reliability-testing.md) | D-024 |

### phone-normalization

| ID | Требование | Сценариев | CUJ | ADR | Решения |
|---|---|---:|---|---|---|
| PHN-01 | Канонический результат нормализации | 1 | 01, 03 | [0008](adr/0008-phone-normalization.md) | D-010, D-022 |
| PHN-02 | Порядок шагов нормализации | 1 | 01, 03 | [0008](adr/0008-phone-normalization.md) | D-010 |
| PHN-03 | Разделители и недопустимые символы | 3 | 03, 06 | [0008](adr/0008-phone-normalization.md) | D-010 |
| PHN-04 | Добавочный номер | 3 | 03 | [0008](adr/0008-phone-normalization.md) | D-010, D-022 |
| PHN-05 | Международная форма номера | 3 | 01, 03 | [0008](adr/0008-phone-normalization.md) | D-010 |
| PHN-06 | Национальный формат региона RU | 3 | 01, 03 | [0008](adr/0008-phone-normalization.md) | D-010 |
| PHN-07 | Регион по умолчанию | 2 | 03, 06 | [0008](adr/0008-phone-normalization.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-010, D-033 |
| PHN-08 | Регион операции | 1 | 05, 06 | [0008](adr/0008-phone-normalization.md) | D-010 |
| PHN-09 | Код страны по списку ITU | 2 | 03 | [0008](adr/0008-phone-normalization.md) | D-010 |
| PHN-10 | Общая длина номера | 2 | 03 | [0008](adr/0008-phone-normalization.md) | D-010 |
| PHN-11 | Национальные длины для кода +7 | 3 | 01, 03 | [0008](adr/0008-phone-normalization.md) | D-010 |
| PHN-12 | Сохранение исходного ввода | 2 | 03, 06 | [0008](adr/0008-phone-normalization.md) | D-009, D-010 |
| PHN-13 | Идемпотентность нормализации | 2 | 05, 06 | [0008](adr/0008-phone-normalization.md) | D-010 |
| PHN-14 | Понятная ошибка нормализации | 2 | 03, 05, 06 | [0008](adr/0008-phone-normalization.md), [0010](adr/0010-api-style.md) | D-010 |
| PHN-15 | Версия правил нормализации | 1 | 03, 08 | [0008](adr/0008-phone-normalization.md) | D-010 |
| PHN-16 | Повторная нормализация при смене правил | 1 | 06, 08 | [0008](adr/0008-phone-normalization.md) | D-010 |

### search

| ID | Требование | Сценариев | CUJ | ADR | Решения |
|---|---|---:|---|---|---|
| SRCH-01 | Точный поиск по телефону | 2 | 01, 05 | [0008](adr/0008-phone-normalization.md) | D-009, D-010 |
| SRCH-02 | Недопустимый телефон в запросе | 1 | 01, 05 | [0008](adr/0008-phone-normalization.md), [0010](adr/0010-api-style.md) | D-010 |
| SRCH-03 | Префиксный поиск по телефону | 3 | 01, 05 | [0008](adr/0008-phone-normalization.md) | D-010, D-011 |
| SRCH-04 | Точный поиск по имени | 1 | 02, 05 | [0009](adr/0009-name-search-key.md) | D-011 |
| SRCH-05 | Префиксный поиск по имени | 2 | 02, 05 | [0009](adr/0009-name-search-key.md) | D-011 |
| SRCH-06 | Границы длины запроса | 3 | 01, 02, 05 | [0010](adr/0010-api-style.md) | D-022 |
| SRCH-07 | Состав результата поиска | 1 | 01, 02, 05 | [0007](adr/0007-data-model.md) | D-009 |
| SRCH-08 | Порядок выдачи | 3 | 01, 02 | [0009](adr/0009-name-search-key.md) | D-011 |
| SRCH-09 | Размер страницы | 3 | 02, 05 | [0010](adr/0010-api-style.md) | D-024 |
| SRCH-10 | Курсор пагинации | 3 | 02, 05 | [0010](adr/0010-api-style.md) | D-013 |
| SRCH-11 | Поиск на одном снимке | 2 | 02, 05 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018, D-032 |
| SRCH-12 | Срок действия курсора | 2 | 02, 05, 08 | [0003](adr/0003-storage-engine-cow-btree.md), [0010](adr/0010-api-style.md) | D-018, D-032 |
| SRCH-13 | Пустой результат | 1 | 01, 02, 05 | [0010](adr/0010-api-style.md) | D-011 |
| SRCH-14 | Чтение своих записей | 2 | 01, 02, 03 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-018, D-019 |
| SRCH-15 | Корзина не участвует в поиске | 2 | 01, 02, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012 |

### storage-engine

| ID | Требование | Сценариев | CUJ | ADR | Решения |
|---|---|---:|---|---|---|
| STO-01 | Заголовок файла с magic и версией формата | 2 | 07 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018 |
| STO-02 | Отказ открыть неизвестную версию формата | 2 | 07 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018 |
| STO-03 | Страницы 4 КиБ с CRC32C | 2 | 01, 02, 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-018, D-019 |
| STO-04 | Две мета-страницы с txid и CRC32C | 2 | 03, 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-018 |
| STO-05 | Copy-on-write без перезаписи подтверждённых страниц | 1 | 03, 07 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018 |
| STO-06 | Три дерева в одном файле | 2 | 01, 02, 03 | [0003](adr/0003-storage-engine-cow-btree.md), [0007](adr/0007-data-model.md) | D-009, D-018 |
| STO-07 | Атомарность транзакции | 2 | 03, 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-018, D-019 |
| STO-08 | Единственный писатель | 1 | 03, 04 | [0003](adr/0003-storage-engine-cow-btree.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-018, D-032 |
| STO-09 | MVCC-снимки для читателей | 2 | 01, 02, 06 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018, D-032 |
| STO-10 | Освобождение страниц после самого старого читателя | 2 | 01, 03, 08 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018 |
| STO-11 | Протокол коммита | 2 | 03, 07 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019 |
| STO-12 | Подтверждение только после протокола коммита | 2 | 03, 05 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019 |
| STO-13 | Group commit | 3 | 03, 06 | [0005](adr/0005-commit-and-durability-protocol.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-018, D-032 |
| STO-14 | Платформенные примитивы сброса | 1 | 03, 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0014](adr/0014-platforms.md) | D-019, D-023 |
| STO-15 | Сброс каталога после операций с файлами | 2 | 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0014](adr/0014-platforms.md) | D-019, D-023 |
| STO-16 | Fail-stop при ошибке записи или сброса | 2 | 03, 07, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019 |
| STO-17 | Выбор мета-страницы при открытии | 2 | 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-018, D-019 |
| STO-18 | Явная ошибка при повреждении подтверждённых данных | 2 | 07, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019 |
| STO-19 | Повреждение, обнаруженное во время работы | 1 | 01, 02, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019 |
| STO-20 | Эксклюзивная блокировка файла | 2 | 07 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018 |
| STO-21 | Запрет недолговечного режима | 1 | 03 | [0005](adr/0005-commit-and-durability-protocol.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-019, D-033 |
| STO-22 | Собственный кэш страниц без отображения файла в память | 2 | 01, 02, 08 | [0004](adr/0004-no-mmap-own-page-cache.md) | D-018 |
| STO-23 | Оговорка о честном сбросе накопителя | 1 | 03, 07 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019 |
| STO-24 | Лимит длительности снимка чтения | 1 | 01, 06, 08 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018 |

### web-ui

| ID | Требование | Сценариев | CUJ | ADR | Решения |
|---|---|---:|---|---|---|
| UI-01 | Поставка без внешних ресурсов | 2 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-031 |
| UI-02 | Единое поле поиска при вводе | 2 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-013, D-031 |
| UI-03 | Автоопределение номера или имени | 3 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-010, D-011 |
| UI-04 | Подсветка совпадений | 2 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-031 |
| UI-05 | Доступный combobox поиска | 2 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-031 |
| UI-06 | Карточка контакта | 2 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-009 |
| UI-07 | Форма создания и редактирования | 2 | 03 | [0016](adr/0016-web-ui-technology.md) | D-022 |
| UI-08 | Показ нормализованного номера | 2 | 03 | [0008](adr/0008-phone-normalization.md), [0016](adr/0016-web-ui-technology.md) | D-010 |
| UI-09 | Подтверждение сохранения | 2 | 03 | [0016](adr/0016-web-ui-technology.md) | D-019 |
| UI-10 | Обработка конфликта версий | 2 | 04 | [0016](adr/0016-web-ui-technology.md) | D-009 |
| UI-11 | Удаление с возможностью отмены | 2 | 03 | [0012](adr/0012-deletion-trash-and-purge.md), [0016](adr/0016-web-ui-technology.md) | D-012 |
| UI-12 | Корзина для администратора | 2 | 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0016](adr/0016-web-ui-technology.md) | D-012 |
| UI-13 | Импорт с пробным прогоном | 2 | 06 | [0016](adr/0016-web-ui-technology.md) | D-016 |
| UI-14 | Экспорт | 2 | 06 | [0016](adr/0016-web-ui-technology.md) | D-016 |
| UI-15 | Страница состояния БД | 2 | 07, 08 | [0016](adr/0016-web-ui-technology.md) | D-025 |
| UI-16 | Вход и выход | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md), [0016](adr/0016-web-ui-technology.md) | D-015 |
| UI-17 | Истечение сессии без потери ввода | 1 | 03 | [0016](adr/0016-web-ui-technology.md) | D-015 |
| UI-18 | Действия по роли | 1 | 10 | [0011](adr/0011-authentication-and-authorization.md), [0016](adr/0016-web-ui-technology.md) | D-015 |
| UI-19 | Контраст и перестроение | 2 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-031 |
| UI-20 | Клавиатура и видимый фокус | 2 | 01, 03 | [0016](adr/0016-web-ui-technology.md) | D-031 |
| UI-21 | Размер целей нажатия | 1 | 01 | [0016](adr/0016-web-ui-technology.md) | D-031 |
| UI-22 | Локализация ru/en | 2 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-031 |
| UI-23 | Мягкая деградация при 503 и 429 | 2 | 01, 03, 08 | [0016](adr/0016-web-ui-technology.md) | D-032 |

## 6. ADR → требования

| ADR | Название | Требований | ID требований |
|---|---|---:|---|
| 0001 | [Запись решений и процесс: OpenSpec + Elephant/Goldfish + LLM-expert review + Fact Grounding](adr/0001-decision-records-and-process.md) | 0 | — |
| 0002 | [Язык реализации: Rust](adr/0002-implementation-language-rust.md) | 3 | BLD-01, BLD-06, BLD-07 |
| 0003 | [Движок хранения: copy-on-write B+tree с двумя мета-страницами](adr/0003-storage-engine-cow-btree.md) | 33 | BKP-01, BKP-11, CLI-07, IMP-13, NAM-11, OBS-09, PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, PERF-07, PERF-10, PERF-11, PERF-12, PRV-06, PRV-07, SRCH-11, SRCH-12, SRCH-14, STO-01, STO-02, STO-03, STO-04, STO-05, STO-06, STO-07, STO-08, STO-09, STO-10, STO-17, STO-20, STO-24 |
| 0004 | [Без mmap: явный pread/pwrite и собственный кэш страниц](adr/0004-no-mmap-own-page-cache.md) | 4 | BLD-04, PERF-04, PERF-09, STO-22 |
| 0005 | [Протокол коммита и долговечности](adr/0005-commit-and-durability-protocol.md) | 31 | BKP-03, BKP-05, BKP-11, BLD-08, BLD-13, BLD-14, CON-10, IMP-09, IMP-10, OBS-01, OBS-07, OBS-08, OBS-14, PERF-06, PERF-07, PERF-11, SRCH-14, STO-03, STO-04, STO-07, STO-11, STO-12, STO-13, STO-14, STO-15, STO-16, STO-17, STO-18, STO-19, STO-21, STO-23 |
| 0006 | [Политика зависимостей «с нуля» (NFR-SCRATCH)](adr/0006-dependency-policy-from-scratch.md) | 8 | BLD-01, BLD-02, BLD-03, BLD-04, BLD-05, BLD-08, BLD-11, NAM-08 |
| 0007 | [Модель данных: агрегат Contact с вложенными телефонами](adr/0007-data-model.md) | 22 | API-04, CON-01, CON-02, CON-03, CON-04, CON-06, CON-07, CON-08, CON-09, CON-10, CON-11, CON-12, CON-18, CON-19, IMP-02, IMP-04, IMP-11, IMP-16, PRV-01, PRV-02, SRCH-07, STO-06 |
| 0008 | [Нормализация телефонов: собственный разбор и проверка «возможного номера»](adr/0008-phone-normalization.md) | 24 | API-28, CON-04, CON-05, IMP-03, PHN-01, PHN-02, PHN-03, PHN-04, PHN-05, PHN-06, PHN-07, PHN-08, PHN-09, PHN-10, PHN-11, PHN-12, PHN-13, PHN-14, PHN-15, PHN-16, SRCH-01, SRCH-02, SRCH-03, UI-08 |
| 0009 | [Поисковый ключ имени: NFKC → full case folding → ё→е](adr/0009-name-search-key.md) | 15 | NAM-01, NAM-02, NAM-03, NAM-04, NAM-05, NAM-06, NAM-07, NAM-08, NAM-09, NAM-10, NAM-11, NAM-12, SRCH-04, SRCH-05, SRCH-08 |
| 0010 | [Стиль API: HTTP/JSON `/api/v1`, поиск через POST с телом, Admin CLI](adr/0010-api-style.md) | 54 | API-01, API-02, API-03, API-04, API-05, API-06, API-07, API-08, API-09, API-10, API-11, API-12, API-13, API-14, API-15, API-16, API-17, API-18, API-19, API-20, API-25, API-26, API-27, API-28, CLI-10, CON-12, CON-13, IMP-01, IMP-04, IMP-05, IMP-07, IMP-08, IMP-12, IMP-14, IMP-15, OBS-01, OBS-02, OBS-03, OBS-04, OBS-05, OBS-06, OBS-12, OBS-13, OBS-15, PERF-08, PERF-14, PHN-14, PRV-16, SRCH-02, SRCH-06, SRCH-09, SRCH-10, SRCH-12, SRCH-13 |
| 0011 | [Аутентификация и авторизация: локальные учётные записи, роли, cookie-сессия для UI и bearer-токены для API](adr/0011-authentication-and-authorization.md) | 32 | ACL-01, ACL-02, ACL-03, ACL-04, ACL-05, ACL-06, ACL-07, ACL-08, ACL-09, ACL-10, ACL-11, ACL-12, ACL-13, ACL-14, ACL-15, ACL-16, ACL-17, ACL-18, ACL-19, ACL-20, ACL-21, ACL-22, API-11, API-21, API-27, CLI-05, CLI-06, CLI-12, CLI-16, OBS-03, UI-16, UI-18 |
| 0012 | [Удаление: корзина с ограниченным сроком, автоматическая очистка и purge по запросу субъекта](adr/0012-deletion-trash-and-purge.md) | 28 | API-07, API-22, API-23, API-24, BKP-07, BKP-12, CLI-08, CLI-09, CON-14, CON-15, CON-16, CON-17, PRV-01, PRV-03, PRV-04, PRV-05, PRV-06, PRV-07, PRV-08, PRV-09, PRV-10, PRV-12, PRV-13, PRV-14, PRV-15, SRCH-15, UI-11, UI-12 |
| 0013 | [Бэкап из MVCC-снимка, восстановление и проверка целостности](adr/0013-backup-from-snapshot.md) | 17 | BKP-01, BKP-02, BKP-03, BKP-04, BKP-05, BKP-06, BKP-07, BKP-08, BKP-10, BKP-12, CLI-04, CLI-07, OBS-11, PRV-09, PRV-10, PRV-11, PRV-17 |
| 0014 | [Платформы: Linux — tier 1, Windows и macOS — tier 2](adr/0014-platforms.md) | 5 | BLD-09, BLD-18, PRV-17, STO-14, STO-15 |
| 0015 | [Тестирование надёжности: детерминированная симуляция, внедрение сбоев, перебор состояний, модельные тесты, фаззинг, LazyFS](adr/0015-reliability-testing.md) | 17 | BKP-08, BKP-09, BKP-10, BLD-03, BLD-12, BLD-13, BLD-14, BLD-15, BLD-16, BLD-17, BLD-18, BLD-19, CLI-07, PERF-13, PERF-15, PERF-16, PRV-06 |
| 0016 | [Технология веб-UI: чистый TypeScript и нативные Web Components, ассеты в бинарнике, строгая CSP, i18n ru/en](adr/0016-web-ui-technology.md) | 28 | ACL-11, ACL-14, ACL-19, API-23, BLD-10, UI-01, UI-02, UI-03, UI-04, UI-05, UI-06, UI-07, UI-08, UI-09, UI-10, UI-11, UI-12, UI-13, UI-14, UI-15, UI-16, UI-17, UI-18, UI-19, UI-20, UI-21, UI-22, UI-23 |
| 0017 | [Runtime, потоки и конфигурация: один бинарник `budb`, async HTTP + синхронный движок, TOML](adr/0017-runtime-threads-and-configuration.md) | 24 | ACL-12, ACL-17, ACL-18, API-18, API-19, API-20, BLD-10, CLI-01, CLI-02, CLI-03, CLI-04, CLI-11, CLI-13, CLI-14, CLI-15, IMP-06, OBS-10, PERF-09, PERF-14, PHN-07, PRV-03, STO-08, STO-13, STO-21 |

## 7. Прочие проверки

| Проверка | Результат |
|---|---|
| Повторяющиеся ID требований | нет |
| Требования без сценариев | нет |
| Требования без ADR в строке «Трассировка» | нет |
| Ссылки на CUJ, которых нет в docs/cuj.md | нет |
| Ссылки на ADR, которых нет в docs/adr/ | нет |
| ADR, на которые не ссылается ни одно требование | 0001 (Запись решений и процесс: OpenSpec + Elephant/Goldfish + LLM-expert review + Fact Grounding) |
