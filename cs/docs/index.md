# Dokumentace

Hegemony je platforma proof-of-execution pro deterministická,
dlouhotrvající infrastrukturní workflow postavená na
[Temporal](https://temporal.io/) a deklarativním Flow Enginu.

::: info Open source a sponzorovaný vývoj
Hegemony je open source projekt pod licencí `AGPL-3.0-or-later`. Průběžný vývoj
finančně podporuje [Rexonix s.r.o.](https://rexonix.cz/).
:::

::: tip Dokumentaci připravujeme
Kompletní dokumentaci průběžně doplňujeme. Zatím doporučujeme zdrojové kódy,
architektonické poznámky a průvodce funkcemi v
[repozitáři Hegemony](https://github.com/hegemony-sh/Hegemony).
:::

## Rychlý start

Nejrychlejší způsob, jak si Hegemony vyzkoušet, je stáhnout připravené image,
spustit celý stack a naimportovat ukázková data:

```bash
task compose:demo:up
```

Webové rozhraní pak poběží na `http://localhost:8080` — přihlaste se jako
`admin` / `hegemony`.

## Další zdroje

- [Architektura a návrh systému](https://github.com/hegemony-sh/Hegemony/blob/main/docs/architecture/overview.md)
- [Přehled funkcí](https://github.com/hegemony-sh/Hegemony/tree/main/docs/features)
- [Jak přispět](https://github.com/hegemony-sh/Hegemony/blob/main/CONTRIBUTING.md)
