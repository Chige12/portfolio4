require('dotenv').config()
const { CTF_SPACE_ID, CTF_CDA_ACCESS_TOKEN } = process.env

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'portfolio4',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      // https://t32k.me/mol/log/optimize-webfont-loading/
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      {
        rel: 'preload',
        as: 'style',
        href:
          'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Roboto:ital,wght@1,700&display=swap',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Roboto:ital,wght@1,700&display=swap',
        media: 'print',
        onload: 'this.media="all"',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['ress'],

  // ランタイム lint: https://typescript.nuxtjs.org/ja/guide/lint
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/**/*.{ts,js,vue}',
      },
    },
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://composition-api.nuxtjs.org/getting-started/setup
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/style-resources', '@nuxtjs/markdownit'],

  // https://github.com/nuxt-community/style-resources-module/
  styleResources: {
    scss: [
      '~/assets/style/variables.scss',
      '~/assets/style/z-index.scss',
      '~/assets/style/mixins.scss',
    ],
  },

  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行を<br/>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true, // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    // choose to suit your project | Nuxt Composition API
    interval: 2000,
  },

  // Environment: https://qiita.com/taai/items/cbc61b9b4a18aacad57e
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
  },
  privateRuntimeConfig: {
    ctflSpaceId: process.env.CTFL_SPACE_ID,
    ctflAccessToken: process.env.CTFL_ACCESS_TOKEN,
  },
  env: {
    CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN,
  },
}
