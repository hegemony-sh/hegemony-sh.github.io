import { defineConfig } from "vitepress";

const siteTitle = "Hegemony";
const browserTitle = "Hegemony.sh";
const githubRepoUrl = "https://github.com/hegemony-sh/Hegemony";
const descriptionEn =
  "A proof-of-execution platform for deterministic, long-running infrastructure workflows on Temporal.";
const descriptionCs =
  "Platforma proof-of-execution pro deterministická, dlouhotrvající infrastrukturní workflow postavená na Temporal.";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: browserTitle,
  titleTemplate: ":title - Hegemony.sh",
  description: descriptionEn,
  lang: "en-US",
  cleanUrls: true,
  appearance: "dark",

  head: [
    ["link", { rel: "icon", href: "/favicon.ico", sizes: "any" }],
    ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/brand/favicon-32.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/brand/favicon-16.png" }],
    ["link", { rel: "apple-touch-icon", href: "/brand/apple-touch-icon.png" }],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
    ["meta", { name: "theme-color", content: "#131313" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: browserTitle }],
    ["meta", { property: "og:description", content: descriptionEn }],
    ["meta", { property: "og:url", content: "https://hegemony.sh/" }],
    ["meta", { property: "og:image", content: "https://hegemony.sh/brand/logo-stacked@2x.png" }],
  ],

  themeConfig: {
    logo: "/brand/favicon-48.png",
    siteTitle,
    socialLinks: [{ icon: "github", link: githubRepoUrl, ariaLabel: "GitHub" }],

    search: {
      provider: "local",
      options: {
        locales: {
          cs: {
            translations: {
              button: {
                buttonText: "Hledat",
                buttonAriaLabel: "Otevřít vyhledávání",
              },
              modal: {
                displayDetails: "Zobrazit podrobný seznam",
                resetButtonTitle: "Vymazat hledání",
                backButtonTitle: "Zavřít vyhledávání",
                noResultsText: "Nenalezeny žádné výsledky pro",
                footer: {
                  selectText: "pro výběr",
                  selectKeyAriaLabel: "Enter",
                  navigateText: "pro pohyb",
                  navigateUpKeyAriaLabel: "šipka nahoru",
                  navigateDownKeyAriaLabel: "šipka dolů",
                  closeText: "pro zavření",
                  closeKeyAriaLabel: "Escape",
                },
              },
            },
          },
        },
      },
    },
  },

  locales: {
    root: {
      label: "English",
      lang: "en-US",
      title: browserTitle,
      description: descriptionEn,
      themeConfig: {
        nav: [
          { text: "Home", link: "/" },
          { text: "Docs", link: "/docs/" },
        ],
        sidebar: {
          "/docs/": [
            {
              text: "Getting Started",
              items: [{ text: "Introduction", link: "/docs/" }],
            },
          ],
        },
        langMenuLabel: "Languages",
        footer: {
          message:
            'Released as open source under the AGPL-3.0-or-later license. Development is sponsored by <a href="https://rexonix.cz/" target="_blank" rel="noreferrer">Rexonix s.r.o.</a>. Commercial licensing is available — <a href="mailto:contact@hegemony.sh">contact@hegemony.sh</a>.',
          copyright: "Copyright © 2025–2026 Jakub Trávník",
        },
      },
    },
    cs: {
      label: "Čeština",
      lang: "cs-CZ",
      link: "/cs/",
      title: browserTitle,
      description: descriptionCs,
      themeConfig: {
        nav: [
          { text: "Úvod", link: "/cs/" },
          { text: "Dokumentace", link: "/cs/docs/" },
        ],
        sidebar: {
          "/cs/docs/": [
            {
              text: "První kroky",
              items: [{ text: "Úvod", link: "/cs/docs/" }],
            },
          ],
        },
        langMenuLabel: "Jazyky",
        footer: {
          message:
            'Open source projekt pod licencí AGPL-3.0-or-later. Vývoj projektu finančně podporuje <a href="https://rexonix.cz/" target="_blank" rel="noreferrer">Rexonix s.r.o.</a>. K dispozici je i komerční licence — <a href="mailto:contact@hegemony.sh">contact@hegemony.sh</a>.',
          copyright: "Copyright © 2025–2026 Jakub Trávník",
        },
      },
    },
  },
});
