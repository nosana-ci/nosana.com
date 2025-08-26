<template>
  <div class="is-flex is-align-items-center">
    <a
      v-for="social in socials"
      :key="social.icon"
      :href="social.link"
      target="_blank"
      class="mr-5"
      @click="trackLinkClick('homepage_social_click', 'primary')"
    >
      <img v-if="dark" :src="social.icon">
      <img v-else :src="social.iconLight">
    </a>
  </div>
</template>

<script>
export default {
  props: {
    dark: Boolean
  },
  data () {
    return {
      socials: [
        {
          link: 'https://twitter.com/nosana_ai',
          icon: require('@/assets/img/icons/x.svg'),
          iconLight: require('@/assets/img/icons/x-light.svg')
        },
        {
          link: 'https://t.me/NosanaCompute',
          icon: require('@/assets/img/icons/telegram.svg'),
          iconLight: require('@/assets/img/icons/telegram-light.svg')
        },
        {
          link: 'https://github.com/nosana-ci',
          icon: require('@/assets/img/icons/github.svg'),
          iconLight: require('@/assets/img/icons/github-light.svg')
        },
        {
          link: 'https://discord.gg/nosana-ai',
          icon: require('@/assets/img/icons/discord.svg'),
          iconLight: require('@/assets/img/icons/discord-light.svg')
        },
        {
          link: 'https://nosana.medium.com/',
          icon: require('@/assets/img/icons/medium.svg'),
          iconLight: require('@/assets/img/icons/medium-light.svg')
        },
        {
          link: 'https://www.linkedin.com/company/nosana',
          icon: require('@/assets/img/icons/linkedin.svg'),
          iconLight: require('@/assets/img/icons/linkedin-light.svg')
        },
        {
          link: 'https://www.youtube.com/@NosanaAI',
          icon: require('@/assets/img/icons/youtube.svg'),
          iconLight: require('@/assets/img/icons/youtube-light.svg')
        }
      ]
    };
  },
  methods: {
    trackLinkClick (eventLabel, eventCategory = 'primary', eventValue = 1) {
      console.log('trackLinkClick', eventLabel, eventCategory, eventValue, window.gtag);
      if (window.gtag) {
        window.gtag('event', eventLabel, {
          event_category: eventCategory,
          event_label: eventLabel,
          value: eventValue
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  color: white !important;
  &.dark {
    color: black !important;
  }
  img {
    width: 24px;
  }
}
</style>
