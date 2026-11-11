---
description: Co Hegemony umí už dnes a co je v plánu, ale zatím není hotové.
aside: true
---

# Funkce a plány

Hegemony spouští dlouhé a rizikové změny infrastruktury jako workflow. Na této
stránce najdete, co umí už dnes a co je v plánu, ale zatím není hotové.

::: info Stav projektu
Hegemony je ověřené v laboratoři, zatím ne v produkčním provozu. Nejdřív si ho
vyzkoušejte v laboratoři.
:::

## Co Hegemony umí dnes

### Tvorba workflow

- **Vizuální editor.** Workflow nakreslíte jako graf kroků. Změny zůstávají
  v konceptu, dokud je nepotvrdíte, a každé potvrzení je verze, kterou lze
  porovnat s jinou.
- **Řízení průběhu.** Větvení, cykly (postupné i paralelní) a fork/join.
- **Opakované použití.** Jedno workflow může jako krok spustit jiné workflow.
- **Formuláře pro spuštění.** Navrhnete formulář, který operátor vyplní při
  spuštění běhu.
- **Spouštěče.** Běh spustíte ručně, podle plánu nebo příchozím webhookem
  (HTTP voláním z jiného systému).
- **Limity běhů.** Omezíte, kolik běhů jednoho workflow smí běžet současně a
  jak často.

### Spolehlivé provádění

- **Běhy, které přežijí restart.** Běhy se provádějí na
  [Temporal](https://temporal.io/), takže po restartu pokračují a mohou čekat
  i několik dní — na servisní okno, schválení nebo restart zařízení.
- **Schvalování.** Běh se může zastavit, dokud ho člověk neschválí nebo
  nezamítne. Čekající žádosti najdete ve schránce schvalování.
- **Kroky v kontejnerech.** Libovolný nástroj spustíte v izolovaném
  kontejneru. Můžete omezit, na které síťové adresy a porty se smí připojit.
- **Hotové kroky.** Příkazy přes SSH, příkazy na síťových zařízeních, Ansible
  playbooky, plan a apply pro Terraform a OpenTofu, HTTP požadavky, operace
  v NetBoxu a kontroly DNS, HTTP, TLS a dostupnosti.
- **Spravovaný stav Terraformu a OpenTofu.** Platforma stav ukládá, zamyká,
  verzuje a šifruje.

### Přehled a důkazy

- **Živý průběh.** Výstup každého kroku sledujete už během běhu.
- **Důkazy.** U každého kroku zůstává záznam toho, co se na kterém zařízení
  skutečně provedlo, včetně vytvořených souborů.
- **Auditní log.** Záznam o tom, kdo co udělal, s možností filtrování.
- **Monitoring konektivity.** Kontroly zařízení na pozadí během běhu, zobrazené
  v živých tabulkách a grafech.

### Inventář

- **Vestavěný inventář.** Zařízení a lokality spravované přímo v Hegemony.
- **Externí zdroje.** Zařízení a lokality lze načítat z NetBoxu nebo z Git
  repozitáře pomocí pluginů inventáře.

### Zabezpečení a přístup

- **Jednotné přihlášení.** Přihlášení přes Keycloak pomocí OpenID Connect
  (OIDC), standardního přihlašovacího protokolu.
- **Role.** Admin, editor, operator, approver, auditor a viewer.
  Administrátoři mohou změnit, jakou roli která akce vyžaduje.
- **Organizace.** Na jedné instalaci oddělíte více týmů nebo zákazníků. Každá
  organizace má vlastní workflow, zařízení, tajemství a členy.
- **Tajemství.** Hodnoty tajemství zůstávají v úložišti tajemství; v databázi
  jsou jen reference. OpenBao je k dispozici jako volitelná přibalená služba
  a pluginy připojí HashiCorp Vault a 1Password. Tajemství, která platforma
  pro krok načte, jsou v jeho výstupu skrytá.
- **Důvěryhodní hostitelé a certifikáty.** Každá organizace si spravuje SSH
  klíče hostitelů, kterým důvěřuje, a soukromé certifikační autority, kterým
  důvěřuje pro spojení přes TLS.
- **API tokeny.** Administrátoři vydávají tokeny, kterými skripty a další
  nástroje volají API.

### Integrace

- **Git.** Workflow a jejich přílohy můžete mít v Git repozitářích, s podporou
  push a pull.
- **Import a export konfigurace.** Konfiguraci platformy lze exportovat a
  importovat jako YAML a podle plánu ji exportovat do Gitu jako zálohu.
  Hodnoty tajemství, historie běhů a uložené soubory součástí nejsou.
- **Notifikace.** E-mail, Slack, Microsoft Teams, Webex, Discord, Telegram,
  Pushover a odchozí webhooky, odesílané při událostech běhů a schvalování.
- **Úložiště souborů.** Soubory pro workflow uložíte do úložiště kompatibilního
  s S3.
- **Pluginy.** Kroky, zdroje inventáře, notifikační kanály i úložiště tajemství
  jsou pluginy, takže můžete přidat vlastní.

## Plány

Tyto položky jsou v plánu, ale zatím nejsou hotové. Seznam není harmonogram
ani závazek. Úplný seznam je v souboru
[TODO.md](https://github.com/hegemony-sh/hegemony/blob/develop/TODO.md)
v repozitáři Hegemony (anglicky).

### Zařízení

- Kroky pro upgrade softwaru zařízení: nahrání obrazu, instalace, ověření
  běžící verze a návrat k předchozí verzi při chybě.
- Podpora dalších platforem síťových zařízení.
- WinRM (Windows Remote Management) pro spouštění příkazů na počítačích
  s Windows.
- Krátkodobé SSH certifikáty pro přestupní servery (jump hosty) a linuxové
  servery.

### Workflow

- Velmi dlouhé běhy, které si automaticky zkracují historii.
- Volba, co cyklus udělá, když jeden průchod selže: ukončí se, nebo pokračuje
  dalším průchodem.
- Méně omezení pro to, co může běžet uvnitř paralelních cyklů.

### Kontroly a monitoring

- Kontrolní krok pro SNMP (Simple Network Management Protocol).
- Další kontroly pro monitoring konektivity, například TLS handshake, SSH
  banner, odchylka NTP a NETCONF. Dnes monitoring kontroluje TCP, ping, HTTP
  a DNS.

### Tajemství a přístup

- Dynamická tajemství: přihlašovací údaje vydané pro jeden běh, například
  jednorázová SSH hesla pro linuxové servery a dočasní databázoví uživatelé.
- Samostatné úložiště tajemství pro každou organizaci.
- Pravidla přístupu podle vlastností zdrojů, nejen podle rolí.

### Propojení s dalšími systémy

- Schválení nebo zamítnutí čekajícího běhu příchozím webhookem z jiného
  systému, například ze ServiceNow, Jiry nebo chatu.
- Pravidla, která z dat příchozího webhooku vytvoří vstupy běhu, a validace
  těchto dat.
- Více možností, jak upravit text notifikací.
- Import a export konfigurace pro jednu organizaci.

### Provoz

- Limity počtu požadavků na webhooky, které platí napříč několika instancemi
  API.
- Kvóty a limity pro každou organizaci.
- Dokumentace ke stažení pro prostředí bez přístupu k internetu.
