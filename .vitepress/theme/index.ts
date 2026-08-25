import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import LocalizedNotFound from "./components/LocalizedNotFound.vue";
import PreferredLanguageBanner from "./components/PreferredLanguageBanner.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(PreferredLanguageBanner),
      // Czech URLs into the English-only sections (platform/plugin docs,
      // API reference) explain themselves instead of a bare 404.
      "not-found": () => h(LocalizedNotFound),
    });
  },
} satisfies Theme;
