<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { inBrowser, useRoute, withBase } from 'vitepress'

type PreferredLanguage = 'en' | 'cs'

const STORAGE_KEY = 'hegemony:preferred-language'
const route = useRoute()
const isVisible = ref(false)

const isEnglishHome = computed(() => route.path === '/' || route.path === '/index.html')

function getStoredPreference(): PreferredLanguage | null {
  if (!inBrowser) return null

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'en' || stored === 'cs' ? stored : null
  } catch {
    return null
  }
}

function setStoredPreference(language: PreferredLanguage) {
  if (!inBrowser) return

  try {
    window.localStorage.setItem(STORAGE_KEY, language)
  } catch {
    // Ignore storage failures and keep the site usable.
  }
}

function browserPrefersCzech() {
  if (!inBrowser) return false

  const languages = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language]

  return languages.some((language) => language?.toLowerCase().startsWith('cs'))
}

function evaluatePrompt() {
  if (!inBrowser) return

  if (!isEnglishHome.value) {
    isVisible.value = false
    return
  }

  const storedPreference = getStoredPreference()

  if (storedPreference === 'cs') {
    window.location.replace(withBase('/cs/'))
    return
  }

  if (storedPreference === 'en') {
    isVisible.value = false
    return
  }

  isVisible.value = browserPrefersCzech()
}

function switchToCzech() {
  setStoredPreference('cs')
  isVisible.value = false
  window.location.assign(withBase('/cs/'))
}

function stayInEnglish() {
  setStoredPreference('en')
  isVisible.value = false
}

function handleLanguageSwitcherClick(event: MouseEvent) {
  if (!inBrowser) return

  const target = event.target

  if (!(target instanceof Element)) return

  const link = target.closest('a[href]')

  if (!(link instanceof HTMLAnchorElement)) return
  if (!link.closest('.VPNavBarTranslations, .VPNavScreenTranslations')) return

  const pathname = new URL(link.href, window.location.origin).pathname

  if (pathname === '/cs' || pathname.startsWith('/cs/')) {
    setStoredPreference('cs')
    return
  }

  setStoredPreference('en')
}

onMounted(() => {
  evaluatePrompt()
  document.addEventListener('click', handleLanguageSwitcherClick)
})

onBeforeUnmount(() => {
  if (!inBrowser) return
  document.removeEventListener('click', handleLanguageSwitcherClick)
})

watch(
  () => route.path,
  () => {
    evaluatePrompt()
  },
)
</script>

<template>
  <Transition name="locale-prompt-fade">
    <aside v-if="isVisible" class="locale-prompt" aria-live="polite">
      <p class="locale-prompt__eyebrow">Čeština je k dispozici</p>
      <h2>Preferujete češtinu?</h2>
      <p>
        Váš prohlížeč ji má nastavenou jako preferovaný jazyk. Můžeme vás
        přepnout na českou verzi webu.
      </p>
      <div class="locale-prompt__actions">
        <button class="locale-prompt__primary" type="button" @click="switchToCzech">
          Přejít do češtiny
        </button>
        <button class="locale-prompt__secondary" type="button" @click="stayInEnglish">
          Zůstat v angličtině
        </button>
      </div>
    </aside>
  </Transition>
</template>
