# Матрица трассировки BUDB

Файл сгенерирован скриптом `scripts/traceability.mjs` из `openspec/changes/add-phonebook-db-v1/specs/*/spec.md` (строки `Трассировка:` и `#### Scenario:`), `docs/cuj.md` и `openspec/changes/add-phonebook-db-v1/tasks.md` (номера задач, в которых упомянуто требование). Вручную не редактировать: после изменения спецификаций выполнить `node scripts/traceability.mjs` (проверка без расхождений — `node scripts/traceability.mjs --check`).

Содержание: 1 — сводка по capability; 2 — CUJ → требования; 3 — требования без CUJ; 4 — CUJ без требований; 5 — требование → CUJ, ADR, решения; 6 — ADR → требования; 7 — прочие проверки.

## 1. Сводка: требования и сценарии по capability

| Capability | Префикс ID | Требований | Сценариев | CUJ, на которые ссылается |
|---|---|---:|---:|---|
| `access-control` | ACL | 27 | 63 | 01, 02, 03, 05, 06, 07, 08, 09, 10 |
| `admin-cli` | CLI | 22 | 57 | 05, 06, 07, 08, 09, 10 |
| `backup-restore` | BKP | 17 | 36 | 03, 07, 08, 09, 10 |
| `build-constraints` | BLD | 28 | 54 | 01, 02, 03, 05, 07, 08, 10 |
| `contacts` | CON | 19 | 41 | 01, 03, 04, 05, 06, 07, 09 |
| `data-privacy` | PRV | 24 | 60 | 01, 03, 06, 07, 08, 09, 10 |
| `http-api` | API | 41 | 112 | 01, 02, 03, 04, 05, 06, 07, 08, 09, 10 |
| `import-export` | IMP | 18 | 40 | 03, 05, 06, 07, 08, 09 |
| `name-normalization` | NAM | 13 | 27 | 02, 03, 06, 07, 08 |
| `observability` | OBS | 22 | 38 | 01, 02, 03, 05, 06, 07, 08, 09, 10 |
| `performance-capacity` | PERF | 18 | 28 | 01, 02, 03, 05, 06, 07, 08 |
| `phone-normalization` | PHN | 17 | 45 | 01, 03, 05, 06, 08 |
| `search` | SRCH | 17 | 41 | 01, 02, 03, 05, 08, 09, 10 |
| `storage-engine` | STO | 41 | 90 | 01, 02, 03, 04, 05, 06, 07, 08, 09, 10 |
| `web-ui` | UI | 26 | 62 | 01, 02, 03, 04, 06, 07, 08, 09, 10 |
| **Всего** (15 capability) | | **350** | **794** | 10 CUJ |

## 2. CUJ → требования

В строку CUJ попадают ID всех требований, у которых в строке `Трассировка:` есть этот CUJ. Одно требование может трассироваться к нескольким CUJ.

| CUJ | Название | Требований | ID требований |
|---|---|---:|---|
| CUJ-01 | Кто звонит (телефон → имена) | 74 | ACL-03, ACL-11, ACL-12, ACL-15, ACL-19, ACL-25, API-05, API-10, API-11, API-29, API-31, API-35, API-36, API-37, API-38, BLD-15, BLD-21, CON-07, CON-11, OBS-02, OBS-04, OBS-06, PERF-02, PERF-03, PERF-04, PERF-05, PERF-08, PERF-09, PERF-10, PERF-11, PERF-13, PERF-15, PERF-16, PHN-01, PHN-02, PHN-05, PHN-06, PHN-11, PHN-17, PRV-21, SRCH-01, SRCH-02, SRCH-03, SRCH-06, SRCH-07, SRCH-08, SRCH-13, SRCH-14, SRCH-15, SRCH-16, SRCH-17, STO-03, STO-06, STO-09, STO-10, STO-19, STO-22, STO-24, STO-25, STO-31, STO-35, UI-01, UI-02, UI-03, UI-04, UI-05, UI-06, UI-19, UI-20, UI-21, UI-22, UI-23, UI-24, UI-25 |
| CUJ-02 | Найти телефон по имени (префикс) | 54 | ACL-19, API-10, API-12, API-13, API-36, BLD-15, BLD-23, BLD-24, NAM-01, NAM-02, NAM-05, NAM-06, NAM-07, NAM-08, NAM-09, NAM-10, NAM-11, NAM-12, NAM-13, OBS-04, PERF-02, PERF-03, PERF-04, PERF-05, PERF-08, PERF-13, PERF-15, SRCH-04, SRCH-05, SRCH-06, SRCH-07, SRCH-08, SRCH-09, SRCH-10, SRCH-11, SRCH-12, SRCH-13, SRCH-14, SRCH-15, SRCH-16, SRCH-17, STO-06, STO-09, STO-22, UI-01, UI-02, UI-03, UI-04, UI-05, UI-06, UI-19, UI-22, UI-25, UI-26 |
| CUJ-03 | Добавить или изменить контакт с подтверждением долговечности | 111 | ACL-03, ACL-14, API-04, API-06, API-07, API-15, API-20, API-22, API-23, API-28, API-31, API-33, API-35, BKP-13, BLD-01, BLD-02, BLD-03, BLD-04, BLD-05, BLD-06, BLD-07, BLD-08, BLD-09, BLD-12, BLD-13, BLD-14, BLD-15, BLD-17, BLD-18, BLD-20, BLD-21, BLD-22, BLD-25, BLD-28, CON-01, CON-02, CON-03, CON-04, CON-05, CON-06, CON-07, CON-08, CON-09, CON-10, CON-12, CON-14, CON-15, CON-16, CON-17, CON-18, CON-19, IMP-09, NAM-01, NAM-02, NAM-03, NAM-04, OBS-04, OBS-07, OBS-08, OBS-10, PERF-02, PERF-03, PERF-06, PERF-11, PERF-13, PERF-14, PERF-15, PERF-16, PERF-17, PHN-01, PHN-02, PHN-03, PHN-04, PHN-05, PHN-06, PHN-07, PHN-09, PHN-10, PHN-11, PHN-12, PHN-14, PHN-15, PRV-02, PRV-03, SRCH-14, STO-04, STO-05, STO-06, STO-07, STO-08, STO-10, STO-11, STO-12, STO-13, STO-14, STO-16, STO-21, STO-23, STO-27, STO-33, STO-39, STO-41, UI-07, UI-08, UI-09, UI-11, UI-12, UI-17, UI-20, UI-23, UI-24 |
| CUJ-04 | Обнаружение конфликта одновременного редактирования | 7 | API-06, API-08, API-09, API-33, CON-13, STO-08, UI-10 |
| CUJ-05 | Интегратор подключается через API | 63 | ACL-04, ACL-07, ACL-08, ACL-09, ACL-17, ACL-20, ACL-23, ACL-25, ACL-26, API-01, API-02, API-03, API-04, API-05, API-09, API-10, API-11, API-12, API-13, API-14, API-15, API-16, API-17, API-18, API-19, API-21, API-28, API-30, API-33, API-36, API-37, API-38, BLD-02, BLD-10, CLI-06, CON-01, CON-02, CON-05, CON-11, CON-12, CON-13, CON-19, IMP-04, OBS-10, PERF-08, PERF-14, PHN-08, PHN-13, PHN-14, PHN-17, SRCH-01, SRCH-02, SRCH-03, SRCH-04, SRCH-05, SRCH-06, SRCH-07, SRCH-09, SRCH-10, SRCH-11, SRCH-12, SRCH-13, STO-12 |
| CUJ-06 | Массовый импорт и экспорт | 55 | ACL-03, ACL-22, API-16, API-17, API-18, API-25, API-26, API-32, API-35, CLI-10, CLI-17, CON-03, CON-19, IMP-01, IMP-02, IMP-03, IMP-04, IMP-05, IMP-06, IMP-07, IMP-08, IMP-09, IMP-10, IMP-11, IMP-12, IMP-13, IMP-14, IMP-15, IMP-16, IMP-17, IMP-18, NAM-03, NAM-04, OBS-05, OBS-09, PERF-01, PERF-11, PERF-12, PHN-03, PHN-07, PHN-08, PHN-12, PHN-13, PHN-14, PHN-16, PRV-02, PRV-16, PRV-24, STO-09, STO-13, STO-24, STO-31, STO-32, UI-13, UI-14 |
| CUJ-07 | Бэкап, восстановление и восстановление после сбоя | 110 | ACL-10, ACL-18, ACL-27, API-27, API-32, API-39, API-40, API-41, BKP-01, BKP-02, BKP-03, BKP-04, BKP-05, BKP-06, BKP-07, BKP-08, BKP-09, BKP-10, BKP-11, BKP-12, BKP-13, BKP-14, BKP-15, BKP-16, BKP-17, BLD-01, BLD-03, BLD-04, BLD-05, BLD-06, BLD-07, BLD-08, BLD-09, BLD-10, BLD-11, BLD-12, BLD-13, BLD-14, BLD-16, BLD-17, BLD-18, BLD-19, BLD-20, BLD-22, BLD-25, BLD-26, BLD-27, BLD-28, CLI-01, CLI-02, CLI-03, CLI-04, CLI-07, CLI-13, CLI-14, CLI-15, CLI-18, CLI-20, CLI-21, CLI-22, CON-02, CON-10, IMP-10, IMP-13, IMP-16, NAM-10, NAM-11, OBS-01, OBS-02, OBS-07, OBS-09, OBS-11, OBS-14, OBS-16, OBS-18, OBS-20, OBS-21, PERF-07, PERF-18, PRV-07, PRV-09, PRV-10, PRV-11, PRV-17, PRV-19, PRV-20, PRV-23, STO-01, STO-02, STO-03, STO-04, STO-05, STO-07, STO-11, STO-14, STO-15, STO-16, STO-17, STO-18, STO-20, STO-23, STO-25, STO-26, STO-27, STO-34, STO-36, STO-37, STO-38, STO-40, UI-15 |
| CUJ-08 | Мониторинг состояния и ёмкости | 77 | ACL-24, API-19, API-20, API-27, API-31, API-40, API-41, BKP-04, BKP-08, BKP-10, BKP-11, BKP-17, BLD-19, BLD-27, CLI-02, CLI-06, CLI-11, CLI-13, CLI-14, CLI-17, CLI-18, CLI-21, CLI-22, IMP-06, IMP-12, IMP-14, NAM-09, NAM-10, OBS-01, OBS-02, OBS-03, OBS-04, OBS-05, OBS-06, OBS-07, OBS-08, OBS-09, OBS-10, OBS-11, OBS-12, OBS-13, OBS-14, OBS-15, OBS-16, OBS-17, OBS-18, OBS-19, OBS-20, OBS-21, OBS-22, PERF-01, PERF-09, PERF-10, PERF-12, PERF-14, PERF-16, PERF-17, PHN-15, PHN-16, PRV-12, PRV-14, PRV-21, PRV-22, SRCH-16, STO-10, STO-18, STO-19, STO-22, STO-24, STO-26, STO-32, STO-33, STO-35, STO-40, STO-41, UI-15, UI-23 |
| CUJ-09 | Удаление ПДн по запросу субъекта | 63 | ACL-03, ACL-25, API-07, API-22, API-24, API-34, API-41, BKP-07, BKP-09, BKP-12, BKP-14, BKP-16, CLI-07, CLI-08, CLI-09, CLI-15, CLI-16, CLI-19, CLI-22, CON-09, CON-14, CON-16, CON-17, IMP-08, IMP-17, IMP-18, OBS-12, OBS-13, OBS-17, OBS-21, OBS-22, PRV-01, PRV-03, PRV-04, PRV-05, PRV-06, PRV-07, PRV-08, PRV-09, PRV-10, PRV-11, PRV-12, PRV-13, PRV-14, PRV-15, PRV-16, PRV-18, PRV-19, PRV-20, PRV-21, PRV-22, PRV-23, PRV-24, SRCH-15, STO-23, STO-28, STO-29, STO-30, STO-31, STO-37, STO-38, STO-39, UI-12 |
| CUJ-10 | Администратор управляет пользователями и доступом | 42 | ACL-01, ACL-02, ACL-03, ACL-04, ACL-05, ACL-06, ACL-07, ACL-09, ACL-10, ACL-11, ACL-13, ACL-15, ACL-16, ACL-17, ACL-18, ACL-21, ACL-23, ACL-24, ACL-27, API-21, API-27, API-29, API-39, BKP-15, BLD-10, CLI-01, CLI-03, CLI-04, CLI-05, CLI-06, CLI-12, CLI-15, CLI-16, CLI-20, OBS-03, OBS-19, PRV-12, PRV-13, SRCH-17, STO-36, UI-16, UI-18 |

## 3. Требования без CUJ

Нет: у каждого требования в строке `Трассировка:` указан хотя бы один CUJ.

## 4. CUJ без требований

Нет: на каждый CUJ из `docs/cuj.md` ссылается хотя бы одно требование.

## 5. Требование → CUJ, ADR, решения

### access-control

| ID | Требование | Сценариев | CUJ | ADR | Решения | Задачи |
|---|---|---:|---|---|---|---|
| ACL-01 | Локальные учётные записи | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 | 9.1 |
| ACL-02 | Иерархия ролей | 1 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015, D-103 | 9.1 |
| ACL-03 | Матрица прав по операциям | 4 | 01, 03, 06, 09, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015, D-041 | 9.1 |
| ACL-04 | Проверка прав на каждом запросе | 2 | 05, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015, D-068, D-099 | 9.1 |
| ACL-05 | Хэширование паролей | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 | 9.2 |
| ACL-06 | Политика паролей | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 | 9.2 |
| ACL-07 | Выдача API-токена | 2 | 05, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015, D-073, D-103 | 9.3 |
| ACL-08 | Хранение только хэшей токенов | 2 | 05 | [0011](adr/0011-authentication-and-authorization.md) | D-015 | 9.3 |
| ACL-09 | Срок жизни токенов | 2 | 05, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 | 9.3 |
| ACL-10 | Отзыв токенов и сессий | 3 | 07, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015, D-079, D-117 | 9.3 |
| ACL-11 | Cookie UI-сессии | 4 | 01, 10 | [0011](adr/0011-authentication-and-authorization.md), [0016](adr/0016-web-ui-technology.md) | D-043, D-055, D-101 | 0.2, 8.9, 9.4 |
| ACL-12 | Тайм-ауты сессии | 3 | 01 | [0011](adr/0011-authentication-and-authorization.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-066, D-106 | 8.9, 9.4 |
| ACL-13 | Выход из системы | 1 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 | 8.9, 9.4 |
| ACL-14 | Защита от CSRF | 5 | 03 | [0011](adr/0011-authentication-and-authorization.md), [0016](adr/0016-web-ui-technology.md) | D-068, D-101, D-113 | 8.9, 9.5, 9.11 |
| ACL-15 | Ограничение попыток входа | 3 | 01, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-104 | 9.6 |
| ACL-16 | Единый ответ при неудачном входе | 1 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 | 9.6 |
| ACL-17 | Версии TLS | 2 | 05, 10 | [0011](adr/0011-authentication-and-authorization.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-015, D-066 | 9.7 |
| ACL-18 | Адрес прослушивания по умолчанию | 2 | 07, 10 | [0011](adr/0011-authentication-and-authorization.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-032, D-033 | 9.7 |
| ACL-19 | Политика CSP | 3 | 01, 02 | [0011](adr/0011-authentication-and-authorization.md), [0016](adr/0016-web-ui-technology.md) | D-031 | 9.8 |
| ACL-20 | Заголовки безопасности | 2 | 05 | [0011](adr/0011-authentication-and-authorization.md) | D-013, D-015 | 9.8 |
| ACL-21 | Первичная инициализация администратора | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015, D-032 | 9.9 |
| ACL-22 | Отсутствие исходящих запросов | 1 | 06 | [0011](adr/0011-authentication-and-authorization.md) | D-016 | 9.10 |
| ACL-23 | Публичный источник и доверенные прокси | 3 | 05, 10 | [0011](adr/0011-authentication-and-authorization.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-043, D-101 | 9.11 |
| ACL-24 | Область действия токена metrics | 2 | 08, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-103 | 9.12, 15.2 |
| ACL-25 | Квота выданных контактов | 3 | 01, 05, 09 | [0011](adr/0011-authentication-and-authorization.md) | D-083, D-118 | 7.11, 9.12 |
| ACL-26 | CORS выключен | 1 | 05 | [0011](adr/0011-authentication-and-authorization.md) | D-101 | 9.11 |
| ACL-27 | Проверка учётных записей после restore | 3 | 07, 10 | [0011](adr/0011-authentication-and-authorization.md), [0013](adr/0013-backup-from-snapshot.md) | D-079, D-113, D-117 | 11.9 |

### admin-cli

| ID | Требование | Сценариев | CUJ | ADR | Решения | Задачи |
|---|---|---:|---|---|---|---|
| CLI-01 | Один исполняемый файл с подкомандами | 2 | 07, 10 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-017, D-032 | 13.1 |
| CLI-02 | Запуск сервера budb serve | 2 | 07, 08 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-032, D-033, D-073 | 13.2 |
| CLI-03 | Офлайн- и онлайн-режим | 4 | 07, 10 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-017, D-055, D-100 | 13.3 |
| CLI-04 | Команды, требующие остановленного сервера | 2 | 07, 10 | [0013](adr/0013-backup-from-snapshot.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-018, D-025, D-073, D-117 | 13.3 |
| CLI-05 | Управление пользователями | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 | 13.4 |
| CLI-06 | Управление токенами | 4 | 05, 08, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015, D-073, D-083, D-103 | 13.4 |
| CLI-07 | Бэкап, восстановление, проверка и уплотнение | 5 | 07, 09 | [0013](adr/0013-backup-from-snapshot.md), [0015](adr/0015-reliability-testing.md) | D-025, D-069, D-079, D-117, D-118 | 13.5 |
| CLI-08 | Purge из командной строки | 2 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012, D-013, D-057, D-084 | 13.6 |
| CLI-09 | Поиск данных субъекта | 2 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-013, D-102 | 13.6 |
| CLI-10 | Импорт и экспорт | 2 | 06 | [0010](adr/0010-api-style.md) | D-016 | 13.7 |
| CLI-11 | Состояние базы | 2 | 08 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-025, D-089 | 13.7 |
| CLI-12 | Первичная инициализация | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015 | 13.7 |
| CLI-13 | Коды выхода | 3 | 07, 08 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-032, D-034 | 13.8 |
| CLI-14 | Машиночитаемый вывод | 2 | 07, 08 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-032 | 13.8 |
| CLI-15 | Подтверждение деструктивных операций | 2 | 07, 09, 10 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-012, D-057, D-102 | 13.8 |
| CLI-16 | Секреты и ПДн не в аргументах и выводе | 2 | 09, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-013, D-015 | 13.8 |
| CLI-17 | Повторная нормализация телефонов | 3 | 06, 08 | [0008](adr/0008-phone-normalization.md) | D-073 | 13.9 |
| CLI-18 | Схема конфигурации | 4 | 07, 08 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-033, D-073, D-101, D-118 | 13.2 |
| CLI-19 | Затирание данных субъекта из командной строки | 2 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-013, D-102 | 13.10 |
| CLI-20 | Подтверждение пользователей после restore | 3 | 07, 10 | [0011](adr/0011-authentication-and-authorization.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-113, D-117, D-118 | 11.9 |
| CLI-21 | Снятие degraded-read-only из командной строки | 3 | 07, 08 | [0005](adr/0005-commit-and-durability-protocol.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-089, D-117 | 5.13 |
| CLI-22 | Подтверждение скачка часов из командной строки | 2 | 07, 08, 09 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-081, D-117 | 10.9 |

### backup-restore

| ID | Требование | Сценариев | CUJ | ADR | Решения | Задачи |
|---|---|---:|---|---|---|---|
| BKP-01 | Онлайн-бэкап из MVCC-снимка | 2 | 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0013](adr/0013-backup-from-snapshot.md) | D-018, D-025, D-056, D-093 | 11.1 |
| BKP-02 | Формат файла бэкапа | 3 | 07 | [0013](adr/0013-backup-from-snapshot.md) | D-025, D-036, D-063 | 11.1 |
| BKP-03 | Атомарная и долговечная запись бэкапа | 3 | 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0013](adr/0013-backup-from-snapshot.md) | D-019, D-025 | 11.1 |
| BKP-04 | Проверка созданного бэкапа | 3 | 07, 08 | [0013](adr/0013-backup-from-snapshot.md) | D-025, D-096 | 11.2 |
| BKP-05 | Восстановление в новый файл с атомарной подменой | 3 | 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0013](adr/0013-backup-from-snapshot.md) | D-019, D-025 | 11.3 |
| BKP-06 | Отказ восстанавливать из негодного бэкапа | 1 | 07 | [0013](adr/0013-backup-from-snapshot.md) | D-019, D-025 | 11.3 |
| BKP-07 | Повторное применение журнала purge после восстановления | 3 | 07, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0013](adr/0013-backup-from-snapshot.md) | D-012, D-036, D-042, D-075, D-076 | 11.3, 17.3 |
| BKP-08 | Офлайн-проверка целостности | 3 | 07, 08 | [0013](adr/0013-backup-from-snapshot.md), [0015](adr/0015-reliability-testing.md) | D-025, D-026, D-085, D-086, D-091 | 5.6, 11.4 |
| BKP-09 | Отчёт verify без ПДн и без изменения файла | 1 | 07, 09 | [0015](adr/0015-reliability-testing.md) | D-013, D-025 | 11.4 |
| BKP-10 | Онлайн-проверка целостности | 2 | 07, 08 | [0013](adr/0013-backup-from-snapshot.md), [0015](adr/0015-reliability-testing.md) | D-025, D-078, D-089 | 11.4 |
| BKP-11 | Офлайн-компактизация | 2 | 07, 08 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-018, D-019, D-095 | 11.5, 17.3 |
| BKP-12 | Ротация бэкапов и срок хранения ПДн | 3 | 07, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0013](adr/0013-backup-from-snapshot.md) | D-012, D-025, D-037, D-081, D-117 | 10.9, 11.6 |
| BKP-13 | next_contact_id после восстановления | 1 | 03, 07 | [0007](adr/0007-data-model.md), [0013](adr/0013-backup-from-snapshot.md) | D-057, D-075 | 11.7 |
| BKP-14 | Новая линия БД после восстановления | 1 | 07, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0013](adr/0013-backup-from-snapshot.md) | D-080, D-095 | 11.7 |
| BKP-15 | Отзыв токенов и сессий после восстановления | 2 | 07, 10 | [0011](adr/0011-authentication-and-authorization.md), [0013](adr/0013-backup-from-snapshot.md) | D-079, D-117 | 11.7 |
| BKP-16 | Отказ при неподтверждённой актуальности журнала purge | 2 | 07, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0013](adr/0013-backup-from-snapshot.md) | D-036, D-069 | 11.3 |
| BKP-17 | Периодический бэкап | 1 | 07, 08 | [0013](adr/0013-backup-from-snapshot.md) | D-025, D-118 | 11.8 |

### build-constraints

| ID | Требование | Сценариев | CUJ | ADR | Решения | Задачи |
|---|---|---:|---|---|---|---|
| BLD-01 | Хранение написано с нуля на Rust (NFR-SCRATCH) | 2 | 03, 07 | [0002](adr/0002-implementation-language-rust.md), [0006](adr/0006-dependency-policy-from-scratch.md) | D-020, D-021 | 1.2 |
| BLD-02 | Allowlist runtime-зависимостей | 4 | 03, 05 | [0006](adr/0006-dependency-policy-from-scratch.md) | D-021, D-033, D-038, D-060, D-082, D-118 | 1.2, 1.8 |
| BLD-03 | Зависимости только для тестов | 1 | 03, 07 | [0006](adr/0006-dependency-policy-from-scratch.md), [0015](adr/0015-reliability-testing.md) | D-021, D-026, D-060, D-066, D-097 | 1.2, 1.8 |
| BLD-04 | Denylist крейтов | 1 | 03, 07 | [0004](adr/0004-no-mmap-own-page-cache.md), [0006](adr/0006-dependency-policy-from-scratch.md) | D-021, D-060 | 1.2 |
| BLD-05 | Проверка политики зависимостей в CI | 2 | 03, 07 | [0006](adr/0006-dependency-policy-from-scratch.md) | D-021, D-060, D-108 | 1.3 |
| BLD-06 | Toolchain Rust | 2 | 03, 07 | [0002](adr/0002-implementation-language-rust.md) | D-020 | 1.1 |
| BLD-07 | Запрет unsafe-кода вне budb-sys | 2 | 03, 07 | [0002](adr/0002-implementation-language-rust.md), [0018](adr/0018-unsafe-isolation-budb-sys.md) | D-020, D-090 | 1.1, 1.7 |
| BLD-08 | Собственная CRC32C | 4 | 03, 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0006](adr/0006-dependency-policy-from-scratch.md) | D-021, D-090 | 0.2, 2.1 |
| BLD-09 | Платформы и уровни поддержки | 2 | 03, 07 | [0014](adr/0014-platforms.md) | D-023, D-084 | 1.4 |
| BLD-10 | Единый бинарник budb | 1 | 05, 07, 10 | [0016](adr/0016-web-ui-technology.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-017, D-031, D-032 | 1.1 |
| BLD-11 | Воспроизводимая сборка | 2 | 07 | [0006](adr/0006-dependency-policy-from-scratch.md) | D-021 | 1.5 |
| BLD-12 | Детерминированная симуляция | 3 | 03, 07 | [0015](adr/0015-reliability-testing.md) | D-026, D-072, D-084, D-097 | 1.6, 5.3 |
| BLD-13 | Внедрение сбоев на каждом системном вызове коммита | 3 | 03, 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0015](adr/0015-reliability-testing.md) | D-019, D-026, D-072, D-088 | 5.4 |
| BLD-14 | Перебор состояний после сбоя | 2 | 03, 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0015](adr/0015-reliability-testing.md) | D-026 | 5.5 |
| BLD-15 | Модельные property-тесты | 3 | 01, 02, 03 | [0015](adr/0015-reliability-testing.md) | D-026 | 3.3 |
| BLD-16 | Фаззинг формата | 2 | 07 | [0015](adr/0015-reliability-testing.md) | D-026 | 2.5 |
| BLD-17 | Цикл kill -9 | 1 | 03, 07 | [0015](adr/0015-reliability-testing.md) | D-026, D-084 | 17.1 |
| BLD-18 | Эмуляция потери питания через LazyFS | 1 | 03, 07 | [0014](adr/0014-platforms.md), [0015](adr/0015-reliability-testing.md) | D-023, D-026, D-084 | 17.2 |
| BLD-19 | Проверка целостности в каждом тесте надёжности | 2 | 07, 08 | [0015](adr/0015-reliability-testing.md) | D-026, D-086 | 5.6, 17.1, 17.2 |
| BLD-20 | Правила крейта budb-sys | 2 | 03, 07 | [0002](adr/0002-implementation-language-rust.md), [0018](adr/0018-unsafe-isolation-budb-sys.md) | D-090 | 1.7, 2.1 |
| BLD-21 | Тесты конкурентности | 1 | 01, 03 | [0015](adr/0015-reliability-testing.md) | D-097 | 5.10 |
| BLD-22 | Ошибки сброса на реальном ядре | 1 | 03, 07 | [0014](adr/0014-platforms.md), [0015](adr/0015-reliability-testing.md) | D-088, D-097 | 5.11 |
| BLD-23 | Генерация таблиц Unicode при сборке | 2 | 02 | [0006](adr/0006-dependency-policy-from-scratch.md), [0009](adr/0009-name-search-key.md) | D-039, D-050, D-058 | 6.1 |
| BLD-24 | Закреплённая версия Unicode 18.0 | 1 | 02 | [0006](adr/0006-dependency-policy-from-scratch.md), [0009](adr/0009-name-search-key.md) | D-058, D-098 | 0.2, 6.1 |
| BLD-25 | Бюджеты тестов на PR и ночью | 2 | 03, 07 | [0015](adr/0015-reliability-testing.md) | D-084 | 5.3, 17.4 |
| BLD-26 | Эталонные файлы формата и коды выхода | 2 | 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0015](adr/0015-reliability-testing.md) | D-034, D-078 | 17.5 |
| BLD-27 | Предрелизный длительный прогон | 1 | 07, 08 | [0015](adr/0015-reliability-testing.md) | D-024, D-026 | 17.4 |
| BLD-28 | Абстракция Clock во всех слоях | 2 | 03, 07 | [0015](adr/0015-reliability-testing.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-081, D-113 | 1.6 |

### contacts

| ID | Требование | Сценариев | CUJ | ADR | Решения | Задачи |
|---|---|---:|---|---|---|---|
| CON-01 | Состав агрегата контакта | 2 | 03, 05 | [0007](adr/0007-data-model.md) | D-009, D-022, D-064 | 3.2, 7.1 |
| CON-02 | Идентификатор контакта | 4 | 03, 05, 07 | [0007](adr/0007-data-model.md) | D-009, D-057, D-075 | 7.2 |
| CON-03 | Лимиты имени | 3 | 03, 06 | [0007](adr/0007-data-model.md) | D-022 | 3.2, 7.1 |
| CON-04 | Состав телефона | 3 | 03 | [0007](adr/0007-data-model.md), [0008](adr/0008-phone-normalization.md) | D-009, D-010, D-071 | 7.1 |
| CON-05 | Отказ при недопустимом телефоне | 1 | 03, 05 | [0008](adr/0008-phone-normalization.md) | D-010 | 7.1 |
| CON-06 | Уникальность телефона внутри контакта | 2 | 03 | [0007](adr/0007-data-model.md) | D-009, D-059 | 7.1 |
| CON-07 | Общий телефон у нескольких контактов | 1 | 01, 03 | [0007](adr/0007-data-model.md) | D-009 | 7.5 |
| CON-08 | Основной телефон | 3 | 03 | [0007](adr/0007-data-model.md) | D-009, D-059 | 7.1 |
| CON-09 | Запрет заметок и неизвестных полей | 1 | 03, 09 | [0007](adr/0007-data-model.md) | D-016, D-071 | 7.1 |
| CON-10 | Создание контакта | 2 | 03, 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0007](adr/0007-data-model.md) | D-019 | 7.3 |
| CON-11 | Чтение контакта | 2 | 01, 05 | [0007](adr/0007-data-model.md) | D-009, D-012 | 7.3 |
| CON-12 | Изменение контакта | 1 | 03, 05 | [0007](adr/0007-data-model.md), [0010](adr/0010-api-style.md) | D-009 | 7.3 |
| CON-13 | Проверка версии при изменении | 2 | 04, 05 | [0010](adr/0010-api-style.md) | D-009, D-041 | 7.3 |
| CON-14 | Удаление в корзину | 2 | 03, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012, D-064 | 7.4 |
| CON-15 | Восстановление из корзины | 4 | 03 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012, D-041, D-064 | 7.4 |
| CON-16 | Просмотр корзины | 2 | 03, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012, D-041, D-047 | 7.4 |
| CON-17 | Окно восстановления из корзины | 2 | 03, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012, D-049 | 7.4 |
| CON-18 | Подсказка о возможных дубликатах | 2 | 03 | [0007](adr/0007-data-model.md) | D-009, D-051 | 7.5 |
| CON-19 | Служебные метаданные | 2 | 03, 05, 06 | [0007](adr/0007-data-model.md) | D-009, D-071 | 7.1, 8.4 |

### data-privacy

| ID | Требование | Сценариев | CUJ | ADR | Решения | Задачи |
|---|---|---:|---|---|---|---|
| PRV-01 | Имена и телефоны — персональные данные | 1 | 09 | [0007](adr/0007-data-model.md), [0012](adr/0012-deletion-trash-and-purge.md) | D-009, D-012 | 10.2 |
| PRV-02 | Минимизация состава данных | 1 | 03, 06 | [0007](adr/0007-data-model.md) | D-016 | 10.7 |
| PRV-03 | Срок хранения в корзине | 3 | 03, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-033, D-049 | 10.1 |
| PRV-04 | Автоматическая очистка корзины | 2 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-049, D-081 | 10.1, 10.9 |
| PRV-05 | Логическое удаление при purge | 3 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012, D-065, D-084, D-116, D-117 | 10.2 |
| PRV-06 | Физическое затирание в файлах базы | 3 | 09 | [0003](adr/0003-storage-engine-cow-btree.md), [0012](adr/0012-deletion-trash-and-purge.md), [0015](adr/0015-reliability-testing.md) | D-056, D-070, D-077 | 10.2, 17.3 |
| PRV-07 | Затирание при активных снимках чтения | 2 | 07, 09 | [0003](adr/0003-storage-engine-cow-btree.md), [0012](adr/0012-deletion-trash-and-purge.md) | D-056, D-076, D-084 | 10.2 |
| PRV-08 | Квитанция purge | 2 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012, D-076 | 10.2 |
| PRV-09 | Журнал purge без ПДн | 4 | 07, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0013](adr/0013-backup-from-snapshot.md) | D-036, D-042, D-075, D-076, D-084 | 10.3 |
| PRV-10 | Повторное применение журнала при восстановлении | 4 | 07, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0013](adr/0013-backup-from-snapshot.md) | D-069, D-075 | 11.3 |
| PRV-11 | Срок хранения бэкапов | 2 | 07, 09 | [0013](adr/0013-backup-from-snapshot.md) | D-025, D-037, D-081 | 11.6 |
| PRV-12 | Журнал аудита изменений и доступа | 4 | 08, 09, 10 | [0012](adr/0012-deletion-trash-and-purge.md) | D-065, D-100, D-117, D-118 | 10.4, 10.8 |
| PRV-13 | Журнал аудита без значений ПДн | 2 | 09, 10 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012, D-100 | 10.4 |
| PRV-14 | Маскирование ПДн в логах и метриках | 2 | 08, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-013 | 10.5 |
| PRV-15 | Выгрузка данных субъекта | 2 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-013, D-016, D-100, D-102 | 10.6 |
| PRV-16 | Срок хранения результатов экспорта и загрузок | 3 | 06, 09 | [0010](adr/0010-api-style.md) | D-016, D-064, D-065 | 12.6 |
| PRV-17 | Локализация данных — задача эксплуатации | 1 | 07 | [0013](adr/0013-backup-from-snapshot.md), [0014](adr/0014-platforms.md) | D-012 | 10.7 |
| PRV-18 | Затирание прежних значений и данных субъекта в чужих контактах | 2 | 09 | [0003](adr/0003-storage-engine-cow-btree.md), [0012](adr/0012-deletion-trash-and-purge.md) | D-102 | 8.12 |
| PRV-19 | Ограничения, которые закрывает оператор | 3 | 07, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0013](adr/0013-backup-from-snapshot.md) | D-105 | 10.10 |
| PRV-20 | Аудит согласован со сбоями и restore | 2 | 07, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-080, D-095 | 10.8 |
| PRV-21 | Сброс аудита чтений и поиска при вводе | 3 | 01, 08, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-100, D-117, D-118 | 10.11 |
| PRV-22 | Нехватка места на ФС журнала аудита | 3 | 08, 09 | [0005](adr/0005-commit-and-durability-protocol.md), [0012](adr/0012-deletion-trash-and-purge.md) | D-072, D-117, D-118 | 10.11, 10.13 |
| PRV-23 | Purge в режиме degraded-read-only | 3 | 07, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-069, D-076, D-117 | 10.12 |
| PRV-24 | Аудит экспорта | 3 | 06, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-100, D-118 | 10.13 |

### http-api

| ID | Требование | Сценариев | CUJ | ADR | Решения | Задачи |
|---|---|---:|---|---|---|---|
| API-01 | Версионированный базовый путь и формат JSON | 3 | 05 | [0010](adr/0010-api-style.md) | D-059, D-099 | 8.1 |
| API-02 | Документ OpenAPI 3.1 отдаётся сервером | 2 | 05 | [0010](adr/0010-api-style.md) | D-059 | 8.1 |
| API-03 | Совместимость в рамках v1 | 2 | 05 | [0010](adr/0010-api-style.md) | D-059, D-099 | 8.1 |
| API-04 | Создание контакта | 2 | 03, 05 | [0007](adr/0007-data-model.md), [0010](adr/0010-api-style.md) | D-009, D-057 | 8.2 |
| API-05 | Чтение контакта | 3 | 01, 05 | [0010](adr/0010-api-style.md) | D-009, D-012, D-099 | 8.2 |
| API-06 | Изменение контакта полной заменой | 3 | 03, 04 | [0010](adr/0010-api-style.md) | D-009, D-071 | 8.2 |
| API-07 | Удаление контакта в корзину | 2 | 03, 09 | [0010](adr/0010-api-style.md), [0012](adr/0012-deletion-trash-and-purge.md) | D-012, D-041 | 8.2 |
| API-08 | Отказ 412 при несовпадении версии | 1 | 04 | [0010](adr/0010-api-style.md) | D-009, D-041, D-099 | 8.2 |
| API-09 | Отказ 428 без условия If-Match | 2 | 04, 05 | [0010](adr/0010-api-style.md) | D-009, D-041, D-099 | 8.2 |
| API-10 | Поиск только через POST contacts:search | 4 | 01, 02, 05 | [0010](adr/0010-api-style.md) | D-013, D-066 | 8.3 |
| API-11 | ПДн и секреты не передаются в URL | 2 | 01, 05 | [0010](adr/0010-api-style.md), [0011](adr/0011-authentication-and-authorization.md) | D-013, D-099 | 8.3 |
| API-12 | Размер страницы | 3 | 02, 05 | [0010](adr/0010-api-style.md) | D-024, D-047 | 8.3 |
| API-13 | Непрозрачный курсор страницы | 4 | 02, 05 | [0010](adr/0010-api-style.md) | D-048, D-082 | 7.9, 8.3 |
| API-14 | Ошибки в формате RFC 9457 | 3 | 05 | [0010](adr/0010-api-style.md) | D-013, D-099, D-101 | 0.2, 8.4 |
| API-15 | Ошибки валидации с кодами полей | 4 | 03, 05 | [0010](adr/0010-api-style.md) | D-022, D-071 | 8.4 |
| API-16 | Повтор запроса с Idempotency-Key | 4 | 05, 06 | [0010](adr/0010-api-style.md) | D-055, D-059, D-065, D-110, D-116 | 8.5 |
| API-17 | Ошибки использования Idempotency-Key | 3 | 05, 06 | [0010](adr/0010-api-style.md) | D-059, D-099 | 8.5 |
| API-18 | Лимит размера тела | 3 | 05, 06 | [0010](adr/0010-api-style.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-033, D-073 | 8.6 |
| API-19 | Ограничение частоты 429 с Retry-After | 3 | 05, 08 | [0010](adr/0010-api-style.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-032, D-073, D-101 | 8.6, 9.12 |
| API-20 | Перегрузка и неготовность 503 с Retry-After | 3 | 03, 08 | [0010](adr/0010-api-style.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-032, D-099 | 8.6 |
| API-21 | Коды 401 и 403 | 2 | 05, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-015, D-099, D-103 | 9.1 |
| API-22 | Корзина: просмотр и восстановление | 4 | 03, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-041, D-064 | 8.8 |
| API-23 | Отмена своего удаления (заменено) | 1 | 03 | [0012](adr/0012-deletion-trash-and-purge.md) | D-041 | 8.8 |
| API-24 | Немедленная очистка контакта (purge) | 3 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012, D-076 | 10.2 |
| API-25 | Импорт как асинхронная задача | 3 | 06 | [0010](adr/0010-api-style.md) | D-016, D-053, D-084 | 12.2 |
| API-26 | Экспорт как асинхронная задача | 3 | 06 | [0010](adr/0010-api-style.md) | D-016, D-065, D-084 | 12.5 |
| API-27 | Административные ресурсы | 3 | 07, 08, 10 | [0010](adr/0010-api-style.md), [0011](adr/0011-authentication-and-authorization.md) | D-017, D-025, D-041, D-046, D-089, D-117 | 8.7, 8.10 |
| API-28 | Предпросмотр нормализации номера | 2 | 03, 05 | [0008](adr/0008-phone-normalization.md), [0010](adr/0010-api-style.md) | D-010 | 8.8 |
| API-29 | Сессия веб-UI | 4 | 01, 10 | [0011](adr/0011-authentication-and-authorization.md), [0016](adr/0016-web-ui-technology.md) | D-068, D-106 | 8.9, 14.9 |
| API-30 | Представление контакта в JSON | 2 | 05 | [0007](adr/0007-data-model.md), [0010](adr/0010-api-style.md) | D-057, D-064, D-084 | 8.2 |
| API-31 | Ответы при деградации хранилища | 3 | 01, 03, 08 | [0005](adr/0005-commit-and-durability-protocol.md), [0010](adr/0010-api-style.md) | D-034, D-072, D-078, D-089 | 5.9, 8.10 |
| API-32 | Единая модель фоновых задач | 4 | 06, 07 | [0010](adr/0010-api-style.md) | D-064, D-084 | 8.11 |
| API-33 | Повтор изменений и неизвестный исход | 2 | 03, 04, 05 | [0010](adr/0010-api-style.md) | D-034, D-059 | 8.11 |
| API-34 | Затирание данных субъекта в чужих контактах | 2 | 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-102 | 8.12, 13.10 |
| API-35 | Регион нормализации в запросах | 2 | 01, 03, 06 | [0008](adr/0008-phone-normalization.md), [0010](adr/0010-api-style.md) | D-010, D-052 | 8.11 |
| API-36 | Коды тайм-аута поиска и исчерпания квоты | 2 | 01, 02, 05 | [0010](adr/0010-api-style.md) | D-078, D-083, D-112, D-118 | 7.11 |
| API-37 | CSRF для поиска и освобождение bearer-запросов | 2 | 01, 05 | [0010](adr/0010-api-style.md), [0011](adr/0011-authentication-and-authorization.md) | D-068, D-113 | 9.5 |
| API-38 | Префикс телефона без плюса — национальный номер | 3 | 01, 05 | [0008](adr/0008-phone-normalization.md), [0010](adr/0010-api-style.md) | D-052, D-113, D-116 | 6.9 |
| API-39 | Подтверждение пользователя после restore | 3 | 07, 10 | [0010](adr/0010-api-style.md), [0011](adr/0011-authentication-and-authorization.md) | D-113, D-117, D-118 | 11.9 |
| API-40 | Снятие degraded-read-only после повреждения | 3 | 07, 08 | [0005](adr/0005-commit-and-durability-protocol.md), [0010](adr/0010-api-style.md) | D-089, D-117, D-118 | 5.13 |
| API-41 | Подтверждение скачка часов | 3 | 07, 08, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0013](adr/0013-backup-from-snapshot.md) | D-081, D-117 | 10.9 |

### import-export

| ID | Требование | Сценариев | CUJ | ADR | Решения | Задачи |
|---|---|---:|---|---|---|---|
| IMP-01 | Форматы и кодировка | 2 | 06 | [0010](adr/0010-api-style.md) | D-016 | 12.1 |
| IMP-02 | Колонки CSV | 3 | 06 | [0007](adr/0007-data-model.md) | D-009, D-016, D-022, D-071 | 12.1 |
| IMP-03 | Телефоны в файлах | 2 | 06 | [0008](adr/0008-phone-normalization.md) | D-009, D-010, D-054 | 12.1 |
| IMP-04 | Записи NDJSON | 3 | 05, 06 | [0007](adr/0007-data-model.md), [0010](adr/0010-api-style.md) | D-016, D-054, D-071 | 12.1 |
| IMP-05 | Задание импорта | 2 | 06 | [0010](adr/0010-api-style.md) | D-016, D-032, D-064, D-084 | 12.2 |
| IMP-06 | Очередь заданий импорта | 1 | 06, 08 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-032 | 12.2 |
| IMP-07 | Пробный прогон | 1 | 06 | [0010](adr/0010-api-style.md) | D-016 | 12.2 |
| IMP-08 | Построчный отчёт | 2 | 06, 09 | [0010](adr/0010-api-style.md) | D-012, D-013 | 12.2 |
| IMP-09 | Применение пакетами | 1 | 03, 06 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019, D-032 | 12.3 |
| IMP-10 | Прерывание импорта | 3 | 06, 07 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019, D-053, D-084 | 12.3, 17.3 |
| IMP-11 | Политика дубликатов | 3 | 06 | [0007](adr/0007-data-model.md) | D-009, D-053, D-071 | 12.3 |
| IMP-12 | Лимиты размера импорта | 2 | 06, 08 | [0010](adr/0010-api-style.md) | D-032 | 12.4 |
| IMP-13 | Экспорт согласованного снимка | 2 | 06, 07 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018, D-084 | 12.5 |
| IMP-14 | Потоковый экспорт | 1 | 06, 08 | [0010](adr/0010-api-style.md) | D-024 | 12.5 |
| IMP-15 | Защита от CSV-инъекции | 4 | 06 | [0010](adr/0010-api-style.md) | D-016, D-060, D-106 | 12.5 |
| IMP-16 | Обратимость экспорта | 2 | 06, 07 | [0007](adr/0007-data-model.md) | D-016, D-054, D-071 | 12.5 |
| IMP-17 | Экспорт и purge | 3 | 06, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-065, D-084 | 12.7 |
| IMP-18 | Хранение загруженного файла импорта | 3 | 06, 09 | [0010](adr/0010-api-style.md), [0012](adr/0012-deletion-trash-and-purge.md) | D-065, D-113, D-118 | 12.7 |

### name-normalization

| ID | Требование | Сценариев | CUJ | ADR | Решения | Задачи |
|---|---|---:|---|---|---|---|
| NAM-01 | Хранение имени в NFC | 2 | 02, 03 | [0009](adr/0009-name-search-key.md) | D-009, D-011 | 6.2 |
| NAM-02 | Обрезка и схлопывание пробелов | 2 | 02, 03 | [0009](adr/0009-name-search-key.md) | D-011, D-058 | 6.2 |
| NAM-03 | Удаление управляющих символов | 1 | 03, 06 | [0009](adr/0009-name-search-key.md) | D-011 | 6.2 |
| NAM-04 | Запрет пустого имени | 3 | 03, 06 | [0009](adr/0009-name-search-key.md) | D-022 | 6.2 |
| NAM-05 | Построение ключа имени | 3 | 02 | [0009](adr/0009-name-search-key.md) | D-011, D-050, D-098 | 6.3 |
| NAM-06 | Полный case folding без тюркских правил | 2 | 02 | [0009](adr/0009-name-search-key.md) | D-011, D-050 | 6.3 |
| NAM-07 | Без снятия диакритики | 3 | 02 | [0009](adr/0009-name-search-key.md) | D-011 | 6.3 |
| NAM-08 | Данные Unicode 18.0 | 3 | 02 | [0006](adr/0006-dependency-policy-from-scratch.md), [0009](adr/0009-name-search-key.md) | D-039, D-050, D-058, D-098 | 0.2, 6.1 |
| NAM-09 | Версия правил ключа | 1 | 02, 08 | [0009](adr/0009-name-search-key.md) | D-011, D-050, D-098 | 6.3 |
| NAM-10 | Переиндексация при смене версии | 1 | 02, 07, 08 | [0009](adr/0009-name-search-key.md) | D-011, D-051 | 6.4 |
| NAM-11 | Атомарность переиндексации | 1 | 02, 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0009](adr/0009-name-search-key.md) | D-011, D-019 | 6.4 |
| NAM-12 | Ключ поискового запроса | 1 | 02 | [0009](adr/0009-name-search-key.md) | D-011, D-051, D-058 | 6.3 |
| NAM-13 | Ключи слов имени | 4 | 02 | [0009](adr/0009-name-search-key.md) | D-051, D-118 | 6.3 |

### observability

| ID | Требование | Сценариев | CUJ | ADR | Решения | Задачи |
|---|---|---:|---|---|---|---|
| OBS-01 | Эндпоинт живости | 3 | 07, 08 | [0005](adr/0005-commit-and-durability-protocol.md), [0010](adr/0010-api-style.md) | D-019, D-034, D-089 | 15.1 |
| OBS-02 | Эндпоинт готовности | 5 | 01, 07, 08 | [0010](adr/0010-api-style.md) | D-019, D-025, D-072, D-089 | 5.9, 15.1 |
| OBS-03 | Эндпоинт метрик в текстовом формате Prometheus | 3 | 08, 10 | [0010](adr/0010-api-style.md), [0011](adr/0011-authentication-and-authorization.md) | D-015, D-103 | 9.12, 15.2 |
| OBS-04 | Гистограммы задержек поиска и записи | 2 | 01, 02, 03, 08 | [0010](adr/0010-api-style.md) | D-024, D-094 | 15.3 |
| OBS-05 | Метрики объёма данных и хранилища | 1 | 06, 08 | [0010](adr/0010-api-style.md) | D-024 | 15.3 |
| OBS-06 | Метрики кэша | 1 | 01, 08 | [0010](adr/0010-api-style.md) | D-024 | 15.3 |
| OBS-07 | Метрики долговечности | 1 | 03, 07, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019 | 15.3 |
| OBS-08 | Номер последней подтверждённой транзакции | 1 | 03, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019, D-095 | 10.8, 15.3 |
| OBS-09 | Возраст самого старого снимка чтения | 1 | 06, 07, 08 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018 | 15.3 |
| OBS-10 | Метрики очереди записи | 1 | 03, 05, 08 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-032 | 15.3 |
| OBS-11 | Метрики бэкапа и проверки целостности | 2 | 07, 08 | [0013](adr/0013-backup-from-snapshot.md) | D-025, D-096 | 11.8, 15.3 |
| OBS-12 | Метрики без ПДн | 1 | 08, 09 | [0010](adr/0010-api-style.md) | D-012, D-013 | 15.4 |
| OBS-13 | Структурированные логи без ПДн | 2 | 08, 09 | [0010](adr/0010-api-style.md) | D-013 | 15.4 |
| OBS-14 | События надёжности в логе | 2 | 07, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019, D-063, D-072, D-088, D-095 | 15.4 |
| OBS-15 | Свежесть метрик | 1 | 08 | [0010](adr/0010-api-style.md) | D-024 | 15.4 |
| OBS-16 | Метрики режимов отказа | 2 | 07, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-035, D-063, D-072, D-089 | 15.5 |
| OBS-17 | Метрики затирания и удержания страниц | 2 | 08, 09 | [0003](adr/0003-storage-engine-cow-btree.md), [0012](adr/0012-deletion-trash-and-purge.md) | D-092, D-093, D-102 | 15.5 |
| OBS-18 | Свободное место на файловых системах | 1 | 07, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-065, D-072, D-118 | 15.5 |
| OBS-19 | IP клиента в логах и аудите | 2 | 08, 10 | [0010](adr/0010-api-style.md), [0011](adr/0011-authentication-and-authorization.md) | D-101 | 9.11 |
| OBS-20 | Правила алертов в поставке | 1 | 07, 08 | [0010](adr/0010-api-style.md) | D-035, D-081, D-089, D-093, D-117 | 15.5 |
| OBS-21 | Пауза из-за скачка часов | 1 | 07, 08, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0013](adr/0013-backup-from-snapshot.md) | D-081, D-117 | 10.9, 15.5 |
| OBS-22 | Алерт по зависшему purge | 2 | 08, 09 | [0010](adr/0010-api-style.md), [0012](adr/0012-deletion-trash-and-purge.md) | D-117 | 10.12, 15.5 |

### performance-capacity

| ID | Требование | Сценариев | CUJ | ADR | Решения | Задачи |
|---|---|---:|---|---|---|---|
| PERF-01 | Цель проектирования 10^8 контактов | 1 | 06, 08 | [0003](adr/0003-storage-engine-cow-btree.md) | D-024 | 16.5 |
| PERF-02 | Эталонный стенд для SLO | 2 | 01, 02, 03 | [0003](adr/0003-storage-engine-cow-btree.md) | D-024 | 16.2 |
| PERF-03 | Профиль нагрузки 95/5 | 1 | 01, 02, 03 | [0003](adr/0003-storage-engine-cow-btree.md) | D-024 | 16.2 |
| PERF-04 | SLO точного поиска | 2 | 01, 02 | [0003](adr/0003-storage-engine-cow-btree.md), [0004](adr/0004-no-mmap-own-page-cache.md) | D-024 | 10.11, 16.3, 16.6 |
| PERF-05 | SLO префиксного поиска | 1 | 01, 02 | [0003](adr/0003-storage-engine-cow-btree.md) | D-024 | 16.3, 16.6 |
| PERF-06 | SLO долговечной записи | 1 | 03 | [0005](adr/0005-commit-and-durability-protocol.md) | D-024, D-094 | 16.3, 16.6 |
| PERF-07 | Время открытия после сбоя | 2 | 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-024, D-087, D-088 | 5.7, 16.6 |
| PERF-08 | SLO поиска через API | 2 | 01, 02, 05 | [0010](adr/0010-api-style.md) | D-024, D-060, D-073 | 16.4, 16.6 |
| PERF-09 | Размер кэша страниц | 2 | 01, 08 | [0004](adr/0004-no-mmap-own-page-cache.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-024, D-033 | 4.1 |
| PERF-10 | Минимум RAM | 1 | 01, 08 | [0003](adr/0003-storage-engine-cow-btree.md) | D-024 | 16.5 |
| PERF-11 | Пропускная способность | 2 | 01, 03, 06 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-024, D-032, D-073, D-094 | 16.4, 16.6 |
| PERF-12 | Размер файла | 1 | 06, 08 | [0003](adr/0003-storage-engine-cow-btree.md) | D-024, D-094 | 16.5, 16.6 |
| PERF-13 | Воспроизводимый бенчмарк | 2 | 01, 02, 03 | [0015](adr/0015-reliability-testing.md) | D-024 | 16.1 |
| PERF-14 | Backpressure при перегрузке | 2 | 03, 05, 08 | [0010](adr/0010-api-style.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-032, D-118 | 4.5 |
| PERF-15 | Метод измерения задержек | 2 | 01, 02, 03 | [0015](adr/0015-reliability-testing.md) | D-024 | 16.1 |
| PERF-16 | SLO как условие выпуска | 1 | 01, 03, 08 | [0015](adr/0015-reliability-testing.md) | D-024, D-094 | 16.6 |
| PERF-17 | Отчёт об усилении записи | 2 | 03, 08 | [0003](adr/0003-storage-engine-cow-btree.md), [0015](adr/0015-reliability-testing.md) | D-094, D-102 | 16.7 |
| PERF-18 | Время восстановления из бэкапа | 1 | 07 | [0013](adr/0013-backup-from-snapshot.md) | D-066 | 11.8, 16.6 |

### phone-normalization

| ID | Требование | Сценариев | CUJ | ADR | Решения | Задачи |
|---|---|---:|---|---|---|---|
| PHN-01 | Канонический результат нормализации | 1 | 01, 03 | [0008](adr/0008-phone-normalization.md) | D-010, D-022 | 6.5 |
| PHN-02 | Порядок шагов нормализации | 1 | 01, 03 | [0008](adr/0008-phone-normalization.md) | D-010 | 6.5 |
| PHN-03 | Разделители и недопустимые символы | 3 | 03, 06 | [0008](adr/0008-phone-normalization.md) | D-010 | 6.5 |
| PHN-04 | Добавочный номер | 6 | 03 | [0008](adr/0008-phone-normalization.md) | D-010, D-022, D-066 | 6.5 |
| PHN-05 | Международная форма номера | 3 | 01, 03 | [0008](adr/0008-phone-normalization.md) | D-010 | 6.5 |
| PHN-06 | Национальный формат региона RU | 4 | 01, 03 | [0008](adr/0008-phone-normalization.md) | D-010, D-052, D-059 | 6.5 |
| PHN-07 | Регион по умолчанию | 2 | 03, 06 | [0008](adr/0008-phone-normalization.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-010, D-033, D-052 | 6.6 |
| PHN-08 | Регион операции | 1 | 05, 06 | [0008](adr/0008-phone-normalization.md) | D-010 | 6.6 |
| PHN-09 | Код страны по списку ITU | 2 | 03 | [0008](adr/0008-phone-normalization.md) | D-010, D-059 | 6.7 |
| PHN-10 | Общая длина номера | 2 | 03 | [0008](adr/0008-phone-normalization.md) | D-010 | 6.7 |
| PHN-11 | Национальные длины для кода +7 | 3 | 01, 03 | [0008](adr/0008-phone-normalization.md) | D-010 | 6.7 |
| PHN-12 | Сохранение исходного ввода | 2 | 03, 06 | [0008](adr/0008-phone-normalization.md) | D-009, D-010 | 6.5 |
| PHN-13 | Идемпотентность нормализации | 2 | 05, 06 | [0008](adr/0008-phone-normalization.md) | D-010 | 6.8 |
| PHN-14 | Понятная ошибка нормализации | 2 | 03, 05, 06 | [0008](adr/0008-phone-normalization.md), [0010](adr/0010-api-style.md) | D-010 | 6.5 |
| PHN-15 | Версия правил нормализации | 2 | 03, 08 | [0008](adr/0008-phone-normalization.md) | D-010, D-059 | 6.8 |
| PHN-16 | Повторная нормализация при смене правил | 3 | 06, 08 | [0008](adr/0008-phone-normalization.md) | D-010, D-073 | 6.8, 13.9 |
| PHN-17 | Нормализация префикса номера для поиска | 6 | 01, 05 | [0008](adr/0008-phone-normalization.md) | D-052, D-066, D-074, D-112, D-116 | 6.9, 7.6, 14.2 |

### search

| ID | Требование | Сценариев | CUJ | ADR | Решения | Задачи |
|---|---|---:|---|---|---|---|
| SRCH-01 | Точный поиск по телефону | 2 | 01, 05 | [0008](adr/0008-phone-normalization.md) | D-009, D-010 | 7.6 |
| SRCH-02 | Недопустимый телефон в запросе | 1 | 01, 05 | [0008](adr/0008-phone-normalization.md), [0010](adr/0010-api-style.md) | D-010 | 7.6 |
| SRCH-03 | Префиксный поиск по телефону | 3 | 01, 05 | [0008](adr/0008-phone-normalization.md) | D-010, D-066, D-074 | 7.6 |
| SRCH-04 | Точный поиск по имени | 2 | 02, 05 | [0009](adr/0009-name-search-key.md) | D-011, D-051 | 7.7 |
| SRCH-05 | Префиксный поиск по имени | 4 | 02, 05 | [0009](adr/0009-name-search-key.md) | D-051, D-062, D-074, D-112 | 7.7 |
| SRCH-06 | Границы длины запроса | 4 | 01, 02, 05 | [0010](adr/0010-api-style.md) | D-022, D-058, D-083 | 7.8 |
| SRCH-07 | Состав результата поиска | 1 | 01, 02, 05 | [0007](adr/0007-data-model.md) | D-009, D-057 | 7.8 |
| SRCH-08 | Порядок выдачи | 3 | 01, 02 | [0009](adr/0009-name-search-key.md) | D-011, D-062 | 3.1, 7.7, 7.8 |
| SRCH-09 | Размер страницы | 3 | 02, 05 | [0010](adr/0010-api-style.md) | D-024, D-047 | 7.8 |
| SRCH-10 | Курсор пагинации | 4 | 02, 05 | [0010](adr/0010-api-style.md) | D-013, D-048, D-074, D-082 | 7.9 |
| SRCH-11 | Страницы на свежих снимках | 4 | 02, 05 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018, D-048 | 7.9 |
| SRCH-12 | Срок действия курсора | 2 | 02, 05 | [0010](adr/0010-api-style.md) | D-048 | 7.9 |
| SRCH-13 | Пустой результат | 1 | 01, 02, 05 | [0010](adr/0010-api-style.md) | D-011, D-048 | 7.8 |
| SRCH-14 | Чтение своих записей | 2 | 01, 02, 03 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-018, D-019 | 7.10 |
| SRCH-15 | Корзина не участвует в поиске | 2 | 01, 02, 09 | [0012](adr/0012-deletion-trash-and-purge.md) | D-012, D-041, D-064 | 7.4 |
| SRCH-16 | Тайм-аут поиска | 1 | 01, 02, 08 | [0017](adr/0017-runtime-threads-and-configuration.md) | D-078, D-112, D-118 | 7.11 |
| SRCH-17 | Квота выдачи результатов | 2 | 01, 02, 10 | [0011](adr/0011-authentication-and-authorization.md) | D-083, D-112, D-118 | 7.11 |

### storage-engine

| ID | Требование | Сценариев | CUJ | ADR | Решения | Задачи |
|---|---|---:|---|---|---|---|
| STO-01 | Заголовок файла с magic и версией формата | 2 | 07 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018 | 2.3 |
| STO-02 | Отказ открыть неизвестную версию формата | 2 | 07 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018 | 2.3 |
| STO-03 | Страницы 4 КиБ с заголовком и CRC32C | 3 | 01, 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-018, D-019, D-085 | 2.2, 2.6 |
| STO-04 | Две мета-страницы с txid и CRC32C | 3 | 03, 07 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018, D-055, D-086, D-091 | 2.4 |
| STO-05 | Copy-on-write без перезаписи подтверждённых страниц | 1 | 03, 07 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018, D-102 | 4.2 |
| STO-06 | Три дерева и каталог в одном файле | 3 | 01, 02, 03 | [0003](adr/0003-storage-engine-cow-btree.md), [0007](adr/0007-data-model.md) | D-009, D-018, D-055, D-064 | 3.1 |
| STO-07 | Атомарность транзакции | 2 | 03, 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-018, D-019 | 4.7 |
| STO-08 | Единственный писатель | 1 | 03, 04 | [0003](adr/0003-storage-engine-cow-btree.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-018, D-032 | 4.5 |
| STO-09 | MVCC-снимки для читателей | 2 | 01, 02, 06 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018, D-032 | 4.3 |
| STO-10 | Правило переиспользования освобождённых страниц | 3 | 01, 03, 08 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018, D-087 | 4.2 |
| STO-11 | Протокол коммита | 3 | 03, 07 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019, D-065, D-080, D-094 | 4.4 |
| STO-12 | Подтверждение только после протокола коммита | 3 | 03, 05 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019, D-034 | 4.4, 5.2 |
| STO-13 | Group commit | 3 | 03, 06 | [0005](adr/0005-commit-and-durability-protocol.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-018, D-032, D-094, D-118 | 4.5 |
| STO-14 | Платформенные примитивы сброса | 1 | 03, 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0014](adr/0014-platforms.md) | D-019, D-023 | 4.4 |
| STO-15 | Сброс каталога после операций с файлами | 2 | 07 | [0005](adr/0005-commit-and-durability-protocol.md), [0014](adr/0014-platforms.md), [0018](adr/0018-unsafe-isolation-budb-sys.md) | D-019, D-023, D-090 | 1.7, 4.4 |
| STO-16 | Fail-stop при ошибке записи или сброса | 3 | 03, 07 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019, D-034, D-065, D-072, D-078, D-117 | 5.2 |
| STO-17 | Выбор мета-страницы при открытии | 3 | 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-018, D-019, D-035, D-063 | 5.1 |
| STO-18 | Явная ошибка при повреждении подтверждённых данных | 2 | 07, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019, D-063 | 5.1 |
| STO-19 | Повреждение, обнаруженное во время работы | 2 | 01, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019, D-078, D-089 | 5.9 |
| STO-20 | Эксклюзивная блокировка файла | 3 | 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0014](adr/0014-platforms.md) | D-018 | 4.6 |
| STO-21 | Запрет недолговечного режима | 1 | 03 | [0005](adr/0005-commit-and-durability-protocol.md), [0017](adr/0017-runtime-threads-and-configuration.md) | D-019, D-033 | 4.7 |
| STO-22 | Собственный кэш страниц без отображения файла в память | 2 | 01, 02, 08 | [0004](adr/0004-no-mmap-own-page-cache.md) | D-018 | 4.1 |
| STO-23 | Оговорка о честном сбросе накопителя | 2 | 03, 07, 09 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019, D-102 | 5.8, 10.10 |
| STO-24 | Лимит длительности снимка чтения | 2 | 01, 06, 08 | [0003](adr/0003-storage-engine-cow-btree.md) | D-018, D-048, D-056, D-076, D-078 | 4.3 |
| STO-25 | Указатель на дочернюю страницу с ожидаемым txid | 2 | 01, 07 | [0003](adr/0003-storage-engine-cow-btree.md), [0005](adr/0005-commit-and-durability-protocol.md) | D-085 | 2.6 |
| STO-26 | Число страниц файла в мета-странице | 2 | 07, 08 | [0003](adr/0003-storage-engine-cow-btree.md) | D-086 | 2.4, 5.1 |
| STO-27 | Список свободных страниц как COW-дерево free_db | 2 | 03, 07 | [0003](adr/0003-storage-engine-cow-btree.md) | D-091 | 4.2 |
| STO-28 | Служебные коммиты для purge и затирания | 2 | 09 | [0005](adr/0005-commit-and-durability-protocol.md), [0012](adr/0012-deletion-trash-and-purge.md) | D-056, D-070 | 4.9 |
| STO-29 | Затирание всех освобождённых страниц | 3 | 09 | [0003](adr/0003-storage-engine-cow-btree.md), [0012](adr/0012-deletion-trash-and-purge.md) | D-056, D-076, D-087, D-102 | 4.9 |
| STO-30 | Перезапись страниц с ключами очищенного контакта | 2 | 09 | [0003](adr/0003-storage-engine-cow-btree.md), [0012](adr/0012-deletion-trash-and-purge.md) | D-077 | 10.2 |
| STO-31 | Кооперативный отзыв снимка | 2 | 01, 06, 09 | [0003](adr/0003-storage-engine-cow-btree.md) | D-092 | 4.3 |
| STO-32 | Лимит объёма удерживаемых страниц | 1 | 06, 08 | [0003](adr/0003-storage-engine-cow-btree.md), [0013](adr/0013-backup-from-snapshot.md) | D-093 | 4.3 |
| STO-33 | Нехватка места на диске до коммита | 3 | 03, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-072, D-086, D-118 | 4.8, 5.4 |
| STO-34 | Переписывание мета-страницы при открытии | 2 | 07 | [0005](adr/0005-commit-and-durability-protocol.md) | D-088 | 5.1 |
| STO-35 | Режим degraded-read-only | 2 | 01, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-072, D-078, D-089 | 4.8, 5.9 |
| STO-36 | Атомарное создание файла БД | 1 | 07, 10 | [0005](adr/0005-commit-and-durability-protocol.md) | D-019 | 4.8 |
| STO-37 | Порванный хвост журналов | 2 | 07, 09 | [0005](adr/0005-commit-and-durability-protocol.md), [0012](adr/0012-deletion-trash-and-purge.md) | D-036, D-055 | 5.12 |
| STO-38 | Линия БД и идентификатор запуска | 2 | 07, 09 | [0005](adr/0005-commit-and-durability-protocol.md), [0013](adr/0013-backup-from-snapshot.md) | D-080, D-095 | 2.4, 10.8 |
| STO-39 | Монотонный next_contact_id | 1 | 03, 09 | [0007](adr/0007-data-model.md) | D-057, D-075 | 2.4, 7.2 |
| STO-40 | Снятие degraded-read-only после повреждения | 4 | 07, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-078, D-089, D-117 | 5.13 |
| STO-41 | Два порога свободного места | 3 | 03, 08 | [0005](adr/0005-commit-and-durability-protocol.md) | D-072, D-109, D-118 | 4.8 |

### web-ui

| ID | Требование | Сценариев | CUJ | ADR | Решения | Задачи |
|---|---|---:|---|---|---|---|
| UI-01 | Поставка без внешних ресурсов | 2 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-031 | 14.1 |
| UI-02 | Единое поле поиска при вводе | 2 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-013, D-031 | 14.2 |
| UI-03 | Автоопределение номера или имени | 6 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-010, D-058, D-066, D-074, D-116 | 14.2 |
| UI-04 | Подсветка совпадений | 2 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-031 | 14.2 |
| UI-05 | Доступный combobox поиска | 2 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-031 | 14.2 |
| UI-06 | Карточка контакта | 2 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-009 | 14.3 |
| UI-07 | Форма создания и редактирования | 2 | 03 | [0016](adr/0016-web-ui-technology.md) | D-022 | 14.3 |
| UI-08 | Показ нормализованного номера | 2 | 03 | [0008](adr/0008-phone-normalization.md), [0016](adr/0016-web-ui-technology.md) | D-010 | 14.3 |
| UI-09 | Подтверждение сохранения | 2 | 03 | [0016](adr/0016-web-ui-technology.md) | D-019, D-059 | 14.3 |
| UI-10 | Обработка конфликта версий | 5 | 04 | [0016](adr/0016-web-ui-technology.md) | D-009 | 14.3 |
| UI-11 | Удаление с возможностью отмены | 2 | 03 | [0012](adr/0012-deletion-trash-and-purge.md), [0016](adr/0016-web-ui-technology.md) | D-012, D-041 | 14.4 |
| UI-12 | Корзина | 3 | 03, 09 | [0012](adr/0012-deletion-trash-and-purge.md), [0016](adr/0016-web-ui-technology.md) | D-012, D-041 | 14.4 |
| UI-13 | Импорт с пробным прогоном | 2 | 06 | [0016](adr/0016-web-ui-technology.md) | D-016 | 14.5 |
| UI-14 | Экспорт | 2 | 06 | [0016](adr/0016-web-ui-technology.md) | D-016 | 14.5 |
| UI-15 | Страница состояния БД | 3 | 07, 08 | [0016](adr/0016-web-ui-technology.md) | D-025, D-089 | 14.5 |
| UI-16 | Вход и выход | 2 | 10 | [0011](adr/0011-authentication-and-authorization.md), [0016](adr/0016-web-ui-technology.md) | D-015, D-068 | 14.6 |
| UI-17 | Истечение сессии без потери ввода | 1 | 03 | [0016](adr/0016-web-ui-technology.md) | D-015, D-068 | 14.6 |
| UI-18 | Действия по роли | 1 | 10 | [0011](adr/0011-authentication-and-authorization.md), [0016](adr/0016-web-ui-technology.md) | D-015, D-041 | 14.6 |
| UI-19 | Контраст и перестроение | 2 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-031 | 14.7 |
| UI-20 | Клавиатура и видимый фокус | 2 | 01, 03 | [0016](adr/0016-web-ui-technology.md) | D-031 | 14.7 |
| UI-21 | Размер целей нажатия | 1 | 01 | [0016](adr/0016-web-ui-technology.md) | D-031 | 14.7 |
| UI-22 | Локализация ru/en | 3 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-031 | 14.7 |
| UI-23 | Мягкая деградация при 503 и 429 | 3 | 01, 03, 08 | [0016](adr/0016-web-ui-technology.md) | D-032, D-072, D-089 | 14.8 |
| UI-24 | Предупреждение об истечении сессии | 3 | 01, 03 | [0011](adr/0011-authentication-and-authorization.md), [0016](adr/0016-web-ui-technology.md) | D-066, D-106 | 14.9 |
| UI-25 | Быстрый доступ к полю поиска | 3 | 01, 02 | [0016](adr/0016-web-ui-technology.md) | D-106 | 14.10 |
| UI-26 | Копирование номера из списка результатов | 2 | 02 | [0016](adr/0016-web-ui-technology.md) | D-106 | 14.10 |

## 6. ADR → требования

| ADR | Название | Требований | ID требований |
|---|---|---:|---|
| 0001 | [Запись решений и процесс: OpenSpec + Elephant/Goldfish + LLM-expert review + Fact Grounding](adr/0001-decision-records-and-process.md) | 0 | — |
| 0002 | [Язык реализации: Rust](adr/0002-implementation-language-rust.md) | 4 | BLD-01, BLD-06, BLD-07, BLD-20 |
| 0003 | [Движок хранения: copy-on-write B+tree с двумя мета-страницами](adr/0003-storage-engine-cow-btree.md) | 42 | BKP-01, BKP-11, BLD-26, IMP-13, NAM-11, OBS-09, OBS-17, PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, PERF-07, PERF-10, PERF-11, PERF-12, PERF-17, PRV-06, PRV-07, PRV-18, SRCH-11, SRCH-14, STO-01, STO-02, STO-03, STO-04, STO-05, STO-06, STO-07, STO-08, STO-09, STO-10, STO-17, STO-20, STO-24, STO-25, STO-26, STO-27, STO-29, STO-30, STO-31, STO-32 |
| 0004 | [Без mmap: явный pread/pwrite и собственный кэш страниц](adr/0004-no-mmap-own-page-cache.md) | 4 | BLD-04, PERF-04, PERF-09, STO-22 |
| 0005 | [Протокол коммита и долговечности](adr/0005-commit-and-durability-protocol.md) | 46 | API-31, API-40, BKP-03, BKP-05, BKP-11, BLD-08, BLD-13, BLD-14, CLI-21, CON-10, IMP-09, IMP-10, OBS-01, OBS-07, OBS-08, OBS-14, OBS-16, OBS-18, PERF-06, PERF-07, PERF-11, PRV-22, SRCH-14, STO-03, STO-07, STO-11, STO-12, STO-13, STO-14, STO-15, STO-16, STO-17, STO-18, STO-19, STO-21, STO-23, STO-25, STO-28, STO-33, STO-34, STO-35, STO-36, STO-37, STO-38, STO-40, STO-41 |
| 0006 | [Политика зависимостей «с нуля» (NFR-SCRATCH)](adr/0006-dependency-policy-from-scratch.md) | 10 | BLD-01, BLD-02, BLD-03, BLD-04, BLD-05, BLD-08, BLD-11, BLD-23, BLD-24, NAM-08 |
| 0007 | [Модель данных: агрегат Contact с вложенными телефонами](adr/0007-data-model.md) | 25 | API-04, API-30, BKP-13, CON-01, CON-02, CON-03, CON-04, CON-06, CON-07, CON-08, CON-09, CON-10, CON-11, CON-12, CON-18, CON-19, IMP-02, IMP-04, IMP-11, IMP-16, PRV-01, PRV-02, SRCH-07, STO-06, STO-39 |
| 0008 | [Нормализация телефонов: собственный разбор и проверка «возможного номера»](adr/0008-phone-normalization.md) | 28 | API-28, API-35, API-38, CLI-17, CON-04, CON-05, IMP-03, PHN-01, PHN-02, PHN-03, PHN-04, PHN-05, PHN-06, PHN-07, PHN-08, PHN-09, PHN-10, PHN-11, PHN-12, PHN-13, PHN-14, PHN-15, PHN-16, PHN-17, SRCH-01, SRCH-02, SRCH-03, UI-08 |
| 0009 | [Поисковый ключ имени: NFKC → full case folding → ё→е](adr/0009-name-search-key.md) | 18 | BLD-23, BLD-24, NAM-01, NAM-02, NAM-03, NAM-04, NAM-05, NAM-06, NAM-07, NAM-08, NAM-09, NAM-10, NAM-11, NAM-12, NAM-13, SRCH-04, SRCH-05, SRCH-08 |
| 0010 | [Стиль API: HTTP/JSON `/api/v1`, поиск через POST с телом, Admin CLI](adr/0010-api-style.md) | 68 | API-01, API-02, API-03, API-04, API-05, API-06, API-07, API-08, API-09, API-10, API-11, API-12, API-13, API-14, API-15, API-16, API-17, API-18, API-19, API-20, API-25, API-26, API-27, API-28, API-30, API-31, API-32, API-33, API-35, API-36, API-37, API-38, API-39, API-40, CLI-10, CON-12, CON-13, IMP-01, IMP-04, IMP-05, IMP-07, IMP-08, IMP-12, IMP-14, IMP-15, IMP-18, OBS-01, OBS-02, OBS-03, OBS-04, OBS-05, OBS-06, OBS-12, OBS-13, OBS-15, OBS-19, OBS-20, OBS-22, PERF-08, PERF-14, PHN-14, PRV-16, SRCH-02, SRCH-06, SRCH-09, SRCH-10, SRCH-12, SRCH-13 |
| 0011 | [Аутентификация и авторизация: локальные учётные записи, роли, cookie-сессия для UI и bearer-токены для API](adr/0011-authentication-and-authorization.md) | 45 | ACL-01, ACL-02, ACL-03, ACL-04, ACL-05, ACL-06, ACL-07, ACL-08, ACL-09, ACL-10, ACL-11, ACL-12, ACL-13, ACL-14, ACL-15, ACL-16, ACL-17, ACL-18, ACL-19, ACL-20, ACL-21, ACL-22, ACL-23, ACL-24, ACL-25, ACL-26, ACL-27, API-11, API-21, API-27, API-29, API-37, API-39, BKP-15, CLI-05, CLI-06, CLI-12, CLI-16, CLI-20, OBS-03, OBS-19, SRCH-17, UI-16, UI-18, UI-24 |
| 0012 | [Удаление: корзина с ограниченным сроком, автоматическая очистка и purge по запросу субъекта](adr/0012-deletion-trash-and-purge.md) | 49 | API-07, API-22, API-23, API-24, API-34, API-41, BKP-07, BKP-12, BKP-14, BKP-16, CLI-08, CLI-09, CLI-19, CON-14, CON-15, CON-16, CON-17, IMP-17, IMP-18, OBS-17, OBS-21, OBS-22, PRV-01, PRV-03, PRV-04, PRV-05, PRV-06, PRV-07, PRV-08, PRV-09, PRV-10, PRV-12, PRV-13, PRV-14, PRV-15, PRV-18, PRV-19, PRV-20, PRV-21, PRV-22, PRV-23, PRV-24, SRCH-15, STO-28, STO-29, STO-30, STO-37, UI-11, UI-12 |
| 0013 | [Бэкап из MVCC-снимка, восстановление и проверка целостности](adr/0013-backup-from-snapshot.md) | 29 | ACL-27, API-41, BKP-01, BKP-02, BKP-03, BKP-04, BKP-05, BKP-06, BKP-07, BKP-08, BKP-10, BKP-12, BKP-13, BKP-14, BKP-15, BKP-16, BKP-17, CLI-04, CLI-07, OBS-11, OBS-21, PERF-18, PRV-09, PRV-10, PRV-11, PRV-17, PRV-19, STO-32, STO-38 |
| 0014 | [Платформы: Linux — tier 1, Windows и macOS — tier 2](adr/0014-platforms.md) | 7 | BLD-09, BLD-18, BLD-22, PRV-17, STO-14, STO-15, STO-20 |
| 0015 | [Тестирование надёжности: детерминированная симуляция, внедрение сбоев, перебор состояний, модельные тесты, фаззинг, LazyFS](adr/0015-reliability-testing.md) | 24 | BKP-08, BKP-09, BKP-10, BLD-03, BLD-12, BLD-13, BLD-14, BLD-15, BLD-16, BLD-17, BLD-18, BLD-19, BLD-21, BLD-22, BLD-25, BLD-26, BLD-27, BLD-28, CLI-07, PERF-13, PERF-15, PERF-16, PERF-17, PRV-06 |
| 0016 | [Технология веб-UI: чистый TypeScript и нативные Web Components, ассеты в бинарнике, строгая CSP, i18n ru/en](adr/0016-web-ui-technology.md) | 31 | ACL-11, ACL-14, ACL-19, API-29, BLD-10, UI-01, UI-02, UI-03, UI-04, UI-05, UI-06, UI-07, UI-08, UI-09, UI-10, UI-11, UI-12, UI-13, UI-14, UI-15, UI-16, UI-17, UI-18, UI-19, UI-20, UI-21, UI-22, UI-23, UI-24, UI-25, UI-26 |
| 0017 | [Runtime, потоки и конфигурация: один бинарник `budb`, async HTTP + синхронный движок, TOML](adr/0017-runtime-threads-and-configuration.md) | 31 | ACL-12, ACL-17, ACL-18, ACL-23, API-18, API-19, API-20, BLD-10, BLD-28, CLI-01, CLI-02, CLI-03, CLI-04, CLI-11, CLI-13, CLI-14, CLI-15, CLI-18, CLI-20, CLI-21, CLI-22, IMP-06, OBS-10, PERF-09, PERF-14, PHN-07, PRV-03, SRCH-16, STO-08, STO-13, STO-21 |
| 0018 | [Изоляция `unsafe` в крейте `budb-sys`](adr/0018-unsafe-isolation-budb-sys.md) | 3 | BLD-07, BLD-20, STO-15 |

## 7. Прочие проверки

| Проверка | Результат |
|---|---|
| Повторяющиеся ID требований | нет |
| Требования без сценариев | нет |
| Требования, не упомянутые ни в одной задаче tasks.md | нет |
| Требования без ADR в строке «Трассировка» | нет |
| Ссылки на CUJ, которых нет в docs/cuj.md | нет |
| Ссылки на ADR, которых нет в docs/adr/ | нет |
| ADR, на которые не ссылается ни одно требование | 0001 (Запись решений и процесс: OpenSpec + Elephant/Goldfish + LLM-expert review + Fact Grounding) |
