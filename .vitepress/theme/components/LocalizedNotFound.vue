<!--
SPDX-FileCopyrightText: 2025-2026 Jakub Trávník <jakub.travnik@gmail.com>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<!--
  Replaces the default 404 page (the theme's not-found slot).

  The platform documentation, the plugin documentation, and the API
  reference are published in English only, but the language switcher offers
  Czech on every page - so a Czech reader can land on /cs/docs/platform/...
  which does not exist. Instead of a bare 404, tell them in Czech that the
  page exists only in English and hand them the link (the same path without
  the /cs prefix). Every other unknown path gets a normal 404, in the
  language of the URL the visitor asked for.
-->

<script setup lang="ts">
import { useRoute } from "vitepress";
import { computed } from "vue";

const route = useRoute();

const englishOnly = computed(() =>
  /^\/cs\/(docs\/(platform|plugins)(\/|$)|api(\/|$))/.test(route.path),
);
const englishPath = computed(() => route.path.replace(/^\/cs/, ""));
const isCzech = computed(() => route.path.startsWith("/cs/"));
</script>

<template>
  <div class="not-found">
    <template v-if="englishOnly">
      <p class="code">404</p>
      <h1 class="title">Tato stránka je k dispozici pouze v angličtině</h1>
      <div class="divider" />
      <p class="quote">
        Dokumentace platformy, dokumentace pluginů a API reference se publikují pouze anglicky.
      </p>
      <div class="actions">
        <a class="link primary" :href="englishPath">Otevřít anglickou verzi</a>
        <a class="link" href="/cs/docs/">Zpět na českou dokumentaci</a>
      </div>
    </template>
    <template v-else-if="isCzech">
      <p class="code">404</p>
      <h1 class="title">Stránka nenalezena</h1>
      <div class="divider" />
      <div class="actions">
        <a class="link primary" href="/cs/">Zpět na úvod</a>
      </div>
    </template>
    <template v-else>
      <p class="code">404</p>
      <h1 class="title">Page not found</h1>
      <div class="divider" />
      <div class="actions">
        <a class="link primary" href="/">Take me home</a>
      </div>
    </template>
  </div>
</template>

<style scoped>
.not-found {
  padding: 96px 24px;
  text-align: center;
}

.code {
  line-height: 64px;
  font-size: 64px;
  font-weight: 600;
}

.title {
  padding-top: 12px;
  letter-spacing: 2px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}

.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin: 0 auto;
  max-width: 512px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.actions {
  padding-top: 20px;
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.link {
  display: inline-block;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 16px;
  padding: 3px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition:
    border-color 0.25s,
    color 0.25s;
}

.link.primary {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

.link:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-2);
}

.link.primary:hover {
  background-color: var(--vp-c-brand-2);
  color: var(--vp-c-white);
}
</style>
