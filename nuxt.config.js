// this example declares the function at the top of the nuxt.config.js file
const fs = require('fs').promises;
const path = require('path');

// Return array of script for Google Analytics in production
function getGtags () {
  if (process.env.NODE_ENV === 'production') {
    return [{
      src: 'https://www.googletagmanager.com/gtag/js?id=G-HNDP62SH8M'
    }, {
      type: 'text/javascript',
      innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-HNDP62SH8M');`
    }];
  } else {
    return [];
  }
}
let posts = [];
const constructFeedItem = async (post, dir, hostname) => {
  // note the path used here, we are using a dummy page with an empty layout in order to not send that data along with our other content
  const filePath = path.join(__dirname, `dist/rss/${post.slug}/index.html`);
  const content = await fs.readFile(filePath, 'utf8');
  const url = `${hostname}/${dir}/${post.slug}`;
  return {
    title: post.title,
    id: url,
    link: url,
    description: post.description,
    content
  };
};
const create = async (feed, args) => {
  const [filePath, ext] = args;
  const hostname = process.NODE_ENV === 'production' ? 'https://nosana.com' : 'http://localhost:3000';
  feed.options = {
    title: 'Nosana Blog',
    description: 'Articles about the Nosana GPU Network',
    link: `${hostname}/feed.${ext}`
  };
  const { $content } = require('@nuxt/content');
  if (posts === null || posts.length === 0) { posts = await $content(filePath).fetch(); }

  for (const post of posts) {
    const feedItem = await constructFeedItem(post, filePath, hostname);
    feed.addItem(feedItem);
  }
  return feed;
};

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
      { hid: 'description', name: 'description', content: 'Affordable GPU Rental for AI Inference at Scale' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Nosana - Affordable GPU Rental for AI Inference at Scale'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Nosana is your go-to marketplace for AI inference. Enjoy seamless access and scalability without long-term contracts or bottlenecks—just the compute power you need, when you need it.'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://nosana.io/img/screenshot-website.jpg'
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: 'Nosana - Affordable GPU Rental for AI Inference at Scale'
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: 'Nosana is your go-to marketplace for AI inference. Enjoy seamless access and scalability without long-term contracts or bottlenecks—just the compute power you need, when you need it.'
      },
      {
        hid: 'twitter:site',
        property: 'twitter:site',
        content: '@nosana_ai'
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: 'https://nosana.io/img/twitter-screenshot.jpg'
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
    '@nuxt/content',
    '@nuxtjs/feed'
  ],
  feed: [
    {
      path: '/feed.xml',
      create,
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
      data: ['blog', 'xml']
    }
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
