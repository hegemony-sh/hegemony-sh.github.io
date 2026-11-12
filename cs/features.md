---
layout: page
title: Funkce
description: Co Hegemony umí už dnes a kam směřuje.
---

<div class="features-page">

<p class="features-eyebrow">Funkce</p>

<h1>Vše, co riziková změna potřebuje, na jedné platformě</h1>

<p class="features-lead">Hegemony spouští dlouhé změny infrastruktury jako workflow: se schvalováním, se záznamem toho, co se provedlo na každém zařízení, a bez ztráty rozdělané práce při restartu.</p>

<p class="features-group">Tvorba workflow</p>

<div class="features-grid">
<FeatureCard icon="workflow" title="Vizuální editor">Workflow nakreslíte jako graf kroků, nebo ho upravíte jako YAML. Pracujete v konceptu, potvrdíte ho jako verzi a verze můžete porovnat.</FeatureCard>
<FeatureCard icon="git" title="Větvení, cykly a paralelní větve">V jednom workflow se můžete rozhodovat, opakovat kroky i větvit práci. Cykly běží postupně nebo paralelně.</FeatureCard>
<FeatureCard icon="copy" title="Opakované použití workflow">Jedno workflow spustíte jako krok jiného, takže běžné postupy stačí vytvořit jednou.</FeatureCard>
<FeatureCard icon="form" title="Formuláře pro spuštění">Navrhnete formulář, který operátor vyplní při spuštění běhu, včetně kontroly každého pole.</FeatureCard>
<FeatureCard icon="play" title="Tři způsoby spuštění">Běh spustíte ručně, podle plánu nebo z jiného systému příchozím webhookem.</FeatureCard>
<FeatureCard icon="filter" title="Limity běhů">Omezíte, kolik běhů jednoho workflow je aktivních současně a jak často smí začínat.</FeatureCard>
</div>

<p class="features-group">Spolehlivé provádění</p>

<div class="features-grid">
<FeatureCard icon="repeat" title="Běhy, které přežijí restart">Běhy se provádějí na Temporal. Po restartu pokračují a mohou čekat i několik dní na servisní okno nebo restart zařízení.</FeatureCard>
<FeatureCard icon="clock" title="Servisní okna">Běh spustíte a schválíte předem. Práci provede jen v servisním okně, které nastavíte.</FeatureCard>
<FeatureCard icon="check" title="Schvalování">Běh se zastaví, dokud ho člověk neschválí nebo nezamítne. Čekající žádosti jsou na jednom místě.</FeatureCard>
<FeatureCard icon="terminal" title="Hotové kroky">Příkazy přes SSH, příkazy na síťových zařízeních, Ansible, Terraform a OpenTofu, HTTP požadavky, NetBox a kontroly DNS, HTTP a TLS.</FeatureCard>
<FeatureCard icon="box" title="Libovolný nástroj v kontejneru">Jakýkoli nástroj spustíte v izolovaném kontejneru a omezíte, na které síťové adresy se smí připojit.</FeatureCard>
<FeatureCard icon="layers" title="Spravovaný stav Terraformu">Platforma ukládá, zamyká, verzuje a šifruje stav Terraformu a OpenTofu.</FeatureCard>
<FeatureCard icon="chart" title="Monitoring konektivity">Během změny sledujete zařízení na pozadí v živých tabulkách a grafech.</FeatureCard>
</div>

<p class="features-group">Přehled a důkazy</p>

<div class="features-grid">
<FeatureCard icon="activity" title="Živý průběh">Výstup každého kroku sledujete už během běhu.</FeatureCard>
<FeatureCard icon="file" title="Důkazy">Zůstává záznam toho, co se na kterém zařízení skutečně provedlo, i soubory, které krok vytvořil.</FeatureCard>
<FeatureCard icon="search" title="Auditní log">Záznam o tom, kdo co a kdy udělal, s možností filtrování.</FeatureCard>
</div>

<p class="features-group">Zabezpečení a přístup</p>

<div class="features-grid">
<FeatureCard icon="shield" title="Jednotné přihlášení a role">Přihlášení přes Keycloak. Šest rolí odděluje tvorbu, spouštění, schvalování a audit. Citlivé akce vyžadují nové přihlášení.</FeatureCard>
<FeatureCard icon="users" title="Organizace">Na jedné instalaci oddělíte více týmů nebo zákazníků. Každá organizace má vlastní workflow, zařízení a tajemství. Workflow lze mezi organizacemi kopírovat.</FeatureCard>
<FeatureCard icon="key" title="Tajemství zůstávají v úložišti tajemství">V databázi jsou jen reference. Použijete přibalené OpenBao, HashiCorp Vault nebo 1Password. Ve výstupu kroků jsou tajemství skrytá.</FeatureCard>
<FeatureCard icon="lock" title="Důvěryhodní hostitelé a certifikáty">Každá organizace si spravuje SSH klíče hostitelů a soukromé certifikační autority, kterým důvěřuje.</FeatureCard>
<FeatureCard icon="code" title="API tokeny">Tokeny umožní skriptům a dalším nástrojům volat API.</FeatureCard>
</div>

<p class="features-group">Inventář a integrace</p>

<div class="features-grid">
<FeatureCard icon="server" title="Inventář">Zařízení a lokality spravujete v Hegemony, nebo je načtete z NetBoxu či z Git repozitáře. Cílová zařízení vyberete ručně nebo dotazem.</FeatureCard>
<FeatureCard icon="download" title="Git">Workflow a jejich přílohy můžete mít v Git repozitářích, s podporou push a pull.</FeatureCard>
<FeatureCard icon="exchange" title="Import a export konfigurace">Konfiguraci platformy exportujete a importujete jako YAML a podle plánu zálohujete do Gitu.</FeatureCard>
<FeatureCard icon="bell" title="Notifikace">E-mail, Slack, Microsoft Teams, Webex, Discord, Telegram, Pushover a odchozí webhooky.</FeatureCard>
<FeatureCard icon="storage" title="Úložiště souborů">Velké soubory uložíte do úložiště kompatibilního s S3.</FeatureCard>
<FeatureCard icon="zap" title="Pluginy">Kroky, zdroje inventáře, notifikační kanály i úložiště tajemství jsou pluginy. Přidejte vlastní.</FeatureCard>
</div>

<h2 id="roadmap">Plány</h2>

<p class="features-note">Kam Hegemony směřuje. Tyto položky jsou v plánu, zatím nejsou hotové a seznam není harmonogram ani závazek.</p>

<p class="features-group">V plánu</p>

<div class="features-grid">
<FeatureCard planned icon="upload" title="Upgrade softwaru zařízení">Kroky, které nahrají obraz, nainstalují ho, ověří běžící verzi a při chybě se vrátí k předchozí.</FeatureCard>
<FeatureCard planned icon="server" title="Další platformy zařízení">Podpora dalších platforem síťových zařízení.</FeatureCard>
<FeatureCard planned icon="monitor" title="Počítače s Windows">Windows Remote Management (WinRM) jako vestavěný způsob spouštění příkazů na počítačích s Windows.</FeatureCard>
<FeatureCard planned icon="key" title="Krátkodobé přihlašovací údaje">Přihlašovací údaje vydané pro jeden běh, například krátkodobé SSH certifikáty a jednorázová hesla.</FeatureCard>
<FeatureCard planned icon="message" title="Schvalování z jiných nástrojů">Čekající běh schválíte nebo zamítnete ze ServiceNow, Jiry nebo chatu.</FeatureCard>
<FeatureCard planned icon="chart" title="Další kontroly">Kontrola SNMP a další kontroly konektivity, například TLS handshake, SSH banner a NETCONF.</FeatureCard>
</div>

</div>
