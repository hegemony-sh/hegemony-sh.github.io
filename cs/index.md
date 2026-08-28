---
layout: home
title: Úvod

hero:
  name: Hegemony
  text: Deterministické workflow pro infrastrukturu
  tagline: Platforma proof-of-execution pro deterministickou automatizaci infrastruktury — postavená na Temporal a deklarativním Flow Enginu.
  image:
    src: /brand/logo-stacked.png
    alt: Hegemony
  actions:
    - theme: brand
      text: Začít
      link: /cs/docs/
    - theme: alt
      text: GitHub repozitář
      link: https://github.com/hegemony-sh/hegemony
    - theme: alt
      text: Vyzkoušet demo
      link: "#try-the-demo"

features:
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>'
    title: Deklarativní Flow Engine
    details: Workflow definujete v YAML nebo JSON a skládáte je do fork/join grafů s rozšiřitelnými handlery — bez ručního psaní orchestrace.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>'
    title: Deterministické běhy
    details: Spolehlivé, obnovitelné a odolné běhy na Temporal. I dlouhotrvající operace přežijí restart a navážou přesně tam, kde skončily.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>'
    title: Přehled v reálném čase
    details: Pomocí Server-Sent Events se do rozhraní přenáší průběh krok za krokem a vše doplňuje trvalá auditní stopa pro dohledatelnost i ladění.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>'
    title: Spouštějte cokoli v kontejnerech
    details: Libovolné nástroje můžete spouštět v izolovaných kontejnerech pomocí kroků run_container — s připojenými přílohami workflow i generovanou konfigurací, bez psaní vlastních handlerů.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>'
    title: Rozšiřitelný inventář
    details: Cílová zařízení můžete brát z lokálního inventáře i z externích systémů, jako jsou NetBox, pomocí rozšiřitelných zdrojů inventáře.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>'
    title: Workflow v Gitu
    details: Definice workflow můžete verzovat v Git repozitářích — jednotlivá workflow i jejich přílohy lze pushovat, pullovat nebo průběžně synchronizovat.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>'
    title: Import a export konfigurace
    details: Celou konfiguraci platformy lze importovat i exportovat jako YAML a celý stav synchronizovat nebo zálohovat do Gitu.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/></svg>'
    title: Monitoring konektivity
    details: Na pozadí můžete spouštět sondy dostupnosti a konektivity nad rolemi zařízení i adresami; výsledky se ukládají jako časové řady a zobrazují v živých tabulkách a grafech.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>'
    title: Keycloak SSO a RBAC
    details: Podnikové přihlášení přes Keycloak OIDC a centralizované řízení přístupu podle rolí (admin, operator, auditor, viewer, approver).
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>'
    title: Správa tajemství
    details: Podpora různých backendů pro správu tajemství včetně HashiCorp Vaultu. Do databáze se ukládají jen reference — samotné hodnoty tajemství se do ní nikdy nezapisují.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>'
    title: Notifikace a webhooky
    details: Událostmi řízené notifikace a webhooky propojí Hegemony s vašimi stávajícími nástroji pro alerting i automatizaci.
---

<div class="demo-section" id="try-the-demo">
  <p class="demo-eyebrow">Vyzkoušejte demo</p>
  <div class="demo-card">

## Spusťte si celé demo lokálně

Jediný příkaz spustí celý Hegemony stack s předpřipraveným demo scénářem —
inventářem, tajemstvími, časovými plány, webhooky a workflow fiktivního
operátora „Meridian Networks“, včetně samostatné virtuální laboratoře, která
vytvoří a zase odstraní datacentrum s několika OSPF routery:

<!-- DOČASNÁ poznámka před spuštěním: tento odstavec smažte, až budou
repozitáře veřejné a INSTALLER_PUBLISH znovu zapnutý. -->
<p class="demo-note">Poznámka před spuštěním: instalátor zatím není
publikovaný a repozitáře jsou do veřejného spuštění soukromé, takže příkaz
níže zatím nefunguje. Zprovozníme ho při veřejném spuštění projektu.</p>

```sh
curl -fsSL https://hegemony.sh/install.sh | sh
```

Instalátor naklonuje repozitáře platformy a demo dat a spustí vše (API,
worker, scheduler, UI, Temporal, Keycloak, Vault, MinIO) na
`http://localhost:8080`. Budete potřebovat `curl`, `git` (s přístupem k
repozitáři platformy), `docker` s pluginem Compose v2,
[go-task](https://taskfile.dev/) a přihlášení přes `docker login ghcr.io`.
Detaily a příkazy pro správu najdete v repozitáři
[hegemony-sh/hegemony-demo-data](https://github.com/hegemony-sh/hegemony-demo-data).

<p class="demo-note">Přihlašovací údaje dema jsou pevně dané výchozí hodnoty
určené jen pro lokální vyzkoušení — stack nikdy nevystavujte do sítě.</p>

  </div>
</div>

<div class="sponsor-section">
  <p class="sponsor-eyebrow">Open source projekt se sponzorovaným vývojem</p>
  <div class="sponsor-card">
    <div>
      <h2>Open source projekt. Vývoj podporuje Rexonix.</h2>
      <p>
        Hegemony je open source projekt pod licencí AGPL-3.0-or-later.
        Průběžný vývoj finančně podporuje
        <a href="https://rexonix.cz/" target="_blank" rel="noreferrer">Rexonix s.r.o.</a>.
      </p>
    </div>
    <a
      class="sponsor-logo"
      href="https://rexonix.cz/"
      target="_blank"
      rel="noreferrer"
      aria-label="Rexonix s.r.o."
    >
      <img src="/sponsors/rexonix-logo.png" alt="Logo Rexonix s.r.o." />
    </a>
  </div>
</div>
