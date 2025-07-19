<script>
export default {
  props: {
    count: {
      type: Number,
      default: 3
    }
  },
  data () {
    return {
      isMobile: false,
      mobileTweetIndex: 0,
      mobileInterval: null
    };
  },
  computed: {
    marquee1 () {
      return [
        {
          href: 'https://x.com/arbius_ai/status/1805637343283437728',
          img: require('@/assets/img/tweets/1.png'),
          title: 'Arbius',
          text: 'Nosana\'s GPU network will be leveraged to enhance Arbius miners, enabling them to address complex generative AI challenges.',
          meta: '@arbius_ai - 25 jun. 2024'
        },
        {
          href: 'https://x.com/ledger_top/status/1829186345820098753',
          img: require('@/assets/img/tweets/2.png'),
          title: 'Top Ledger',
          text: 'nosana_ai is one of the most cost-effective GPU grids, with zero lock-in. Developed and customized for AI inference workloads. The Nosana grid comprises approximately 2,000 nodes with various hardware configurations, actively running AI models.',
          meta: '@ledger_top - 29 aug. 2024'
        },
        {
          href: 'https://x.com/mangomarkets/status/1805613261154664838',
          img: require('@/assets/img/tweets/3.jpg'),
          title: 'Mango',
          text: 'Without a doubt, @nosana_ai is one of the most interesting & inspiring applications you can find in Crypto.',
          meta: '@mangomarkets - 25 jun. 2024'
        },
        {
          href: 'https://x.com/Shwetas_2710/status/1800413010403758368',
          img: require('@/assets/img/tweets/4.jpg'),
          title: 'Shweta Gupta',
          text: 'Nosana is definitely my favorite project because it revolutionizes cloud computing with decentralized GPU power',
          meta: '@swetas_2710 - 11 jun. 2024'
        },
        {
          href: ' https://x.com/chemxbeats/status/1803067610071810311',
          img: require('@/assets/img/tweets/5.jpg'),
          title: 'Chem X',
          text: 'Staking @nosana_ai might have been one my  smartest/favorite decisions for this cycle',
          meta: '@chemxbeats - 18 jun. 2024'
        }
      ].slice(0, this.count);
    },
    marquee2 () {
      return [
        {
          href: 'https://x.com/Jamiroquai_Jr/status/1835280851644596361',
          img: require('@/assets/img/tweets/6.jpg'),
          title: 'SatoshiShan',
          text: '$NOS is the best crypto decentralised AI project, hands down',
          meta: '@jamiroquai_Jr - 15 sep. 2024'
        },
        {
          href: 'https://x.com/ergon50/status/1829187263181512954',
          img: require('@/assets/img/tweets/7.jpg'),
          title: 'Nitin Shukla',
          text: 'Nosana is revolutionizing AI with one of the most cost-effective GPU grids! With 2,000 nodes, over 826k jobs processed, and 7M+ $NOS distributed to node operators, it\'s powering AI like never before.',
          meta: '@ergon50 - 29 aug. 2024'
        },
        {
          href: 'https://x.com/tesser4ctor/status/1812914424065462333',
          img: require('@/assets/img/tweets/8.jpg'),
          title: 'Tesseract',
          text: 'Node Runners on @nosana_ai are exemplary community members that every project wishes for. And this wouldn\'t be possible without the stellar team behind the project.',
          meta: '@tesser4ctor - 15 jul. 2024'
        },
        {
          href: 'https://x.com/joestrangeq/status/1835934228942344383?s=46&t=Tw9ZoFuDT9OAFK7b8MKS1w',
          img: require('@/assets/img/tweets/9.jpg'),
          title: 'Joseph Page',
          text: 'Have been saying this for a year. There\'s no second best. Mega-chad team that only knows shipping. Glad to see the fruit of their labor start to pay out!',
          meta: '@JoeStrangeQ - 17 sept. 2024'
        },
        {
          href: 'https://x.com/BanklessHQ/status/1780234842367545815',
          img: require('@/assets/img/tweets/10.jpg'),
          title: 'Bankless',
          text: 'Nosana could be a game-changer for startups & researchers seeking affordable AI computing resources.',
          meta: '@BanklessHQ - 16 apr. 2024'
        }
      ].slice(0, this.count);
    }
  },
  mounted () {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
    this.startMobileCycle();
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.checkMobile);
    this.stopMobileCycle();
  },
  methods: {
    checkMobile () {
      this.isMobile = window.innerWidth <= 500;
      if (this.isMobile) {
        this.startMobileCycle();
      } else {
        this.stopMobileCycle();
      }
    },
    startMobileCycle () {
      this.stopMobileCycle();
      if (this.isMobile) {
        this.mobileInterval = setInterval(() => {
          this.mobileTweetIndex = (this.mobileTweetIndex + 1) % this.marquee1.length;
        }, 4000);
      }
    },
    stopMobileCycle () {
      if (this.mobileInterval) {
        clearInterval(this.mobileInterval);
        this.mobileInterval = null;
      }
    }
  }
};
</script>

<template>
  <div class="marquee" :class="{ 'mobile': isMobile }" style="height:500px">
    <div v-if="isMobile" class="mobile-tweet-wrapper">
      <transition name="fade">
        <a
          v-if="marquee1.length"
          :key="mobileTweetIndex"
          :href="marquee1[mobileTweetIndex].href"
          class="box has-radius-big mb-6 full-width-tweet"
          target="_blank"
        >
          <div class="is-flex is-align-items-center is-flex-wrap-wrap mobile-tweet-header">
            <img :src="marquee1[mobileTweetIndex].img" class="avatar mr-3">
            <h2 class="title">{{ marquee1[mobileTweetIndex].title }}</h2>
          </div>
          <div class="mt-4 mobile-tweet-content">
            <p class="has-text-black is-size-4">
              {{ marquee1[mobileTweetIndex].text }}
            </p>
            <p class="mt-4 subtitle has-text-weight-bold">
              {{ marquee1[mobileTweetIndex].meta }}
            </p>
          </div>
        </a>
      </transition>
    </div>
    <template v-else>
      <div class="animate-marquee py-5">
        <a
          v-for="tweet in marquee1"
          :key="tweet.href"
          class="box has-radius-big mb-6"
          :href="tweet.href"
          target="_blank"
        >
          <div class="is-flex is-align-items-center is-flex-wrap-wrap">
            <img :src="tweet.img" class="avatar mr-3">
            <h2 class="title">{{ tweet.title }}</h2>
          </div>
          <div class="mt-4">
            <p class="has-text-black is-size-4">
              {{ tweet.text }}
            </p>
            <p class="mt-4 subtitle has-text-weight-bold">
              {{ tweet.meta }}
            </p>
          </div>
        </a>
      </div>
      <div class="animate-marquee reverse py-5">
        <a
          v-for="tweet in marquee2"
          :key="tweet.href"
          class="box has-radius-big mb-6"
          :href="tweet.href"
          target="_blank"
        >
          <div class="is-flex is-align-items-center is-flex-wrap-wrap">
            <img :src="tweet.img" class="avatar mr-3">
            <h2 class="title">{{ tweet.title }}</h2>
          </div>
          <div class="mt-4">
            <p class="has-text-black is-size-4">
              {{ tweet.text }}
            </p>
            <p class="mt-4 subtitle has-text-weight-bold">
              {{ tweet.meta }}
            </p>
          </div>
        </a>
        <br><br>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.marquee {
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: flex-start;
  > div {
    width: 50%;
    margin: 0 10px;
  }
}
.marquee.mobile {
  display: block;
  height: auto !important;
  .mobile-tweet-wrapper {
    width: 100vw;
    max-width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 350px;
    padding: 0;
    margin: 0;
  }
  .full-width-tweet {
    width: 96vw;
    max-width: 96vw;
    margin: 0 auto 1.5rem auto;
    box-shadow: 0 2px 8px rgba(16, 232, 12, 0.08);
    padding: 2rem 1rem 2rem 1rem;
    border-radius: 1rem;
    word-break: break-word;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .mobile-tweet-header {
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }
  .avatar {
    width: 60px;
    height: 60px;
    margin-right: 1rem;
  }
  .title {
    font-size: 1.2em !important;
    text-align: center;
    flex: 1;
  }
  .mobile-tweet-content {
    width: 100%;
    text-align: center;
    padding: 0 0.5rem;
  }
  .has-text-black.is-size-4 {
    font-size: 1.1em !important;
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }
  .subtitle {
    font-size: 0.95em;
    color: #666;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
blockquote {
  margin: 50px 0 !important;
}
.avatar {
  width: 75px;
  height:75px;
  border-radius:100%;
}
.animate-marquee {
  animation: marquee-up 20s infinite alternate;
  animation-timing-function: linear;
  @media screen and (max-width: $tablet) {
    margin: 0px !important;
    &:first-child {
      margin-right: 7px !important;
    }
    &:last-child {
      margin-left: 7px !important;
    }
    p, .subtitle {
      font-size: 15px !important;
    }
    a {
      padding: 20px;
    }
    .title {
      font-size: 16px !important;
      margin-top: 8px;
    }
    .avatar {
      height: 50px; width: 50px;
    }
    .box {
      margin-bottom: 15px !important;
    }
  }
}
.reverse {
  animation-direction: alternate-reverse;
}
@keyframes marquee-up {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(calc(-100% + 500px));
  }
}
</style>
