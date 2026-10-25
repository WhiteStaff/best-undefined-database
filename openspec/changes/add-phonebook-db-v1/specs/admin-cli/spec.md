# admin-cli

## Purpose
Интерфейс командной строки BUDB: один исполняемый файл `budb` с подкомандой `serve` для запуска сервера и группой `admin …` для пользователей и токенов, бэкапа, восстановления, проверки, уплотнения, purge, импорта, экспорта и состояния. Команды работают офлайн с файлом базы или онлайн через http-api (API); семантику операций задают backup-restore (BKP), storage-engine (STO), import-export (IMP) и data-privacy (PRV).

**Схема конфигурации `budb serve`** (нормативна через CLI-18; `[ПРЕДЛОЖЕНИЕ АГЕНТА: имена ключей; диапазоны, не заданные решением или требованием]`). Ключи плоские; переменная окружения — `BUDB_` и имя ключа в верхнем регистре, массивы в ней — через запятую.

| Ключ | Тип | По умолчанию | Допустимо | Переменная | Где задано |
|---|---|---|---|---|---|
| `db_path` | путь | нет, обязателен | — | `BUDB_DB_PATH` | STO |
| `listen` | адрес или массив адресов | `127.0.0.1:8080`, `[::1]:8080` | вне loopback — только с TLS | `BUDB_LISTEN` | ACL-18 |
| `tls_cert_file`, `tls_key_file` | путь | нет | оба или ни одного | `BUDB_TLS_CERT_FILE`, `BUDB_TLS_KEY_FILE` | ACL-17 |
| `tls_min_version` | строка | `1.2` | `1.2`, `1.3` | `BUDB_TLS_MIN_VERSION` | ACL-17; D-066 |
| `public_origin` | абсолютный URL без пути | при loopback-`listen`: `https://` при TLS, иначе `http://`, плюс первый адрес `listen`; вне loopback — нет, обязателен | схема `http` или `https` | `BUDB_PUBLIC_ORIGIN` | ACL-23; D-101 |
| `trusted_proxies` | массив IP или CIDR | пусто | — | `BUDB_TRUSTED_PROXIES` | ACL-23; D-101 |
| `default_region` | строка | `RU` | `RU`, `none` | `BUDB_DEFAULT_REGION` | PHN-07; D-052 |
| `trash_retention_days` | целое | 7 | 1…28 | `BUDB_TRASH_RETENTION_DAYS` | PRV-03; D-049, D-119 |
| `backup_dir` | путь | нет | — | `BUDB_BACKUP_DIR` | PRV-09, PRV-10; D-069 |
| `backup_retention_days` | целое | 30 | 1…180 | `BUDB_BACKUP_RETENTION_DAYS` | PRV-11; D-037 |
| `audit_retention_days` | целое | 365 | 30…3650, ≥ `backup_retention_days` | `BUDB_AUDIT_RETENTION_DAYS` | PRV-13, BKP-13 |
| `page_cache_mib` | целое | 512 | ≥ 16 | `BUDB_PAGE_CACHE_MIB` | PERF-09 |
| `interactive_snapshot_timeout_s` | целое | 30 | 1…300 | `BUDB_INTERACTIVE_SNAPSHOT_TIMEOUT_S` | STO-24 |
| `query_timeout_ms` | целое | 2000 | 100…30000 | `BUDB_QUERY_TIMEOUT_MS` | SRCH-16; D-078 |
| `writer_queue_capacity`, `reader_queue_capacity` | целое | 4096, 1024 | 1…1000000 | `BUDB_WRITER_QUEUE_CAPACITY`, `BUDB_READER_QUEUE_CAPACITY` | PERF-14 |
| `commit_batch_max_ops`, `commit_batch_wait_ms` | целое | 1000, 0 | 1…100000, 0…100 | `BUDB_COMMIT_BATCH_MAX_OPS`, `BUDB_COMMIT_BATCH_WAIT_MS` | STO-13; D-094 |
| `backup_interval_hours` | целое | 24 | 1…168 | `BUDB_BACKUP_INTERVAL_HOURS` | BKP-17; D-109 |
| `pinned_pages_max_percent` | целое | 25 | 1…90 | `BUDB_PINNED_PAGES_MAX_PERCENT` | D-093 |
| `min_free_space_mib` (мягкий порог) | целое | 1024 | ≥ `hard_free_space_mib` | `BUDB_MIN_FREE_SPACE_MIB` | STO-41; D-072, D-118 |
| `hard_free_space_mib` (жёсткий порог) | целое | 128 | ≥ 16 | `BUDB_HARD_FREE_SPACE_MIB` | STO-41; D-109, D-118 |
| `rate_limit_rps`, `rate_limit_burst` | целое | 50, 100 | 1…100000, ≥ `rate_limit_rps` | `BUDB_RATE_LIMIT_RPS`, `BUDB_RATE_LIMIT_BURST` | API-19; D-073 |
| `result_quota_per_hour` | целое | 10000 | 1…10^9 | `BUDB_RESULT_QUOTA_PER_HOUR` | ACL-25; D-083, D-118 |
| `login_attempts_per_ip_per_minute` | целое | 20 | 1…1000 | `BUDB_LOGIN_ATTEMPTS_PER_IP_PER_MINUTE` | ACL-15; D-104 |
| `session_idle_minutes`, `session_absolute_hours` | целое | 30, 8 | 15…30, 4…8 | `BUDB_SESSION_IDLE_MINUTES`, `BUDB_SESSION_ABSOLUTE_HOURS` | ACL-12; D-066 |
| `max_json_body_kib`, `max_import_mib` | целое | 64, 1024 | 1…1024, 1…4096 | `BUDB_MAX_JSON_BODY_KIB`, `BUDB_MAX_IMPORT_MIB` | API-18, IMP-12 |
| `log_level` | строка | `info` | `error`, `warn`, `info`, `debug` | `BUDB_LOG_LEVEL` | OBS-13 |

Срок T_purge = 24 ч, срок курсора и ключей идемпотентности (24 ч) и долговечность фиксации не настраиваются (STO-21).

## ADDED Requirements

### Requirement: CLI-01 Один исполняемый файл с подкомандами
Продукт SHALL поставляться одним исполняемым файлом `budb` с подкомандами `serve` и `admin <группа> <действие>`. Каждая команда MUST поддерживать `--help`; неизвестная команда или неверные аргументы дают код выхода 2 и подсказку в stderr.
Трассировка: CUJ-07, CUJ-10; ADR-0017; D-017, D-032

#### Scenario: Справка
- **WHEN** оператор выполняет `budb admin backup --help`
- **THEN** команда печатает описание аргументов и завершается с кодом 0

#### Scenario: Опечатка в команде
- **WHEN** оператор выполняет `budb admin bakcup`
- **THEN** команда завершается с кодом 2 и предлагает `backup`

### Requirement: CLI-02 Запуск сервера budb serve
`budb serve --config <файл>` SHALL запускать сервер с конфигурацией в TOML по схеме CLI-18, где любое значение MUST переопределяться переменной окружения с префиксом `BUDB_`. Неверная конфигурация, включая внешний адрес без TLS по access-control (ACL), MUST давать код выхода 2 до открытия базы.
Трассировка: CUJ-07, CUJ-08; ADR-0017; D-032, D-033, D-073

#### Scenario: Переопределение через окружение
- **WHEN** в файле задано `listen = "127.0.0.1:8080"`, а в окружении `BUDB_LISTEN=127.0.0.1:9090`
- **THEN** сервер слушает `127.0.0.1:9090`

#### Scenario: Неизвестный ключ
- **WHEN** конфигурация содержит неизвестный ключ `listne`
- **THEN** `budb serve` завершается с кодом 2 и называет ключ в сообщении

### Requirement: CLI-03 Офлайн- и онлайн-режим
Команды `budb admin` SHALL работать офлайн (`--db <путь>`) или онлайн через API (`--server <URL>`), ровно с одним из флагов. Онлайн-режим берёт токен из `BUDB_TOKEN` или `--token-file`; нужна роль операции по ACL-03. Офлайн-команды MUST писать события в тот же журнал аудита с субъектом `os:<uid>`, а при работающем с файлом сервере завершаться кодом 4.
Трассировка: CUJ-07, CUJ-10; ADR-0017; D-017, D-055, D-100

#### Scenario: Сервер работает
- **WHEN** выполняется `budb admin compact --db data.budb`, пока сервер открыл этот файл
- **THEN** команда завершается с кодом 4 и сообщением «база используется сервером»

#### Scenario: Оба флага
- **WHEN** указаны и `--db`, и `--server`
- **THEN** команда завершается с кодом 2

#### Scenario: Офлайн-команда в аудите
- **WHEN** пользователь ОС с uid 1001 выполняет `budb admin users disable --login anna --db data.budb --yes`
- **THEN** журнал аудита содержит событие отключения с субъектом `os:1001`

#### Scenario: Онлайн-импорт с токеном writer
- **WHEN** `budb admin import --server https://db:8443 …` выполняется с токеном роли writer
- **THEN** импорт запускается, а `budb admin export` с тем же токеном завершается с кодом 6

### Requirement: CLI-04 Команды, требующие остановленного сервера
Только офлайн при остановленном сервере SHALL выполняться `restore`, `compact`, `bootstrap` и `renormalize-phones`. Остальные команды (`users`, `tokens`, `backup`, `verify`, `purge`, `subject`, `import`, `export`, `status`, `recover`) MUST работать в обоих режимах, кроме `clock confirm` (только онлайн, CLI-22). Попытка онлайн-вызова офлайн-команды даёт код 2.
Трассировка: CUJ-07, CUJ-10; ADR-0013, ADR-0017; D-018, D-025, D-073, D-117, D-120

#### Scenario: Онлайн-restore
- **WHEN** выполняется `budb admin restore --server https://db:8443 …`
- **THEN** команда завершается с кодом 2 и объясняет, что нужен остановленный сервер и `--db`

#### Scenario: Онлайн-бэкап
- **WHEN** выполняется `budb admin backup --server https://db:8443`
- **THEN** бэкап создаётся без остановки сервера и пишется сервером в `backup_dir`

#### Scenario: Онлайн-бэкап с --out
- **WHEN** выполняется `budb admin backup --server https://db:8443 --out b1.budb-backup`
- **THEN** команда завершается с кодом 2: `--out` допустим только офлайн

#### Scenario: Онлайн-повторная нормализация
- **WHEN** выполняется `budb admin renormalize-phones --server https://db:8443`
- **THEN** команда завершается с кодом 2 и объясняет, что нужен остановленный сервер и `--db`

### Requirement: CLI-05 Управление пользователями
Группа `users` SHALL поддерживать `create --login --role`, `set-role`, `disable`, `enable`, `set-password`, `list` и `confirm` (CLI-20). Пароль MUST вводиться без отображения с терминала или читаться из stdin по `--password-stdin`. Понижение или отключение последнего активного admin MUST отклоняться. [ПРЕДЛОЖЕНИЕ АГЕНТА: защита последнего admin]
Трассировка: CUJ-10; ADR-0011; D-015

#### Scenario: Создание writer
- **WHEN** admin выполняет `budb admin users create --login anna --role writer --password-stdin`
- **THEN** пользователь создан, и команда завершается с кодом 0

#### Scenario: Последний admin
- **WHEN** выполняется `budb admin users set-role --login root --role reader` для единственного admin
- **THEN** команда завершается с кодом 1, и роль не меняется

### Requirement: CLI-06 Управление токенами
Группа `tokens` SHALL поддерживать `create --login [--ttl <дни>] [--scope full|metrics] [--rate-limit <rps>|unlimited] [--quota <контактов/ч>|unlimited]`, `list` и `revoke --id <token_id>`. `create` MUST печатать полный токен один раз в stdout; `list` — `token_id`, владельца, область, лимиты и сроки. Правила — по ACL. [ПРЕДЛОЖЕНИЕ АГЕНТА: флаги]
Трассировка: CUJ-05, CUJ-08, CUJ-10; ADR-0011; D-015, D-073, D-083, D-103

#### Scenario: Создание токена
- **WHEN** выполняется `budb admin tokens create --login anna --ttl 30`
- **THEN** stdout содержит токен вида `budb_…`, и код выхода 0

#### Scenario: Отзыв
- **WHEN** выполняется `budb admin tokens revoke --id 7k2m9q --yes`
- **THEN** следующий запрос с этим токеном получает 401

#### Scenario: Токен для Prometheus
- **WHEN** выполняется `budb admin tokens create --login monitoring --scope metrics`
- **THEN** созданный токен получает 200 на `GET /metrics` и 403 на `POST /api/v1/contacts:search`

#### Scenario: Токен бенчмарка
- **WHEN** выполняется `budb admin tokens create --login bench --rate-limit unlimited --quota unlimited`
- **THEN** запросы с этим токеном не получают 429 ни по частоте, ни по квоте

### Requirement: CLI-07 Бэкап, восстановление, проверка и уплотнение
`backup` (`--out` только офлайн), `restore --from --db`, `verify` и `compact` SHALL выполнять операции по BKP и STO и печатать итог (путь, размер, контрольная сумма, нарушения); `verify` при повреждении MUST давать код 3. `restore` принимает `--purge-journal <путь>`, `--accept-purge-gap` (PRV-10), `--as-admin <логин>` (ACL-27) и сообщает об отзыве токенов (ACL-10).
Трассировка: CUJ-07, CUJ-09; ADR-0013, ADR-0015; D-025, D-069, D-079, D-117, D-118, D-120
Источник: docs/research/03 §4.10

#### Scenario: Целая база
- **WHEN** `budb admin verify --db data.budb` выполняется на неповреждённом файле
- **THEN** команда завершается с кодом 0 и сообщает «нарушений нет»

#### Scenario: Повреждённая база
- **WHEN** в файле базы испорчен байт зафиксированных данных
- **THEN** `verify` завершается с кодом 3 и называет повреждённый участок

#### Scenario: Restore без актуального журнала purge
- **WHEN** `restore` выполняется на машине без каталога бэкапов и без `--purge-journal`
- **THEN** команда завершается с кодом 1, называет нужный файл `purge.journal` и не меняет базу

#### Scenario: Явный отказ от журнала
- **WHEN** тот же `restore` выполняется с `--accept-purge-gap --yes`
- **THEN** restore выполняется, а в журнал аудита пишется событие о принятом разрыве журнала purge

#### Scenario: Токены после restore
- **WHEN** restore завершился успешно
- **THEN** команда сообщает, что все API-токены отозваны и их нужно выпустить заново, а пользователи, кроме указанного в `--as-admin`, ждут `users confirm`

### Requirement: CLI-08 Purge из командной строки
`budb admin purge --id <id>` SHALL выполнять немедленную очистку по data-privacy (PRV) и печатать квитанцию с `purge_id`, `contact_id` и сроком физического затирания. Несколько идентификаторов MUST читаться из stdin по `--ids-stdin`. Имена и телефоны команда как аргументы не принимает.
Трассировка: CUJ-09; ADR-0012; D-012, D-013, D-057, D-084

#### Scenario: Очистка контакта
- **WHEN** выполняется `budb admin purge --id 1050 --yes`
- **THEN** команда печатает квитанцию и завершается с кодом 0

#### Scenario: Несуществующий id
- **WHEN** указан неизвестный `id`
- **THEN** команда завершается с кодом 1 и ничего не меняет

### Requirement: CLI-09 Поиск данных субъекта
`budb admin subject find` SHALL читать телефон или имя субъекта ПДн из stdin, а не из аргументов, и выводить все его записи по data-privacy (PRV), включая корзину, с их `id`. Вывод в режиме `--output json` MUST подходить как вход для `purge --ids-stdin` и `subject erase` (CLI-19).
Трассировка: CUJ-09; ADR-0012; D-013, D-102

#### Scenario: Поиск по телефону
- **WHEN** в stdin передаётся `+79161234567`
- **THEN** команда выводит все контакты с этим номером, включая удалённые в корзину

#### Scenario: ПДн не в истории оболочки
- **WHEN** оператор пытается передать телефон аргументом `--phone`
- **THEN** команда завершается с кодом 2 и предлагает передать значение через stdin

### Requirement: CLI-10 Импорт и экспорт
`budb admin import --format csv|ndjson [--dry-run] <файл>` и `budb admin export --format csv|ndjson --out <файл>` SHALL выполнять операции по import-export (IMP) и печатать счётчики. Файл экспорта MUST создаваться с правами доступа только для владельца. [ПРЕДЛОЖЕНИЕ АГЕНТА: права файла]
Трассировка: CUJ-06; ADR-0010; D-016

#### Scenario: Пробный импорт
- **WHEN** выполняется `budb admin import --format csv --dry-run people.csv`
- **THEN** команда печатает число принятых и отклонённых строк, а данные не меняются

#### Scenario: Экспорт
- **WHEN** выполняется `budb admin export --format ndjson --out all.ndjson`
- **THEN** создаётся файл, недоступный для чтения другим пользователям ОС

### Requirement: CLI-11 Состояние базы
`budb admin status` SHALL выводить число контактов, число в корзине, размер хранилища, режим работы (`read-write` или `degraded-read-only`), время последнего бэкапа и проверки, срок хранения корзины и версию продукта. При недоступном сервере в онлайн-режиме команда MUST завершаться кодом 5.
Трассировка: CUJ-08; ADR-0017; D-025, D-089

#### Scenario: Сервер доступен
- **WHEN** выполняется `budb admin status --server https://db:8443`
- **THEN** команда выводит число контактов и время последнего бэкапа

#### Scenario: Сервер недоступен
- **WHEN** сервер не отвечает
- **THEN** команда завершается с кодом 5

### Requirement: CLI-12 Первичная инициализация
`budb admin bootstrap --db <путь> --login <логин>` SHALL создавать первого admin на базе без администраторов; пароль MUST вводиться оператором с терминала или через `--password-stdin`, пароля по умолчанию нет. На базе, где admin уже есть, команда завершается кодом 1.
Трассировка: CUJ-10; ADR-0011; D-015

#### Scenario: Новая база
- **WHEN** выполняется `budb admin bootstrap --db data.budb --login root --password-stdin`
- **THEN** создаётся пользователь `root` с ролью admin

#### Scenario: Admin уже есть
- **WHEN** команда повторяется на той же базе
- **THEN** она завершается с кодом 1

### Requirement: CLI-13 Коды выхода
Команды SHALL использовать коды выхода: 0 — успех; 1 — ошибка выполнения; 2 — использование или конфигурация; 3 — нарушение целостности; 4 — база занята сервером; 5 — сервер недоступен; 6 — отказ в доступе; 7 — не подтверждено. `budb serve` при fail-stop завершается кодом 70. Коды MUST быть стабильны в v1. [ПРЕДЛОЖЕНИЕ АГЕНТА: значения]
Трассировка: CUJ-07, CUJ-08; ADR-0017; D-032, D-034

#### Scenario: Недостаточно прав
- **WHEN** онлайн-команда выполняется с токеном роли writer
- **THEN** команда завершается с кодом 6

#### Scenario: Успех
- **WHEN** `budb admin status` выполнена успешно
- **THEN** код выхода 0

#### Scenario: Fail-stop сервера
- **WHEN** у работающего `budb serve` сброс на диск завершается ошибкой
- **THEN** процесс завершается с кодом 70, и супервизор отличает это от обычной ошибки

### Requirement: CLI-14 Машиночитаемый вывод
По флагу `--output json` команда SHALL печатать в stdout ровно один JSON-документ с результатом, а при ошибке — объект с полями `type`, `title` и `exit_code` по типам ошибок API. Диагностика MUST идти только в stderr, без цветовых управляющих последовательностей в JSON.
Трассировка: CUJ-07, CUJ-08; ADR-0017; D-032

#### Scenario: JSON-результат
- **WHEN** выполняется `budb admin status --output json`
- **THEN** stdout разбирается как JSON и содержит поле `contacts_total`

#### Scenario: JSON-ошибка
- **WHEN** `budb admin verify --db x --output json` находит повреждение
- **THEN** stdout содержит объект с `exit_code` = 3

### Requirement: CLI-15 Подтверждение деструктивных операций
`restore` поверх существующей базы, `purge`, `subject erase`, `users disable`, `users set-role` с понижением и `tokens revoke` SHALL запрашивать подтверждение на терминале. Без терминала такие команды MUST выполняться только с `--yes`, а иначе завершаться кодом 7 без изменений.
Трассировка: CUJ-07, CUJ-09, CUJ-10; ADR-0017; D-012, D-057, D-102

#### Scenario: Скрипт без --yes
- **WHEN** `budb admin purge --id 1050` запущен без терминала и без `--yes`
- **THEN** команда завершается с кодом 7, и контакт не очищается

#### Scenario: Отказ на терминале
- **WHEN** оператор отвечает «нет» на вопрос подтверждения
- **THEN** команда завершается с кодом 7

### Requirement: CLI-16 Секреты и ПДн не в аргументах и выводе
CLI MUST NOT принимать пароли, токены, имена и телефоны как аргументы командной строки и MUST NOT печатать пароли и секреты токенов в логи и stderr. Токен выводится только командой `tokens create` и только в stdout.
Трассировка: CUJ-09, CUJ-10; ADR-0011; D-013, D-015

#### Scenario: Пароль аргументом
- **WHEN** оператор выполняет `budb admin users create --login a --password secret123`
- **THEN** команда завершается с кодом 2 и не создаёт пользователя

#### Scenario: Токен онлайн-режима
- **WHEN** онлайн-команда завершается ошибкой аутентификации
- **THEN** stderr не содержит значение `BUDB_TOKEN`

### Requirement: CLI-17 Повторная нормализация телефонов
`budb admin renormalize-phones [--dry-run]` SHALL выполнять повторную нормализацию по PHN-16 и печатать отчёт: число проверенных и изменённых телефонов и `id` контактов с ошибками, без значений ПДн. При `--dry-run` данные MUST NOT меняться. Если хотя бы один телефон дал ошибку, команда завершается кодом 1, применив остальные изменения. [ПРЕДЛОЖЕНИЕ АГЕНТА: код 1]
Трассировка: CUJ-06, CUJ-08; ADR-0008; D-073

#### Scenario: Смена правил
- **WHEN** после обновления правил нормализации выполняется `budb admin renormalize-phones --db data.budb`
- **THEN** изменённые телефоны пересчитаны из `raw_input`, `version` их контактов увеличена на 1, код выхода 0

#### Scenario: Пробный прогон
- **WHEN** выполняется `budb admin renormalize-phones --dry-run`
- **THEN** команда печатает, сколько телефонов изменится, и ничего не меняет

#### Scenario: Телефон с ошибкой
- **WHEN** один телефон по новым правилам невозможен
- **THEN** он остаётся прежним, `id` его контакта есть в отчёте, а код выхода 1

### Requirement: CLI-18 Схема конфигурации
Конфигурация `budb serve` SHALL состоять из плоских ключей таблицы «Схема конфигурации» (раздел Purpose) с указанными типами, значениями по умолчанию и диапазонами; каждый ключ MUST переопределяться переменной `BUDB_<КЛЮЧ>`. Неизвестный ключ, неверный тип или значение вне диапазона MUST давать код 2 до открытия базы с именем ключа в сообщении.
Трассировка: CUJ-07, CUJ-08; ADR-0017; D-033, D-073, D-101, D-118, D-119

#### Scenario: Значения по умолчанию
- **WHEN** `budb serve` запущен с конфигурацией, где задан только `db_path`
- **THEN** сервер слушает loopback без TLS, регион по умолчанию `RU`, срок корзины 7 дней

#### Scenario: Значение вне диапазона
- **WHEN** в конфигурации задано `trash_retention_days = 29`
- **THEN** `budb serve` завершается с кодом 2 и называет ключ `trash_retention_days`

#### Scenario: Внешний адрес без public_origin
- **WHEN** `listen` содержит `0.0.0.0:8443` с TLS, а `public_origin` не задан
- **THEN** `budb serve` завершается с кодом 2 и называет ключ `public_origin`

#### Scenario: Аудит живёт меньше бэкапов
- **WHEN** задано `audit_retention_days = 30`, `backup_retention_days = 180`
- **THEN** `budb serve` завершается с кодом 2 и называет ключ `audit_retention_days`

#### Scenario: Переменная окружения
- **WHEN** в файле `trash_retention_days = 7`, а в окружении `BUDB_TRASH_RETENTION_DAYS=14`
- **THEN** срок корзины равен 14 дням

#### Scenario: Ключ отключения долговечности
- **WHEN** конфигурация содержит `sync = false`
- **THEN** `budb serve` завершается с кодом 2, потому что такого ключа нет (STO-21)

### Requirement: CLI-19 Затирание данных субъекта из командной строки
`budb admin subject erase` SHALL читать из stdin JSON `{contact_ids, phones}`, например вывод `subject find --output json` после проверки оператором, и выполнять затирание по API-34 и PRV-18 с подтверждением по CLI-15. Команда печатает квитанции purge и `id` изменённых контактов; имена и телефоны MUST NOT выводиться.
Трассировка: CUJ-09; ADR-0012; D-013, D-102

#### Scenario: Запрос субъекта
- **WHEN** в stdin передаётся `{"contact_ids":["1050"],"phones":["+79161234567"]}` и указан `--yes`
- **THEN** контакт `1050` очищен, номер удалён из остальных контактов, а вывод содержит только `purge_id` и `id`

#### Scenario: Без подтверждения
- **WHEN** команда запущена без терминала и без `--yes`
- **THEN** она завершается с кодом 7, и данные не меняются

### Requirement: CLI-20 Подтверждение пользователей после restore
`budb admin users confirm <id>|--all` SHALL снимать пометку `review_required` (ACL-27) с одного пользователя или со всех помеченных; `<id>` совпадает с логином. Команда MUST работать офлайн с `--db`, чтобы подтвердить первого admin при остановленном сервере, и онлайн через API-39; результат пишется в аудит.
Трассировка: CUJ-07, CUJ-10; ADR-0011, ADR-0017; D-113, D-117, D-118

#### Scenario: Первый admin офлайн
- **WHEN** после restore без `--as-admin` выполняется `budb admin users confirm root --db data.budb`
- **THEN** команда завершается с кодом 0, и `root` входит с прежним паролем

#### Scenario: Подтверждение всех
- **WHEN** выполняется `budb admin users confirm --all --server https://db:8443`
- **THEN** пометка снята у всех пользователей, и команда печатает их число

#### Scenario: Неизвестный пользователь
- **WHEN** выполняется `budb admin users confirm nobody --db data.budb`
- **THEN** команда завершается с кодом 1, и ничего не меняется

### Requirement: CLI-21 Снятие degraded-read-only из командной строки
`budb admin recover --clear-degraded` SHALL запускать проверку целостности и снимать degraded-read-only из-за повреждения только при успешной проверке (STO-40). Онлайн команда вызывает API-40 и ждёт задачу; офлайн (`--db`) проверяет файл и удаляет файл-маркер повреждения. При нарушениях команда завершается кодом 3, режим остаётся.
Трассировка: CUJ-07, CUJ-08; ADR-0005, ADR-0017; D-089, D-117

#### Scenario: Успешное снятие
- **WHEN** сервер в режиме degraded-read-only из-за повреждения, и `budb admin recover --clear-degraded --server https://db:8443` находит базу целой
- **THEN** команда завершается с кодом 0, и `GET /readyz` показывает `status` = `ok`

#### Scenario: Нарушения остались
- **WHEN** проверка находит повреждённую страницу
- **THEN** команда завершается с кодом 3, режим сохраняется, а отчёт называет страницу без ПДн

#### Scenario: Офлайн-снятие маркера
- **WHEN** сервер остановлен, и выполняется `budb admin recover --clear-degraded --db data.budb` на целом файле
- **THEN** файл-маркер удалён, и следующий запуск сервера не входит в degraded-read-only

### Requirement: CLI-22 Подтверждение скачка часов из командной строки
`budb admin clock confirm` SHALL вызывать API-41, возобновляя автоочистку корзины и ротацию бэкапов после паузы по OBS-21. Команда работает только онлайн (`--server`); с `--db` она MUST завершаться кодом 2, потому что состояние паузы живёт в процессе сервера.
Трассировка: CUJ-07, CUJ-08, CUJ-09; ADR-0017; D-081, D-117

#### Scenario: Возобновление
- **WHEN** выполняется `budb admin clock confirm --server https://db:8443` при паузе из-за скачка часов
- **THEN** команда завершается с кодом 0, и признак паузы в метриках равен 0

#### Scenario: Офлайн-вызов
- **WHEN** выполняется `budb admin clock confirm --db data.budb`
- **THEN** команда завершается с кодом 2 и объясняет, что нужен работающий сервер
