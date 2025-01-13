// Return array of script for Google Analytics in production
function getGtags() {
  if (process.env.NODE_ENV === 'production') {
    return [{
      src: 'https://www.googletagmanager.com/gtag/js?id=G-HNDP62SH8M'
    }, {
      type:'text/javascript',
      innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-HNDP62SH8M');`
    }]
  } else {
    return [];
  }
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  generate: {
    fallback: true,
    async routes () {
      const { $content } = require('@nuxt/content');
      const files = await $content({ deep: true }).only(['path']).fetch();
      return files.map(file => file.path === '/index' ? '/' : file.path);
    }
  },
  // router: {
  //   base: '/frontend/'
  // },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Nosana',
    title: 'Nosana',
    htmlAttrs: {
      lang: 'en'
    },
    bodyAttrs: {
      class: 'has-navbar-fixed-top'

    },
    script: [].concat(getGtags()),
    __dangerouslyDisableSanitizers: ['script'],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Where AI Meets Decentralized Compute' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Nosana - Where AI Meets Decentralized Compute'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Nosana is your go-to marketplace for AI inference. Enjoy seamless access and scalability without long-term contracts or bottlenecks—just the compute power you need, when you need it.'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://nosana.io/img/screenshot-website.png'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    '@/assets/scss/global.scss'
  ],

  content: {
    markdown: {
      prism: {
        theme: false
      }
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/countdown.js', mode: 'client' },
    { src: '~/plugins/aos', mode: 'client' },
    { src: '~/plugins/carousel.js', mode: 'client' },
    { src: '~/plugins/calendly.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // '@nuxtjs/color-mode',
    '@nuxtjs/svg',
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        additionalData: '@import \'~assets/scss/variables.scss\';'
      }
    }
  }
};
