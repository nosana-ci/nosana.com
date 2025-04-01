<template>
  <div id="app">
    <div class="banner has-background-secondary">
      <nuxt-link
        :to="{ name: 'blog-slug', params: { slug: 'nos_challenge' } }"
        class="has-text-black"
        style="text-decoration: underline;"
      >
        <p class="py-1" style="font-size: 14px;"><b>BUILDERS' CHALLENGE - Learn by building and get rewarded! 🚀</b>
        </p>
      </nuxt-link>
    </div>
    <nav-bar />
    <Nuxt />
    <nos-foot />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  components: {
    NavBar
  },
  head () {
    return {
      link: [
        {
          rel: 'canonical',
          href: 'https://nosana.com' + this.$route.path
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.banner {
  width: 100%;
  text-align: center;
  z-index: 100;
  position: fixed;
  top: 0;
}
html {
  min-height: 100vh;
  background-size: cover;
}
</style>
