---
layout: home
title: Deterministické workflow pro infrastrukturu

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
    details: Workflow definujete v YAML a skládáte je do fork/join grafů s rozšiřitelnými handlery — bez ručního psaní orchestrace.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>'
    title: Deterministické běhy
    details: Spolehlivé, obnovitelné a odolné běhy na Temporal. I dlouhotrvající operace přežijí restart a navážou přesně tam, kde skončily.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>'
    title: Přehled v reálném čase
    details: Pomocí Server-Sent Events se do rozhraní přenáší průběh krok za krokem a vše doplňuje trvalá auditní stopa pro dohledatelnost i ladění.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>'
    title: Spouštějte cokoli v kontejnerech
    details: Libovolné nástroje můžete spouštět v izolovaných kontejnerech pomocí kroků container.run — s připojenými přílohami workflow, bez psaní vlastních handlerů.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>'
    title: Rozšiřitelný inventář
    details: Cílová zařízení můžete brát z lokálního inventáře i z externích systémů, jako je NetBox, pomocí rozšiřitelných zdrojů inventáře.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>'
    title: Workflow v Gitu
    details: Definice workflow můžete verzovat v Git repozitářích — jednotlivá workflow i jejich přílohy lze pushovat, pullovat nebo průběžně synchronizovat.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>'
    title: Import a export konfigurace
    details: Konfiguraci platformy lze importovat i exportovat jako YAML a podle plánu zálohovat do Gitu.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/></svg>'
    title: Monitoring konektivity
    details: Na pozadí můžete spouštět sondy dostupnosti a konektivity nad rolemi zařízení i adresami; výsledky se ukládají jako časové řady a zobrazují v živých tabulkách a grafech.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>'
    title: Keycloak SSO a RBAC
    details: Podnikové přihlášení přes Keycloak OIDC a centralizované řízení přístupu podle rolí (admin, editor, operator, auditor, viewer, approver). Editoři workflow vytvářejí, operátoři je spouštějí.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>'
    title: Správa hesel a citlivých údajů
    details: Podpora různých trezorů pro hesla a citlivé údaje, s přibaleným OpenBao. Do databáze se ukládají jen odkazy — samotné hodnoty se do ní nikdy nezapisují.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>'
    title: Notifikace a webhooky
    details: Událostmi řízené notifikace a webhooky propojí Hegemony s vašimi stávajícími nástroji pro alerting i automatizaci.
---

<div class="showcase-section">
  <p class="showcase-eyebrow">Ukázka z dema</p>
  <p class="showcase-title">Jeden běh od žádosti po důkaz</p>
  <p class="showcase-lead">Tyto obrazovky pocházejí z demo laboratoře: fiktivní operátor v ní mění své routery pomocí Hegemony.</p>
  <figure class="shot shot--hero"><a href="/screenshots/run-live.webp" target="_blank" rel="noopener"><img src="/screenshots/run-live.webp" alt="Běh servisního okna čekající na schválení, s grafem a živým výstupem z routerů" width="2400" height="1500" loading="lazy" decoding="async"></a><figcaption>Servisní okno na hraničních routerech v Delfách: provoz je odkloněný, dostupnost se sleduje a běh čeká na schválení, aby okno uzavřel. Vpravo je živý výstup z routerů.</figcaption></figure>
  <div class="showcase-rows">
    <div class="showcase-row"><div class="showcase-text"><h3>Navrhněte změnu</h3><p>Každá změna je workflow: důkazy před změnou, samotná změna, důkazy po ní a kontrola, že se povedla. Jakékoli selhání skončí na jednom jasném místě.</p></div><figure class="shot"><a href="/screenshots/flow-editor.webp" target="_blank" rel="noopener"><img src="/screenshots/flow-editor.webp" alt="Editor workflow s workflow Announce service prefix" width="2400" height="692" loading="lazy" decoding="async"></a></figure></div>
    <div class="showcase-row"><div class="showcase-text"><h3>Druhý pár očí</h3><p>Běh se zastaví, dokud ho schvalovatel neschválí. Operátoři změny spouštějí, schvalovatelé je schvalují a nikdo nedělá obojí.</p></div><figure class="shot"><a href="/screenshots/approvals.webp" target="_blank" rel="noopener"><img src="/screenshots/approvals.webp" alt="Seznam schválení se dvěma čekajícími žádostmi" width="2400" height="710" loading="lazy" decoding="async"></a></figure></div>
    <div class="showcase-row"><div class="showcase-text"><h3>Důkaz o tom, co se změnilo</h3><p>Hegemony uchová konfiguraci každého routeru před změnou i po ní a ukáže přesně, co změna přidala.</p></div><figure class="shot"><a href="/screenshots/evidence-diff.webp" target="_blank" rel="noopener"><img src="/screenshots/evidence-diff.webp" alt="Konfigurace hraničního routeru před změnou a po ní, se dvěma přidanými řádky" width="2400" height="982" loading="lazy" decoding="async"></a></figure></div>
  </div>
</div>

<div class="demo-section" id="try-the-demo">
  <p class="demo-eyebrow">Vyzkoušejte demo</p>
  <div class="demo-card">

## Spusťte si celé demo lokálně

Jediný příkaz spustí platformu Hegemony na vašem počítači vedle malé
laboratoře: sítě fiktivního operátora se simulovanými routery a servery, Git
serverem a zachytávačem pošty. Operátor „Amphictyon Networks“ provozuje síť
pro městské státy starověkého Řecka a pět krátkých příběhů ukazuje, k čemu
Hegemony slouží: změny, které potřebují druhý pár očí, dlouhé běhy, které
přežijí restart, mnoho zákazníků na jedné platformě, OpenTofu se schvalováním
a zálohy přes Ansible do Gitu:

<!-- DOČASNÁ poznámka před spuštěním: tento odstavec smažte, až budou
repozitáře veřejné a INSTALLER_PUBLISH znovu zapnutý. -->
<p class="demo-note">Poznámka před spuštěním: instalátor zatím není
publikovaný a repozitáře jsou do veřejného spuštění soukromé, takže příkaz
níže zatím nefunguje. Zprovozníme ho při veřejném spuštění projektu.</p>

```sh
curl -fsSL https://hegemony.sh/install.sh | sh
```

Instalátor stáhne platformu a demo, zkontroluje výsledek a vypíše, kde se
přihlásit: Hegemony běží na `http://localhost:8080`. Budete potřebovat Linux
(nebo macOS s Docker Desktop, případně WSL 2 ve Windows), Docker s pluginem
Compose 2.24 nebo novějším, asi 8 GiB paměti pro Docker, 25 GiB volného
místa na disku, `git`, `curl` a `bash`; [go-task](https://taskfile.dev/) je volitelný. Příkazy pro správu a
průvodce demem najdete v repozitáři
[hegemony-sh/hegemony-demo](https://github.com/hegemony-sh/hegemony-demo).

<p class="demo-note">Demo vygeneruje na vašem počítači jedno heslo pro
všechny své uživatele. Je určené jen pro lokální vyzkoušení — stack nikdy
nevystavujte do sítě.</p>

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
        <a href="https://rexonix.cz/" target="_blank" rel="noreferrer">Rexonix s.r.o.</a>
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
