// import colors from 'vuetify/es5/util/colors'

// batch version (v2)
const BAZAAR_CONTRACT_ADDRESS_LIST = {
  '0x13881': '0xa1111D70cc4731256077113bB8Ae81003760f590', // MUMBAI
  '0x89': '0xe1356B52078e11E6e3597Bfc5D5b538f2D6D68e6', // POLYGON
}
const BASE_URL = 'https://webazaar-meta-api.herokuapp.com/api/v1'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s Web3 Bazaar',
    title: 'Web3 Bazaar | P2P asset exchange for all assets on-chain',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'description',
        name: 'description',
        content:
          'The Web3 Bazaar is a Peer-to-Peer exchange for every asset on EVM compatible networks. Swap any NFT or ERC-20 token with someone you already agreed terms without needing to trust them.',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://drive.google.com/file/d/18jv0HC_G_QtiJaOLdCRFPvdkp2vla1vr/preview',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content:
          'The Web3 Bazaar is a Peer-to-Peer exchange for every asset on EVM compatible networks.',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Web3Bazaar',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'The Web3 Bazaar is a Peer-to-Peer exchange for every asset on EVM compatible networks.',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://drive.google.com/file/d/18jv0HC_G_QtiJaOLdCRFPvdkp2vla1vr/preview',
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content:
          'https://drive.google.com/file/d/18jv0HC_G_QtiJaOLdCRFPvdkp2vla1vr/preview',
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content:
          'The Web3 Bazaar is a Peer-to-Peer exchange for every asset on EVM compatible networks.',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content:
          'The Web3 Bazaar is a Peer-to-Peer exchange for every asset on EVM compatible networks.',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'The Web3 Bazaar is a Peer-to-Peer exchange for every asset on EVM compatible networks.',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content:
          'https://drive.google.com/file/d/18jv0HC_G_QtiJaOLdCRFPvdkp2vla1vr/preview',
      },
      {
        hid: 'twitter:image:src',
        name: 'twitter:image:src',
        content:
          'https://drive.google.com/file/d/18jv0HC_G_QtiJaOLdCRFPvdkp2vla1vr/preview',
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content:
          'The Web3 Bazaar is a Peer-to-Peer exchange for every asset on EVM compatible networks.',
      },
      {
        name: 'twitter:site',
        content: '@Web3Bazaar',
      },
      {
        name: 'twitter:creator',
        content: '@Web3Bazaar',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/fav.png' },
      {
        href: 'https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700',
        rel: 'stylesheet',
      },
    ],
    script: [
      // { src: '/script/jquery.min.js' },
      // { src: '/script/jquery.syotimer.min.js' },
      // { src: '/script/kute.min.js' },
      // { src: '/script/popper.min.js' },
      // { src: '/script/bootstrap.min.js' },
      // { src: '/script/animated.js' },
      // { src: '/script/plugins.js' },
      // { src: '/script/script.js' },
    ],
  },
  env: {
    dev: process.env.NODE_ENV !== 'production',
    BAZAAR_CONTRACT_ADDRESS_LIST,
    BASE_URL,
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/bootstrap.min.css',
    '@/assets/css/animate.css',
    // '@/assets/css/classy-nav.min.css',
    '@/assets/css/font-awesome.min.css',
    '@/assets/css/themify-icons.css',
    '@/assets/css/responsive.css',
    '@/assets/css/style.css',
    '@/assets/css/custom.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/filters.js' },
    { src: '~/plugins/debug.js', mode: 'client' },
    { src: '~/plugins/utils.js', mode: 'client' },
    // { src: '~/plugins/popper.min.js', mode: 'client' },
    // { src: '~/plugins/jquery.min.js', mode: 'client' },
    // { src: '~/plugins/bootstrap.min.js', mode: 'client' },
    // { src: '~/plugins/jquery.syotimer.min.js', mode: 'client' },
    // { src: '~/plugins/kute.min.js', mode: 'client' },
    // { src: '~/plugins/plugins.js', mode: 'client' },
    // { src: '~/plugins/script.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      '@nuxtjs/vuetify',
      {
        theme: { dark: true },
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  // vuetify: {
  //   customVariables: ['~/assets/variables.scss'],
  //   theme: {
  //     dark: true,
  //     themes: {
  //       dark: {
  //         primary: colors.blue.darken2,
  //         accent: colors.grey.darken3,
  //         secondary: colors.amber.darken3,
  //         info: colors.teal.lighten1,
  //         warning: colors.amber.base,
  //         error: colors.deepOrange.accent4,
  //         success: colors.green.accent3,
  //       },
  //     },
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },
  },
  ssr: false,
  target: 'static',
}
