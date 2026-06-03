import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import PreferredLanguageBanner from './components/PreferredLanguageBanner.vue'
import './custom.css'

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			'layout-bottom': () => h(PreferredLanguageBanner),
		})
	},
} satisfies Theme
