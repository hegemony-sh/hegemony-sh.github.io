# Dokumentace

Hegemony je platforma proof-of-execution pro deterministická,
dlouhotrvající infrastrukturní workflow postavená na
[Temporal](https://temporal.io/) a deklarativním Flow Enginu.

::: info Open source a sponzorovaný vývoj
Hegemony je open source projekt pod licencí `AGPL-3.0-or-later`. Průběžný vývoj
finančně podporuje [Rexonix s.r.o.](https://rexonix.cz/).
:::

<script setup>
// Build-time flags injected by .vitepress/config.ts (vite define): the
// platform documentation, the API reference, and the plugin documentation
// exist only in builds where the sync scripts ran first, so the links below
// render only when their targets do.
const platformDocsSynced = __PLATFORM_DOCS_SYNCED__;
const apiReferenceSynced = __API_REFERENCE_SYNCED__;
const pluginDocsSynced = __PLUGIN_DOCS_SYNCED__;
</script>

<div v-if="platformDocsSynced || apiReferenceSynced || pluginDocsSynced">

::: tip Kam dál (dokumentace je v angličtině)
Kompletní dokumentace platformy se publikuje **pouze anglicky**.
<span v-if="platformDocsSynced">[Dokumentace platformy](/docs/platform/) pokrývá průvodce, funkce,
referenční příručky i architekturu.</span>
<span v-if="apiReferenceSynced">[API reference](/api/){target="_self"} zobrazuje OpenAPI kontrakt
platformy.</span>
<span v-if="pluginDocsSynced">[Dokumentace pluginů](/docs/plugins/) obsahuje stránky jednotlivých
handlerů přímo z repozitáře pluginů.</span>
:::

</div>

## Rychlý start

Nejrychlejší způsob, jak si Hegemony vyzkoušet, je stáhnout připravené image,
spustit celý stack a naimportovat ukázková data:

```bash
task compose:demo:up
```

Webové rozhraní pak poběží na `http://localhost:8080` — přihlaste se jako
`admin` / `hegemony`.

## Další zdroje

<div v-if="platformDocsSynced">

- [Architektura a návrh systému (anglicky)](/docs/platform/architecture/overview)
- [Přehled funkcí (anglicky)](/docs/platform/)

</div>

- [Repozitář Hegemony na GitHubu](https://github.com/hegemony-sh/Hegemony)
