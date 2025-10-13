<template>
  <section class="section">
    <div class="container">
      <div class="filters mt-4 mb-0 is-flex is-justify-content-space-between">
        <div class="tags are-medium">
          <span
            :class="{'is-active': activeTag && activeTag.length === 0 }"
            class="tag mr-3 px-3 py-5"
            @click="activeTag = [], $router.replace({ query: { tag: activeTag } });"
          >All posts</span>
          <span
            v-for="tag in categories"
            :key="tag"
            class="is-capitalized tag mr-3 px-3 py-5"
            :class="{'is-active': activeTag && activeTag.find((c) => c === tag)}"
            @click="applyTag(tag)"
          >{{ tag }}</span>
        </div>
        <div class="is-flex is-align-items-center">
          <a
            href="/rss.xml"
            class="rss-link mr-4"
            title="Subscribe to RSS Feed"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fas fa-rss" />
            <span class="ml-1">RSS</span>
          </a>
          <div class="search">
            <input
              v-model="search"
              type="text"
              class="input py-5 px-3"
              placeholder="Search"
            >
          </div>
        </div>
      </div>
      <div v-if="blogs && blogs.length > 0" class="columns mt-5 mb-6 is-multiline">
        <client-only>
          <component
            :is="blog.noPage && blog.link ? 'a' : 'nuxt-link'"
            v-for="blog of blogs"
            :key="blog.slug"
            class="column is-one-third blog-item"
            :to="blog.noPage && blog.link ? undefined : { name: 'blog-slug', params: { slug: blog.slug } }"
            :href="blog.noPage && blog.link ? blog.link : undefined"
            :target="blog.noPage && blog.link ? '_blank' : undefined"
            :rel="blog.noPage && blog.link ? 'noopener noreferrer' : undefined"
          >
            <div
              class="py-4 post-wrapper"
              style="min-height: 432px"
            >
              <div class="blog-img has-radius-big">
                <img
                  :src="blog.thumbnail ? blog.thumbnail : blog.img"
                  style="height: 100%; width: 100%; object-fit: cover;"
                  class="blog-image"
                >
              </div>
              <p v-if="blog.author" class="has-text-black is-size-7">
                By {{ blog.author }}
              </p>
              <h3 class="title is-3 mt-2 mb-3">
                {{ blog.title }}
              </h3>
              <p class="is-size-5" style="color: #666">
                {{ blog.description }}
              </p>
            </div>
          </component>
        </client-only>
      </div>
      <div v-else-if="loadedPosts">
        <p class="px-5 my-6">
          No posts found
        </p>
      </div>
      <pagination
        v-if="blogs && blogs.length > 0 && Math.ceil(parseInt(totalArticles) / perPage) > 1"
        class="mt-5 mb-6"
        :total-pages="Math.ceil(parseInt(totalArticles) / perPage)"
        :per-page="perPage"
        :current-page="parseInt(currentPage)"
      />
    </div>
  </section>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
export default {
  components: { Pagination },
  data: () => ({
    search: null,
    blogs: [],
    perPage: 9,
    currentPage: 1,
    totalArticles: 0,
    activeTag: null,
    loadedPosts: false,
    categories: [
      'news', 'product', 'AI & ML', 'events'
    ]
  }),
  watch: {
    '$route.query': {
      handler () {
        this.fetchBlogs();
      },
      immediate: true
    },
    search: {
      handler: function (value) {
        this.$router.push({ path: this.$route.fullPath, query: { search: value } });
      }
    }
  },
  created () {
    // this.$router.replace({ query: null });
    let tag = this.$route.query && this.$route.query.tag ? this.$route.query.tag : null;
    if (tag && !Array.isArray(tag)) {
      tag = [tag];
    }
    this.activeTag = this.$route.query && tag
      ? tag
      : [];
    this.search = this.$route.query && this.$route.query.search ? this.$route.query.search : null;
  },
  colorMode: 'light',
  methods: {
    applyTag (tag) {
      if (!this.activeTag) { this.activeTag = []; }
      if (this.activeTag.find(c => c === tag)) {
        this.activeTag.splice(this.activeTag.indexOf(tag), 1);
      } else {
        this.activeTag.push(tag);
      }
      this.$router.replace({ query: { tag: this.activeTag } });
    },
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    },
    async fetchBlogs () {
      console.log('params in fetch', this.$route.query);
      this.currentPage = this.$route.query && this.$route.query.page ? parseInt(this.$route.query.page) : 1;
      const allArticles = await this.$content('blog').where({
        ...(this.$route.query && this.$route.query.tag && this.$route.query.tag.length > 0) &&
        { tags: { $containsAny: this.$route.query.tag } }
      }).search(this.$route.query.search).fetch();

      this.totalArticles = allArticles.length;
      const lastPage = Math.ceil(this.totalArticles / this.perPage);
      const lastPageCount = this.totalArticles % this.perPage === 0 ? this.perPage : this.totalArticles % this.perPage;
      const skipNumber = () => {
        if (this.currentPage === 1) {
          return 0;
        }
        if (this.currentPage === lastPage) {
          return this.totalArticles - lastPageCount;
        }
        return (this.currentPage - 1) * this.perPage;
      };

      const blogs = await this.$content('blog')
        .only(['title', 'createdAt', 'description', 'img', 'slug', 'author', 'tags', 'noPage', 'link', 'thumbnail'])
        .limit(this.perPage)
        .skip(skipNumber())
        .where({
          ...(this.$route.query && this.$route.query.tag && this.$route.query.tag.length > 0) &&
          { tags: { $containsAny: this.$route.query.tag } }
        })
        .sortBy('createdAt', 'desc')
        .search(this.$route.query.search)
        .fetch();
      this.blogs = blogs;
      this.loadedPosts = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.tags {
  .tag {
    background-color: #F9F9F9;
    box-sizing: border-box;
    color: #999999;
    cursor: pointer;
    &.is-active {
      color: black;
      box-shadow: inset 0 0 0 1px $text;
    }
  }
}
.filters {
  @media screen and (max-width: 1023px) {
    display: block !important;
  }
}

.search {
  input {
    border: none !important;
    color: #999999;
    background-color: #F9F9F9;
    outline-color: #999999;
    box-shadow: none;
    &::placeholder {
      color: #999999;
      opacity: 1; /* Firefox */
    }
  }
}
@media screen and (max-width: 1300px) {
  .post-wrapper {
    padding: 0 !important;
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
