# BUDB — спецификация базы данных имён и телефонов

BUDB («Best Undefined DataBase») — спецификация v1 базы данных имён и телефонов, написанной с нуля на Rust: веб-интерфейс, HTTP API и Admin CLI, поиск имён по телефону и телефонов по имени, надёжное хранение до 10^8 контактов на одном узле. Кода нет: результат работы — спецификация OpenSpec (`add-phonebook-db-v1`), 18 ADR, 10 CUJ, 121 решение и четыре раунда ревью. Все решения принял оркестратор как прокси заказчика; человек в процессе не участвовал.

- [REPORT.md](REPORT.md) — итоговый отчёт: что сделано, как применены пять принципов, реестр решений, результаты ревью.
- [docs/assignment.md](docs/assignment.md) — текст задания.
- [openspec/changes/add-phonebook-db-v1/proposal.md](openspec/changes/add-phonebook-db-v1/proposal.md) — предложение: вводные, критерии «хорошей БД», границы v1.
- [openspec/changes/add-phonebook-db-v1/design.md](openspec/changes/add-phonebook-db-v1/design.md) — техническое решение и сводка решений D-001…D-121.
- [docs/](docs/) — решения (`orchestrator-decisions.md`), ADR (`adr/`), CUJ (`cuj.md`), исследования (`research/`), журнал ревью (`reviews/GOLDFISH.md`), трассировка (`traceability.md`).

Проверка:
```
npx --yes @fission-ai/openspec@1.15.0 validate add-phonebook-db-v1 --strict
node scripts/traceability.mjs --check
```
