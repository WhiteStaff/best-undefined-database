---
status: accepted
date: 2026-10-24
decision-makers: Elephant (оркестратор, прокси заказчика по D-008)
consulted: агент-исследователь (docs/research/03-domain-api-ui-security.md)
informed: все агенты-исполнители (Goldfish)
---

# 0010. Стиль API: HTTP/JSON `/api/v1`, поиск через POST с телом, Admin CLI

## Status

Accepted, 2026-10-24. Решения D-013, D-017 (с учётом D-028: CUJ-04, CUJ-05; D-032: один бинарник).

## Context and Problem Statement

Интегратор встраивает BUDB в CRM или АТС через программный интерфейс (CUJ-05); администратору нужен скриптуемый инструмент для бэкапа, восстановления и управления доступом (CUJ-07, CUJ-10). Имя и телефон — персональные данные; URL попадают в логи прокси, access-логи и историю браузера (docs/research/03, §4.7, §6.2, [S42]).

Каким должен быть программный интерфейс BUDB, чтобы он был предсказуемым для интегратора и не раскрывал ПДн через URL?

## Decision Drivers

* ПДн не должны попадать в URL (D-013).
* Обнаружение конфликтов одновременного редактирования (CUJ-04).
* Интеграция «за час» по опубликованному контракту (CUJ-05).
* Скриптуемость администрирования без публичной библиотеки (D-017).

## Considered Options

1. **HTTP/JSON под `/api/v1`, поиск `POST /api/v1/contacts:search` с JSON в теле, Admin CLI в том же бинарнике** — выбрано.
2. **REST с поиском через GET и query-параметры** (`?phone=…`, `?name_prefix=…`) и маскированием в собственных логах.
3. **gRPC или GraphQL.**
4. **Публичная встраиваемая библиотека** вместо (или вместе с) HTTP API.

## Decision Outcome

Выбран вариант 1.

Решено в журнале:

* **ПДн не передаются в URL.** Поиск — `POST /api/v1/contacts:search` с JSON в теле; собственные логи маскируют телефоны и имена (D-013).
* **Admin CLI входит в v1**; встраиваемая библиотека — только внутренний слой, а не публичный контракт (D-017). CLI — подкоманда `admin` единого бинарника `budb` (D-032, ADR 0017).
* **Конфликты** обнаруживаются (CUJ-04, D-028); версия контакта — поле `version` (D-009).
* **Импорт и экспорт** — CSV (RFC 4180) и NDJSON (D-016).

`[ПРЕДЛОЖЕНИЕ АГЕНТА]` — рекомендации docs/research/03, §8.4, которые оркестратор явно не утверждал (вопрос к оркестратору):

* мажорная версия в пути `/api/v1` (Google AIP-185, docs/research/03, §4.1, [S28]);
* контракт в OpenAPI 3.1 (docs/research/03, §4.1, [S29]);
* ошибки в `application/problem+json` по RFC 9457, без стектрейсов (docs/research/03, §4.2, [S22], [S42]);
* `ETag: "<version>"`; изменяющие запросы без `If-Match` получают 428, при несовпадении версии — 412 (RFC 9110, RFC 6585; docs/research/03, §4.3, [S23], [S24]);
* курсорная пагинация с непрозрачным подписанным токеном (AIP-158, docs/research/03, §4.4, [S27]);
* `Idempotency-Key` для `POST` создания и импорта (черновик IETF -08, ещё не RFC; docs/research/03, §4.5, [S25]);
* 429 с `Retry-After` при превышении лимитов; 413 при слишком большом теле (docs/research/03, §4.6, [S24]); 503 при переполнении очередей движка (D-032, ADR 0017);
* асинхронный импорт: `202` и ресурс задачи со счётчиками и построчным отчётом (docs/research/03, §4.8);
* `/livez`, `/readyz`, `/metrics` в формате Prometheus text 0.0.4 (docs/research/03, §4.9, [S32], [S33]).

Обоснование D-013: URL попадают в логи прокси, access-логи и историю браузера (OWASP API; минимизация по 152-ФЗ). Обоснование D-017: для CUJ-07 и CUJ-10 нужен скриптуемый инструмент администратора; публичная библиотека удвоила бы поверхность API.

### Consequences

* Good, потому что номер и имя для поиска не оседают в логах прокси и истории браузера.
* Good, потому что один контракт (HTTP) обслуживает и UI, и интеграторов; UI не имеет «скрытого» API `[ДОПУЩЕНИЕ]`.
* Good, потому что CLI позволяет администрировать без публичной библиотеки и без второго контракта.
* Bad, потому что поиск через POST не кэшируется HTTP-кэшами и не является «безопасным» методом по семантике HTTP; идемпотентность поиска нужно описать явно `[ДОПУЩЕНИЕ]`.
* Bad, потому что путь `contacts:search` с двоеточием — соглашение Google AIP-136, которое исследование не подтвердило по первоисточнику (docs/research/03, §4.7, `[НЕ ПОДТВЕРЖДЕНО]`).
* Bad, потому что пока не утверждены пункты из списка `[ПРЕДЛОЖЕНИЕ АГЕНТА]`, спецификация `http-api` опирается на рекомендации исследования, а не на решения.

### Confirmation

* Контрактные тесты: 100 % ответов соответствуют опубликованной схеме (CUJ-05, docs/cuj.md).
* Тест логов: после серии поисков в access-логе и собственных логах нет ни одного номера и имени из запросов (маскирование, D-013).
* Тест: ни один эндпоинт API не принимает имя или телефон в пути или query (обход маршрутов в тесте) `[ПРЕДЛОЖЕНИЕ АГЕНТА]`.
* Тест конфликта: два параллельных изменения с одной версией → ровно одно успешно, второе получает отказ (CUJ-04).

## Pros and Cons of the Options

### HTTP/JSON + POST-поиск + Admin CLI

* Good: ПДн не в URL, один контракт, скриптуемое администрирование.
* Bad: POST-поиск не кэшируется.

### GET с query-параметрами

* Good: идиоматичный REST, кэшируемость (docs/research/03, §4.7).
* Bad: номер попадает в логи прокси (docs/research/03, «ВОПРОСЫ К ОРКЕСТРАТОРУ» п. 4); противоречит D-013.

### gRPC / GraphQL

* Good: строгая схема (gRPC), гибкие запросы (GraphQL).
* Bad: исследование выносит их за рамки (docs/research/03, §4.10); UI в браузере требует дополнительного слоя `[ДОПУЩЕНИЕ]`.

### Публичная библиотека

* Good: максимальная скорость для встраивания.
* Bad: удваивает поверхность API; многопроцессный доступ и блокировки файлов (docs/research/03, §4.10); противоречит D-017.

## More Information

* RFC 9457 — https://www.rfc-editor.org/rfc/rfc9457.html ; RFC 9110 — https://www.rfc-editor.org/rfc/rfc9110.html ; RFC 6585 — https://www.rfc-editor.org/rfc/rfc6585.html (docs/research/03, §4.2, §4.3).
* Google AIP-158 — https://google.aip.dev/158 ; AIP-185 — https://google.aip.dev/185 (docs/research/03, §4.1, §4.4).
* IETF Idempotency-Key draft — https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/ (docs/research/03, §4.5).
* OWASP REST Security Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html ; OWASP API Top 10 — https://api-security.owasp.org/editions/2023/en/0x11-t10 (docs/research/03, §6.1, §6.2).
* RFC 4180 — https://www.rfc-editor.org/rfc/rfc4180.html ; NDJSON — https://github.com/ndjson/ndjson-spec (docs/research/03, §4.8).
* Prometheus exposition formats — https://prometheus.io/docs/instrumenting/exposition_formats/ ; Kubernetes health endpoints — https://kubernetes.io/docs/reference/using-api/health-checks/ (docs/research/03, §4.9).
* Связанные ADR: 0011 (аутентификация), 0012 (удаление), 0013 (бэкап), 0017 (бинарник и runtime).
