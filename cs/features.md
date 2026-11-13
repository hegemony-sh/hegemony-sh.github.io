---
layout: page
title: Funkce
description: Co Hegemony umí už dnes a kam směřuje.
---

<div class="features-page">

<p class="features-eyebrow">Funkce</p>

<h1>Vše, co riziková změna potřebuje, na jedné platformě</h1>

<p class="features-lead">Hegemony spouští dlouhotrvající změny infrastruktury jako workflow: se schvalováním, se záznamem toho, co se na kterém zařízení provedlo, a bez ztráty rozdělané práce při restartu.</p>

<h2 class="features-group">Tvorba workflow</h2>

<figure class="shot shot--feature"><a href="/screenshots/run-form.webp" target="_blank" rel="noopener"><img src="/screenshots/run-form.webp" alt="Vyplněný formulář pro spuštění workflow Announce service prefix" width="2400" height="906" loading="lazy" decoding="async"></a></figure>

<div class="features-grid">
<FeatureCard icon="workflow" title="Vizuální editor">Workflow nakreslíte jako graf kroků, nebo ho upravíte přímo v YAML. Rozpracované změny ukládáte jako draft, commitem z nich vznikne nová verze a verze můžete porovnávat.</FeatureCard>
<FeatureCard icon="git" title="Podmínky, smyčky a paralelní větve">V jednom workflow větvíte podle podmínek, opakujete kroky a pouštíte práci paralelně. Smyčky mohou běžet postupně i paralelně.</FeatureCard>
<FeatureCard icon="copy" title="Opakované použití workflow">Jedno workflow spustíte jako krok jiného, takže běžné postupy vytvoříte jen jednou.</FeatureCard>
<FeatureCard icon="form" title="Formuláře pro spuštění">Navrhnete formulář, který operátor vyplní při spuštění, včetně validace každého pole.</FeatureCard>
<FeatureCard icon="play" title="Tři způsoby spuštění">Běh spustíte ručně, podle plánu, nebo z jiného systému přes příchozí webhook.</FeatureCard>
<FeatureCard icon="filter" title="Limity běhů">Omezíte, kolik běhů jednoho workflow může běžet současně a jak často se smí spouštět.</FeatureCard>
</div>

<h2 class="features-group">Spolehlivé provádění</h2>

<figure class="shot shot--feature"><a href="/screenshots/monitor.webp" target="_blank" rel="noopener"><img src="/screenshots/monitor.webp" alt="Živé grafy dostupnosti dvou hraničních routerů během servisního okna" width="2400" height="1500" loading="lazy" decoding="async"></a></figure>

<div class="features-grid">
<FeatureCard icon="repeat" title="Běhy, které přežijí restart">Workflow se provádí na Temporalu. Po restartu pokračuje tam, kde skončilo, a na servisní okno nebo reboot zařízení umí čekat i několik dní.</FeatureCard>
<FeatureCard icon="clock" title="Servisní okna">Běh spustíte a schválíte předem. Samotná práce proběhne až v servisním okně, které nastavíte.</FeatureCard>
<FeatureCard icon="check" title="Schvalování">Běh se zastaví, dokud ho někdo neschválí nebo nezamítne. Všechny čekající žádosti najdete na jednom místě.</FeatureCard>
<FeatureCard icon="terminal" title="Hotové kroky">SSH příkazy, příkazy na síťových zařízeních, Ansible, Terraform a OpenTofu, HTTP požadavky, NetBox a kontroly DNS, HTTP a TLS.</FeatureCard>
<FeatureCard icon="box" title="Libovolný nástroj v kontejneru">Jakýkoli nástroj spustíte v izolovaném kontejneru a určíte, na které síťové adresy se smí připojit.</FeatureCard>
<FeatureCard icon="layers" title="Spravovaný Terraform state">Platforma ukládá, zamyká, verzuje a šifruje state pro Terraform i OpenTofu.</FeatureCard>
<FeatureCard icon="chart" title="Monitoring konektivity">Během změny zařízení na pozadí monitorujete a výsledky vidíte živě v tabulkách a grafech.</FeatureCard>
</div>

<h2 class="features-group">Přehled a důkazy</h2>

<figure class="shot shot--feature"><a href="/screenshots/audit-log.webp" target="_blank" rel="noopener"><img src="/screenshots/audit-log.webp" alt="Auditní log se spuštěními běhů a schváleními" width="2400" height="1500" loading="lazy" decoding="async"></a></figure>

<div class="features-grid">
<FeatureCard icon="activity" title="Živý průběh">Výstup každého kroku sledujete už během běhu.</FeatureCard>
<FeatureCard icon="file" title="Důkazy">U každého zařízení zůstane záznam toho, co se na něm skutečně provedlo, včetně souborů, které krok vytvořil.</FeatureCard>
<FeatureCard icon="search" title="Auditní log">Záznam o tom, kdo co kdy udělal, s možností filtrování.</FeatureCard>
</div>

<h2 class="features-group">Zabezpečení a přístup</h2>

<figure class="shot shot--feature"><a href="/screenshots/organizations.webp" target="_blank" rel="noopener"><img src="/screenshots/organizations.webp" alt="Přepínač organizací se čtyřmi organizacemi" width="2400" height="938" loading="lazy" decoding="async"></a></figure>

<div class="features-grid">
<FeatureCard icon="shield" title="SSO a role">Přihlášení přes Keycloak. Šest rolí odděluje tvorbu, spouštění, schvalování a audit. Citlivé akce vyžadují nové přihlášení.</FeatureCard>
<FeatureCard icon="users" title="Organizace">Na jedné instalaci oddělíte více týmů nebo zákazníků. Každá organizace má vlastní workflow, zařízení a hesla. Workflow lze mezi organizacemi kopírovat.</FeatureCard>
<FeatureCard icon="key" title="Hesla a citlivé údaje v trezoru">V databázi jsou jen odkazy na ně. Použijete přibalený OpenBao, HashiCorp Vault nebo 1Password. Ve výstupu kroků jsou hesla i další citlivé údaje skryté.</FeatureCard>
<FeatureCard icon="lock" title="Důvěryhodné SSH klíče a certifikáty">Každá organizace si spravuje SSH klíče hostů a interní certifikační autority, kterým důvěřuje.</FeatureCard>
<FeatureCard icon="code" title="API tokeny">Tokeny, přes které skripty a další nástroje volají API.</FeatureCard>
</div>

<h2 class="features-group">Inventář a integrace</h2>

<figure class="shot shot--feature"><a href="/screenshots/inventory.webp" target="_blank" rel="noopener"><img src="/screenshots/inventory.webp" alt="Inventář zařízení z lokálního zdroje a z Gitu" width="2400" height="1062" loading="lazy" decoding="async"></a></figure>

<div class="features-grid">
<FeatureCard icon="server" title="Inventář">Zařízení a lokality spravujete přímo v Hegemony, nebo je načtete z NetBoxu či z Git repozitáře. Cílová zařízení vyberete ručně nebo dotazem.</FeatureCard>
<FeatureCard icon="download" title="Git">Workflow i jejich přílohy můžete mít v Git repozitářích a synchronizovat je přes push a pull.</FeatureCard>
<FeatureCard icon="exchange" title="Import a export konfigurace">Konfiguraci platformy exportujete a importujete jako YAML a podle plánu ji zálohujete do Gitu.</FeatureCard>
<FeatureCard icon="bell" title="Notifikace">E-mail, Slack, Microsoft Teams, Webex, Discord, Telegram, Pushover a odchozí webhooky.</FeatureCard>
<FeatureCard icon="storage" title="Úložiště souborů">Velké soubory uložíte do úložiště kompatibilního s S3.</FeatureCard>
<FeatureCard icon="zap" title="Pluginy">Kroky, zdroje inventáře, notifikační kanály i trezory pro hesla a citlivé údaje jsou pluginy. Můžete si přidat vlastní.</FeatureCard>
</div>

<h2 id="roadmap" class="features-heading">Roadmapa</h2>

<p class="features-note">Kam Hegemony směřuje. Tyto funkce plánujeme, zatím nejsou hotové a seznam není harmonogram ani závazek.</p>

<div class="features-grid">
<FeatureCard planned icon="upload" title="Upgrade softwaru zařízení">Kroky, které nahrají image, nainstalují ho, ověří běžící verzi a při chybě se vrátí k předchozí.</FeatureCard>
<FeatureCard planned icon="server" title="Další platformy">Podpora dalších platforem: síťových zařízení, serverů a dalších systémů.</FeatureCard>
<FeatureCard planned icon="monitor" title="Windows podpora">Vestavěná podpora WinRM (Windows Remote Management) pro spouštění příkazů na Windows zařízeních.</FeatureCard>
<FeatureCard planned icon="key" title="Krátkodobé přihlašovací údaje">Přihlašovací údaje vydané jen pro jeden běh, například krátkodobé SSH certifikáty a jednorázová hesla.</FeatureCard>
<FeatureCard planned icon="message" title="Schvalování z jiných nástrojů">Čekající běh schválíte nebo zamítnete přímo ze ServiceNow, Jiry nebo chatu.</FeatureCard>
<FeatureCard planned icon="chart" title="Další kontroly">Kontrola SNMP a další kontroly konektivity, například TLS handshake, SSH banner a NETCONF.</FeatureCard>
<FeatureCard planned icon="layers" title="Workery v oddělených síťových zónách">Kroky poběží na workerech v oddělené síťové zóně, třeba v DMZ. Worker se k platformě připojuje sám, takže platforma do zóny nepotřebuje žádné příchozí spojení.</FeatureCard>
<FeatureCard planned icon="storage" title="VM šablony pro vCenter">VM šablony pro VMware sestavíte ve workflow, uložíte v Hegemony a vCenter si je bude odebírat jako Content Library.</FeatureCard>
</div>

</div>
