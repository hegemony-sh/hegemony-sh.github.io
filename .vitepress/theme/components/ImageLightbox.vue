<!--
SPDX-FileCopyrightText: 2025-2026 Rexonix s.r.o.
SPDX-FileContributor: Jakub Trávník <jakub.travnik@gmail.com>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<!--
  Opens a screenshot (a link inside a `.shot` figure, see index.md and
  features.md) in a popup over the page instead of following the link.

  One listener on the document handles every screenshot, so the pages keep
  plain HTML: without JavaScript the link still opens the full image. The
  popup is a native <dialog>, which brings Escape to close, a focus trap and
  the backdrop for free; a click outside the image closes it as well.
-->

<script setup lang="ts">
import { useRoute } from "vitepress";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const route = useRoute();
const dialog = ref<HTMLDialogElement | null>(null);
const src = ref("");
const alt = ref("");

const closeLabel = computed(() => (route.path.startsWith("/cs/") ? "Zavřít" : "Close"));

function onDocumentClick(event: MouseEvent) {
  // Let modified clicks (new tab, new window, download) do what they normally do.
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }
  const target = event.target;
  if (!(target instanceof Element)) return;
  const link = target.closest(".shot a[href]");
  if (!(link instanceof HTMLAnchorElement) || !dialog.value) return;

  event.preventDefault();
  src.value = link.href;
  alt.value = link.querySelector("img")?.getAttribute("alt") ?? "";
  dialog.value.showModal();
}

function close() {
  dialog.value?.close();
}

function onDialogClick(event: MouseEvent) {
  // The image and the close button stop here; a click anywhere else closes.
  if (event.target === dialog.value || event.target === event.currentTarget) close();
}

function onDialogClose() {
  src.value = "";
}

onMounted(() => document.addEventListener("click", onDocumentClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocumentClick));
</script>

<template>
  <dialog
    ref="dialog"
    class="image-lightbox"
    :aria-label="alt || undefined"
    @click="onDialogClick"
    @close="onDialogClose"
  >
    <button type="button" class="image-lightbox__close" :aria-label="closeLabel" @click="close">
      ×
    </button>
    <img v-if="src" class="image-lightbox__image" :src="src" :alt="alt" @click.stop />
  </dialog>
</template>

<style scoped>
.image-lightbox {
  margin: auto;
  border: 0;
  padding: 0;
  max-width: 96vw;
  max-height: 94vh;
  overflow: visible;
  background: transparent;
}

.image-lightbox::backdrop {
  background: rgb(0, 0, 0, 0.82);
}

.image-lightbox__image {
  display: block;
  max-width: 96vw;
  max-height: 94vh;
  width: auto;
  height: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: zoom-out;
}

.image-lightbox__close {
  position: fixed;
  top: 12px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgb(0, 0, 0, 0.6);
  color: #fff;
  font-size: 28px;
  line-height: 40px;
}

.image-lightbox__close:hover,
.image-lightbox__close:focus-visible {
  background: var(--vp-c-brand-1);
  color: #0b1120;
}
</style>
