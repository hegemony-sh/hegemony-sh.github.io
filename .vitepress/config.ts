import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Hegemony',
  description:
    'A proof-of-execution platform for deterministic, long-running infrastructure workflows on Temporal.',
  lang: 'en-US',
  cleanUrls: true,
  appearance: 'dark',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/brand/favicon-32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/brand/favicon-16.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/brand/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#131313' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Hegemony' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'A proof-of-execution platform for deterministic, long-running infrastructure workflows on Temporal.',
      },
    ],
    ['meta', { property: 'og:url', content: 'https://hegemony.sh/' }],
    ['meta', { property: 'og:image', content: 'https://hegemony.sh/brand/logo-stacked@2x.png' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/brand/favicon-48.png',
    siteTitle: 'Hegemony',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/' },
      {
        text: 'GitHub',
        link: 'https://github.com/hegemony-sh/Hegemony',
      },
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'Getting Started',
          items: [{ text: 'Introduction', link: '/docs/' }],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/hegemony-sh/Hegemony' }],

    footer: {
      message:
        'Released under the AGPL-3.0-or-later License. Commercial licensing available — <a href="mailto:contact@hegemony.sh">contact@hegemony.sh</a>.',
      copyright: 'Copyright © 2025–2026 Jakub Trávník',
    },

    search: {
      provider: 'local',
    },
  },
})
