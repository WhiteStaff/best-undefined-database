---
status: accepted
date: 2026-10-24
decision-makers: Elephant (оркестратор, прокси заказчика по D-008)
consulted: агент-исследователь (docs/research/02-storage-engine-and-language.md)
informed: все агенты-исполнители (Goldfish)
---

# 0002. Язык реализации: Rust

## Status

Accepted, 2026-10-24. Решение D-020.

## Context and Problem Statement

Входное условие ДЗ: БД написана с нуля. Движок хранения работает со страницами, контрольными суммами и fsync на трёх ОС (Linux, Windows, macOS — ADR 0014), а SLO измеряются в единицах миллисекунд (D-024). Ошибки работы с памятью в таком коде ведут к порче данных и уязвимостям.

На каком языке писать движок, HTTP-сервер и CLI, чтобы получить безопасность памяти, контроль раскладки страниц и I/O и предсказуемые хвосты задержек?

## Decision Drivers

* Безопасность памяти: около 70 % уязвимостей, исправляемых Microsoft с CVE, и около 70 % серьёзных уязвимостей Chromium связаны с безопасностью памяти (docs/research/02, §5.1, [S39], [S40]); CISA/NSA рекомендуют языки с безопасностью памяти (docs/research/02, §5.1, [S41], [S42]).
* Предсказуемые хвосты задержек при SLO p99 ≤ 2 мс на тёплом кэше (D-024).
* Полный контроль раскладки страниц и явный `pread`/`pwrite` (mmap не используется, ADR 0004).
* Кроссплатформенный fsync «из коробки»: `F_FULLFSYNC` на Apple, `FlushFileBuffers` на Windows (docs/research/02, §5.1, [S19]).
* Зрелые инструменты property-тестов и фаззинга (ADR 0015).

## Considered Options

1. **Rust** (stable) — выбрано.
2. **Go** — рассмотренный запасной вариант.
3. **C++**.
4. **Zig**.
5. **Java/Kotlin** и **C#**.

## Decision Outcome

Выбран Rust: stable, закреплённая MSRV ≥ 1.89, edition 2024. Во всех крейтах стоит `#![forbid(unsafe_code)]`; исключение возможно только через новый ADR (D-020).

Обоснование:

* безопасность памяти без GC (docs/research/02, §5.1, [S39]–[S41]);
* полный контроль раскладки страниц (docs/research/02, §5.1);
* std уже реализует fsync на трёх ОС: `F_FULLFSYNC` на Apple, `FlushFileBuffers` на Windows (docs/research/02, §3.2, §3.3, [S19]);
* блокировки файлов (`File::lock`/`try_lock`) стабильны с Rust 1.89 — отсюда нижняя граница MSRV (docs/research/02, §5.1, [S65]);
* есть прецедент той же архитектуры на Rust — redb, COW B+tree с MVCC (docs/research/02, §5.1, [S54], [S6]);
* `forbid(unsafe_code)` достижим, потому что mmap не используется (docs/research/02, §5.3).

Отклонены (D-020): C++ — нет безопасности памяти (не входит в списки MSL, docs/research/02, §5.1, [S41]); Zig — не выпустил 1.0 (docs/research/02, §5.1, [S55], вторичный источник); Java/C# — хвосты задержек из-за GC и меньше контроля над вводом-выводом. Go остаётся запасным вариантом: bbolt доказывает, что тот же дизайн на Go работает (docs/research/02, §5.3, [S3]).

### Consequences

* Good, потому что класс ошибок памяти исключён компилятором вне `unsafe`, а `unsafe` запрещён.
* Good, потому что нет пауз GC; большой кэш страниц не нагружает разметку кучи (docs/research/02, §5.1, оценка исследователя).
* Good, потому что property-тесты и фаззинг доступны: proptest, proptest-state-machine, cargo-fuzz (docs/research/02, §5.1, [S36], [S37]).
* Bad, потому что высокий порог входа (docs/research/02, §5.2, оценка исследователя).
* Bad, потому что асинхронный HTTP и синхронный движок нужно явно разделить (docs/research/02, §8 ADR-003); это решено в ADR 0017.
* Bad, потому что `forbid(unsafe_code)` запрещает собственные FFI-вызовы; всё системное должно идти через std или тонкие привязки из allowlist (`libc`, `windows-sys`, ADR 0006). Сами привязки содержат `unsafe` внутри себя, но это код сторонних крейтов, а не наших `[ДОПУЩЕНИЕ]`.

### Confirmation

* CI собирает проект на закреплённой MSRV (`rust-version` в манифесте ≥ 1.89) и на stable.
* CI проверяет, что каждый крейт рабочего пространства содержит `#![forbid(unsafe_code)]` (поиск по исходникам или lint `unsafe_code = "forbid"` на уровне workspace) `[ПРЕДЛОЖЕНИЕ АГЕНТА]`.
* Ревью: любое появление `unsafe` возможно только вместе с новым ADR.
* Требование-ограничение в capability `build-constraints` ссылается на этот ADR (D-007).

## Pros and Cons of the Options

### Rust

* Good: безопасность памяти без GC, std-fsync на трёх ОС (docs/research/02, §5.2).
* Bad: высокий порог входа.

### Go

* Good: низкий порог входа, stdlib для HTTP/JSON, нативный фаззинг с 1.18 (docs/research/02, §4, [S38]).
* Bad: GC с фазами stop-the-world и mark assist (docs/research/02, §5.1, [S43]); всплески задержек у Discord (docs/research/02, §5.1, [S45], случай Go до 1.12).

### C++

* Good: полный контроль, прецеденты ScyllaDB и RocksDB (docs/research/02, §5.1).
* Bad: нет безопасности памяти (docs/research/02, §5.1, [S41]); fsync на трёх ОС — вручную.

### Zig

* Good: контроль раскладки, прецедент TigerBeetle (docs/research/02, §5.1, [S32], [S50]).
* Bad: язык не выпустил 1.0 (docs/research/02, §5.1, [S55]).

### Java/Kotlin, C#

* Good: богатая экосистема; паузы Generational ZGC ≤ 1 мс (docs/research/02, §5.1, [S44]).
* Bad: меньше контроля над раскладкой и I/O; поддержка fsync каталогов и `F_FULLFSYNC` `[НЕ ПОДТВЕРЖДЕНО]` (docs/research/02, §5.2).

## More Information

* MSRC 2019 — https://msrc.microsoft.com/blog/2019/07/a-proactive-approach-to-more-secure-code/ ; Chromium memory safety — https://www.chromium.org/Home/chromium-security/memory-safety/ (docs/research/02, §5.1).
* CISA et al., «The Case for Memory Safe Roadmaps» — https://www.cisa.gov/case-memory-safe-roadmaps (docs/research/02, §5.1).
* Rust std `File` — https://doc.rust-lang.org/std/fs/struct.File.html ; исходники std fs — https://github.com/rust-lang/rust/blob/master/library/std/src/sys/fs/unix.rs (docs/research/02, §3.2, §5.1).
* A Guide to the Go GC — https://go.dev/doc/gc-guide ; Discord — https://discord.com/blog/why-discord-is-switching-from-go-to-rust (docs/research/02, §5.1).
* redb — https://github.com/cberner/redb (docs/research/02, §5.1).
* Связанные ADR: 0004 (без mmap), 0006 (зависимости), 0017 (runtime и потоки).
