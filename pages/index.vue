<template>
  <div>
    <home-intro />
    <section class="section has-background-black has-text-white">
      <div class="container mb-6 pb-6">
        <h2 class="title py-6 site-title has-text-white">
          Access AI Compute Power<br> or Monetize Your GPU Resources
        </h2>
        <div class="columns my-6 py-6">
          <div class="column is-6" data-aos="fade-right">
            <h3 class="title is-2 has-text-white">
              Start Earning with Your GPUs
            </h3>
            <h4 class="title is-3 has-text-white">
              List your idle GPUs and earn while supporting the future of AI innovation.
            </h4>
            <p class="mb-5 is-4 is-size-5" style="color: #ccc;">
              Join Nosana’s global network and unlock a new income opportunity with your GPU hardware.
              We connect you with clients and offer easy-to-use tools to simplify hosting.
            </p>
            <nuxt-link
              to="/hosts"
              class="has-text-accent"
              @click.native="trackLinkClick('homepage_get_started_hosting_click')"
            >
              Start Hosting <i class="pl-1 fas fa-chevron-right" />
            </nuxt-link>
          </div>
          <div class="column is-6" data-aos="fade-left">
            <h3 class="title is-2 has-text-white">
              GPU Power for Your AI Needs
            </h3>
            <h4 class="title is-3 has-text-white">
              Access a global GPU network for your AI inference jobs, at
              unbeatable prices.
            </h4>
            <p class="mb-5 is-size-5" style="color: #ccc;">
              Nosana’s global network offers on-demand compute power with
              dynamic pricing, so you can scale your AI models and run complex
              tasks efficiently. Focus on your innovations without the burden of
              managing infrastructure.
            </p>
            <nuxt-link
              to="/clients"
              class="has-text-accent"
            >
              Get Started <i class="pl-1 fas fa-chevron-right" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <section class="section py-6">
      <div class="container py-6 mb-6">
        <h3 class="title is-2 py-6 mb-6">
          On-Demand GPU Compute for Everyone<br>
          From AI Startups and Research Labs to Grad Students
        </h3>
        <div class="columns is-multiline">
          <div class="is-4 column" data-aos="fade-in">
            <h4 class="title is-3">
              On-Demand <br>
              <span class="has-text-grey-light">Worldwide GPU Access</span>
            </h4>
            <p class="is-size-5">
              Nosana’s decentralized infrastructure connects you to thousands of
              GPUs across the globe, offering scalable, on-demand compute power
              wherever you are.
            </p>
          </div>
          <div class="is-4 column" data-aos="fade-in" data-aos-delay="100">
            <h4 class="title is-3">
              Specialized<br><span class="has-text-grey-light">Optimized for AI Inference</span>
            </h4>
            <p class="is-size-5">
              Leverage high-performance GPUs specifically tuned for AI inference
              tasks, ensuring efficiency and speed for your projects.
            </p>
          </div>
          <div class="is-4 column" data-aos="fade-in" data-aos-delay="200">
            <h4 class="title is-3">
              Flexible<br><span class="has-text-grey-light">Scalable Compute Resources</span>
            </h4>
            <p class="is-size-5">
              With dynamic pricing and job-matching, scale compute resources
              easily, while Hosts effortlessly monetize their hardware.
              Ideal for any business size.
            </p>
          </div>
          <div class="is-4 column mt-6" data-aos="fade-in" data-aos-delay="300">
            <h4 class="title is-3">
              Sustainable<br><span class="has-text-grey-light">Eco-conscious Compute
              </span>
            </h4>
            <p class="is-size-5">
              By tapping into idle consumer GPUs, Nosana minimizes energy waste
              and supports a greener future, providing robust computing power
              for your AI needs.
            </p>
          </div>
          <div class="is-4 column mt-6" data-aos="fade-in" data-aos-delay="400">
            <h4 class="title is-3">
              Secure<br><span class="has-text-grey-light">Advanced Security & Privacy</span>
            </h4>
            <p class="is-size-5">
              Nosana protects your AI workloads with end-to-end encryption and
              blockchain transparency, adding layers of security that
              centralized systems can't match.
            </p>
          </div>
          <div class="is-4 mt-6 column is-flex is-align-items-center">
            <nuxt-link
              to="/clients"
              class="has-text-accent has-text-weight-semibold is-size-5"
              @click="trackLinkClick('homepage_deploy_ai_click', 'primary')"
            >
              Deploy AI Workloads <i class="pl-1 fas fa-chevron-right" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <!-- Network Summary -->
    <section class="section py-6 has-background-grey-lighter network-summary">
      <div class="container py-6 mb-6">
        <h3 class="title is-2 pt-3 mb-6">
          Network Summary
        </h3>
        <NetworkSummary />
      </div>
    </section>
    <!-- Discover -->
    <Discover title="Catch Up on Nosana’s Recent News" :blogs="blogs" />
    <section
      class="section py-0 has-background-grey-lighter tweet-section"
      style="overflow: hidden"
    >
      <div class="container py-6">
        <div class="columns my-6 py-6">
          <div
            class="column is-4 py-6 my-6  has-background-grey-lighter"
            style="position: relative; z-index: 1;"
            data-aos="fade-right"
          >
            <h3 class="title is-2">
              Nosana Community
            </h3>
            <p class="mb-5 is-size-4">
              Nosana is powered by a dynamic and open community.
              As a public service, our network’s source code is fully open-source and accessible to all.
              This openness invites collaboration and innovation,
              with every contribution helping to shape the future of Nosana.
            </p>
            <socials class="mb-4 pt-3" dark />
          </div>
          <div class="column is-8">
            <tweets />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NetworkSummary from '../components/NetworkSummary.vue';

export default {
  colorMode: 'light',
  components: { NetworkSummary },
  data () {
    return {
      amount: 1500,
      days: 100,
      blogs: []
    };
  },
  mounted () {
    this.fetchBlogs();
  },
  destroyed () {},
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
    },
    onVideoEnd (event) {
      setTimeout(() => {
        event.target.play();
      }, 2000);
    },
    async fetchBlogs () {
      const blogs = await this.$content('blog')
        .only([
          'title',
          'createdAt',
          'description',
          'img',
          'slug',
          'author',
          'tags'
        ])
        .limit(3)
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
.tweet-image {
  position: absolute;
  top: 0;
  bottom: 0;
  @media screen and (max-width: $tablet) {
    position: relative;
  }
}
@media screen and (max-width: $tablet) {
  .tweet-section {
    .columns {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      overflow: hidden;
    }
    .column.my-6 {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }
  }
  .column.mt-6 {
    margin-top: 0 !important;
  }
  .network-summary {
    text-align: center;
    .is-flex {
      justify-content: center;
    }
  }
}
</style>
