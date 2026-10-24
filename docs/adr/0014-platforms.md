---
status: accepted
date: 2026-10-24
decision-makers: Elephant (оркестратор, прокси заказчика по D-008)
consulted: агент-исследователь (docs/research/02-storage-engine-and-language.md)
informed: все агенты-исполнители (Goldfish)
---

# 0014. Платформы: Linux — tier 1, Windows и macOS — tier 2

## Status

Accepted, 2026-10-24. Решение D-023.

## Context and Problem Statement

Гарантии долговечности (ADR 0005) зависят от того, что ОС обещает про fsync, fsync каталога и атомарность rename. Эти обещания различаются: на Linux нужен явный fsync каталога (docs/research/02, §3.1, [S14]); на macOS `fsync()` не гарантирует запись с кэша накопителя, нужен `F_FULLFSYNC` (docs/research/02, §3.2, [S15], [S16]); на Windows официального документа о долговечности каталожной записи и rename исследование не нашло (docs/research/02, §3.3, `[НЕ ПОДТВЕРЖДЕНО]`).

На каких платформах BUDB даёт полные гарантии, а на каких — только поддержку с оговорками?

## Decision Drivers

* Честность гарантий: обещать только то, что подтверждено источниками и тестами.
* Возможность проверить гарантии в CI (crash-тесты, LazyFS работает на Linux через FUSE — docs/research/02, §4).
* Разработчики и пользователи работают на трёх ОС `[ДОПУЩЕНИЕ]`.

## Considered Options

1. **Linux x86_64/aarch64 — tier 1 (полные гарантии, crash-тесты в CI); Windows x86_64 и macOS aarch64 — tier 2 (поддерживаются, оговорки задокументированы)** — выбрано.
2. **Все три ОС с одинаковыми гарантиями.**
3. **Только Linux.**

## Decision Outcome

Выбран вариант 1 (D-023):

* **Tier 1 — Linux x86_64 и aarch64:** полные гарантии долговечности (ADR 0005), crash-тесты в CI (kill -9, LazyFS, перебор состояний — ADR 0015).
* **Tier 2 — Windows x86_64 и macOS aarch64:** поддерживаются, сборка и функциональные тесты; оговорки задокументированы.
  * На macOS долговечность опирается на `F_FULLFSYNC` (Rust std вызывает его в `sync_all`/`sync_data`, docs/research/02, §3.2, [S19]); он может быть медленным, и некоторые накопители его игнорируют (docs/research/02, §3.2, [S16]).
  * На Windows долговечность fsync каталога и rename не подтверждена (D-023; docs/research/02, §3.3). Rename используется только вне горячего пути — при уплотнении и бэкапе — с `MOVEFILE_WRITE_THROUGH`, и считается «best effort» (docs/research/02, §3.3, [S18b]).

Обоснование: в D-023 отдельно не указано; в тексте решения сказано, что на Windows долговечность fsync каталога и rename не подтверждена.

### Consequences

* Good, потому что заявления о долговечности проверены там, где их можно проверить (LazyFS — Linux).
* Good, потому что пользователи Windows и macOS могут работать с BUDB, зная оговорки.
* Bad, потому что на Windows после сбоя во время уплотнения или бэкапа возможно состояние, при котором rename не сохранился; нужна процедура проверки и повторения `[ДОПУЩЕНИЕ]`.
* Bad, потому что на macOS SLO записи (p99 ≤ 50 мс, D-024) может не выполняться из-за медленного `F_FULLFSYNC` (docs/research/02, §7.3); SLO проверяются только на эталонном стенде tier 1 `[ДОПУЩЕНИЕ]`.
* Bad, потому что CI нужен на трёх ОС, а crash-тесты — только на Linux.

### Confirmation

* CI: сборка и полный набор функциональных тестов на Linux x86_64/aarch64, Windows x86_64, macOS aarch64; crash-тесты и LazyFS — только на Linux (ADR 0015).
* Эксплуатационная документация содержит раздел оговорок для tier 2 (capability `storage-engine`, требование о документировании гарантий).
* Ревью: на горячем пути коммита нет rename (ADR 0005).

## Pros and Cons of the Options

### Linux tier 1, Windows/macOS tier 2

* Good: честные гарантии, поддержка трёх ОС.
* Bad: разный уровень гарантий.

### Одинаковые гарантии на трёх ОС

* Good: проще обещание.
* Bad: на Windows не подтверждено источником (docs/research/02, §3.3, `[НЕ ПОДТВЕРЖДЕНО]`); проверить в CI нечем.

### Только Linux

* Good: минимум оговорок.
* Bad: исключает пользователей Windows и macOS.

## More Information

* Linux fsync(2) — https://man7.org/linux/man-pages/man2/fsync.2.html (docs/research/02, §3.1).
* Apple fsync(2) — https://developer.apple.com/library/archive/documentation/System/Conceptual/ManPages_iPhoneOS/man2/fsync.2.html ; F_FULLFSYNC — https://developer.apple.com/forums/thread/776787 (docs/research/02, §3.2).
* FlushFileBuffers — https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-flushfilebuffers ; MoveFileEx atomicity — https://bugs.python.org/issue8828 ; MOVEFILE_WRITE_THROUGH — https://gitlab.haskell.org/ghc/ghc/-/merge_requests/1682 (docs/research/02, §3.3).
* LazyFS — https://www.vldb.org/pvldb/vol17/p3017-ramos.pdf (docs/research/02, §4).
* Связанные ADR: 0005 (протокол коммита), 0015 (тестирование).

## Изменения после ревью 2026-10-24

По D-005 принятый ADR не переписывается: текст выше оставлен как был, а решения, принятые после его написания и затрагивающие этот ADR, перечислены здесь (разбор ревью раунда 1 — `docs/reviews/GOLDFISH.md`, полный текст решений — `docs/orchestrator-decisions.md`). Этот раздел добавлен решением D-114: ADR 0003, 0006, 0013, 0014, 0015, 0016 и 0017 ранее были затронуты решениями только в деталях. При расхождении с текстом выше действует этот раздел.

* **Предложения редактора движка (D-109).** Порог свободного места 128 МиБ и файл-маркер повреждения применяются на всех платформах tier 1 и tier 2.
