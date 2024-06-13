// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  ssr: false,
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  eslint: {
    // options here
  },
  modules: ['@nuxt/eslint', 'nuxt-typed-router'],
});
