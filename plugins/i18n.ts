import { createI18n } from 'vue-i18n'
import ja from '../lang/ja'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'ja',
    messages: {
      ja,
    },
  })

  vueApp.use(i18n)
})
