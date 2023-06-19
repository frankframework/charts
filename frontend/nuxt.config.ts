import { resolve } from "path";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // @ts-ignore
  modules: [
    '@nuxt/content',
    '@nuxthq/ui',
  ],
  content: {
    sources: {
      charts: {
        driver: 'github',
        prefix: '/charts',
        repo: 'ibissource/charts',
        branch: 'master',
        dir: 'charts'
      },
      index: {
        driver: 'github',
        prefix: '/charts',
        repo: 'ibissource/charts',
        branch: 'gh-pages',
        dir: ''
      },
    },
    ignores: [
      '/templates/'
    ],
    highlight: {
      theme: 'github-light'
    }
  },
  colorMode: {
    preference: 'light'
  }
})

