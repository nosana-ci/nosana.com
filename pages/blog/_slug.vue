<template>
  <div>
    <section class="section">
      <div class="container mb-6">
        <article class="content blog">
          <div class="columns is-centered">
            <div class="column is-9">
              <p class="is-size-7 mt-3 mb-0">
                {{ formatDate(blog.createdAt) }} <span v-if="blog.author">{{ blog.author }}</span>
              </p>
              <h1 class="mb-5 mt-0 has-text-black">
                {{ blog.title }}
              </h1>
              <img
                class="has-radius-big header-image-blog"
                :src="blog.img"
                style="width: 100%; object-fit: cover;"
              >
              <div style="max-width: 900px; width: 100%; margin: 0 auto;">
                <h2 class="mb-5 has-text-black mt-6 description">
                  {{ blog.description }}{{ blog.extendedDescription }}
                </h2>
                <nuxt-content :document="blog" />
                <h3 class="mt-6 has-text-black">
                  Share on
                </h3>
                <div class="is-flex is-align-items-center">
                  <a target="_blank" class="share-link" :href="`https://twitter.com/intent/tweet?url=https://nosana.io${$route.fullPath}&text=${blog.title}`">
                    <img src="~/assets/img/icons/x.svg" style="height: 22px">
                  </a>
                  <a target="_blank" class="share-link" :href="`https://t.me/share/url?url=https://nosana.io${$route.fullPath}&text=${blog.title}`">
                    <img src="~/assets/img/icons/telegram.svg" class="ml-3" style="height: 22px">
                  </a>
                  <a
                    href="/rss.xml"
                    class="rss-link ml-4"
                    title="Subscribe to RSS Feed"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fas fa-rss" />
                    <span class="ml-1">RSS</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
    <Discover class="has-background-light" title="Catch Up on Nosana’s Recent News" :blogs="blogs" />
  </div>
</template>

<script>
import Prism from '~/plugins/prism';
export default {
  colorMode: 'light',
  async asyncData ({ $content, params }) {
    const blog = await $content('blog', params.slug).fetch();
    const blogs = await $content('blog')
      .only(['title', 'createdAt', 'description', 'img', 'slug', 'author', 'tags'])
      .sortBy('createdAt', 'desc')
      .where({ title: { $ne: blog.title } })
      .limit(3).fetch();
    return { blog, blogs };
  },
  head () {
    return {
      title: this.blog.title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.blog.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.blog.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://nosana.io' + this.blog.img
        },
        {
          name: 'twitter:card',
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:domain',
          hid: 'twitter:domain',
          property: 'twitter:domain',
          content: 'nosana.io'
        },
        {
          name: 'twitter:title',
          hid: 'twitter:title',
          property: 'twitter:title',
          content: this.blog.title
        },
        {
          name: 'twitter:description',
          hid: 'twitter:description',
          property: 'twitter:description',
          content: this.blog.description
        },
        {
          name: 'twitter:image',
          hid: 'twitter:image',
          property: 'twitter:image',
          content: 'https://nosana.io' + this.blog.img
        }

      ]
    };
  },
  mounted () {
    Prism.highlightAll();
  },
  methods: {
    scrollTo (id) {
      document.getElementById(id).scrollIntoView({
        behavior: 'smooth'
      });
    },
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    }
  }
};
</script>

<style lang="scss">
.share-link {
  transition: all .2s ease;
  &:hover {
    margin-top: -3px;
  }
}
.blog {
  a {
    color: #04DE00;
  }
  h1 {
    font-size: 46px;
    line-height: 56px;
    @media screen and (max-width: 1023px) {
      font-size: 30px;
      line-height: 40px;
    }
  }
  h2 {
    line-height: 40px;
  }
  h1,h2,h3,h4,h5,h6 {
    color: black;
    font-weight: 700;
  }
  .number {
    align-items: initial;
    display: inline;
    font-size: 1em;
    height: auto;
    margin-right: 0;
    min-width: initial;
    padding: 0;
    text-align: initial;
    vertical-align: initial;
    background-color: transparent;
    border-radius: initial;
    justify-content: initial;
  }
  .icon-link {
    width: auto;
    height: auto;
    &:after {
      content: "";
      position: absolute;
      left: -23px;
      padding-right: 8px;
      top: 0;
      display: block;
    }
  }
  *:hover > a > .icon-link:after {
    content: "#";
  }
}

// To enable line numbers in codeblocks:

// pre[class*="language-"].line-numbers {
//   position: relative;
//   padding-left: 3.3em;
//   counter-reset: linenumber;
// }

// pre[class*="language-"].line-numbers > code {
//   position: relative;
//   white-space: inherit;
// }

// .line-numbers .line-numbers-rows {
//   position: absolute;
//   pointer-events: none;
//   top: 0;
//   font-size: 100%;
//   left: -3.8em;
//   width: 3em; /* works for line-numbers below 1000 lines */
//   letter-spacing: -1px;
//   border-right: 1px solid #999;

//   -webkit-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
// }

// .line-numbers-rows > span {
//   display: block;
//   counter-increment: linenumber;
// }

// .line-numbers-rows > span:before {
//   content: counter(linenumber);
//   color: #999;
//   display: block;
//   padding-right: 0.8em;
//   text-align: right;
// }

div.code-toolbar {
  position: relative;
  >.toolbar {
    position: absolute;
    top: .3em;
    right: .2em;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
    .toolbar-item {
      display: inline-block;
    }
    a {
      cursor: pointer;
      color: #bbb;
      font-size: .8em;
      padding: 0 .5em;
      background: #f5f2f0;
      background: rgba(224, 224, 224, 0.2);
      box-shadow: 0 2px 0 0 rgba(0,0,0,0.2);
      border-radius: .5em;
      &:hover {
        color: inherit;
        text-decoration: none;
      }
      &:focus {
        color: inherit;
        text-decoration: none;
      }
    }
    button {
      background: none;
      border: 0;
      color: inherit;
      font: inherit;
      line-height: normal;
      overflow: visible;
      padding: 0;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      color: #bbb;
      font-size: .8em;
      padding: 0 .5em;
      background: #f5f2f0;
      background: rgba(224, 224, 224, 0.2);
      box-shadow: 0 2px 0 0 rgba(0,0,0,0.2);
      border-radius: .5em;
      &:hover {
        color: inherit;
        text-decoration: none;
      }
      &:focus {
        color: inherit;
        text-decoration: none;
      }
    }
    span {
      cursor: pointer;
      color: #bbb;
      font-size: .8em;
      padding: 0.2em .5em;
      display: block;
      &:hover {
        color: inherit;
        text-decoration: none;
      }
      &:focus {
        color: inherit;
        text-decoration: none;
      }
    }
  }
  &:hover {
    >.toolbar {
      opacity: 1;
    }
  }
}

@media screen and (max-width: 1023px) {
  .header-image-blog {
    height: auto !important;
    margin-bottom: 0;
  }
  .description {
    margin-top: 20px !important;
  }
}

.rss-link {
  color: #04DE00;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    color: #03C200;
    text-decoration: none;
  }

  i {
    color: #ff6600;
  }
}
</style>
