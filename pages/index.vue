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
            <nuxt-link to="/hosts" class="modern-btn">
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
            <nuxt-link to="/clients" class="modern-btn">
              Get Started <i class="pl-1 fas fa-chevron-right" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <section class="feature-section section py-6">
      <div class="container py-6 mb-6">
        <h3 class="title is-2 py-6 mb-6">
          On-Demand GPU Compute for Everyone<br>
          From AI Startups and Research Labs to Grad Students
        </h3>
        <div class="columns is-multiline">
          <div class="is-4 column" data-aos="fade-in">
            <div class="feature-card">
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
          </div>
          <div class="is-4 column" data-aos="fade-in" data-aos-delay="100">
            <div class="feature-card">
              <h4 class="title is-3">
                Specialized<br><span class="has-text-grey-light">Optimized for AI Inference</span>
              </h4>
              <p class="is-size-5">
                Leverage high-performance GPUs specifically tuned for AI inference
                tasks, ensuring efficiency and speed for your projects.
              </p>
            </div>
          </div>
          <div class="is-4 column" data-aos="fade-in" data-aos-delay="200">
            <div class="feature-card">
              <h4 class="title is-3">
                Flexible<br><span class="has-text-grey-light">Scalable Compute Resources</span>
              </h4>
              <p class="is-size-5">
                With dynamic pricing and job-matching, scale compute resources
                easily, while Hosts effortlessly monetize their hardware.
                Ideal for any business size.
              </p>
            </div>
          </div>
          <div class="is-4 column mt-6" data-aos="fade-in" data-aos-delay="300">
            <div class="feature-card">
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
          </div>
          <div class="is-4 column mt-6" data-aos="fade-in" data-aos-delay="400">
            <div class="feature-card">
              <h4 class="title is-3">
                Secure<br><span class="has-text-grey-light">Advanced Security & Privacy</span>
              </h4>
              <p class="is-size-5">
                Nosana protects your AI workloads with end-to-end encryption and
                blockchain transparency, adding layers of security that
                centralized systems can't match.
              </p>
            </div>
          </div>
          <div class="is-4 mt-6 column">
            <div class="feature-card feature-card-cta">
              <div class="cta-content" style="text-align:center;">
                <h4 class="title is-3">
                  Get Started<br>
                  <span class="has-text-grey-light">Deploy AI Workloads</span>
                </h4>
                <p class="is-size-5" style="margin-bottom: 1.5rem;">
                  Launch your AI projects on Nosana’s global GPU network in minutes. Enjoy unbeatable prices,
                  scalability, and security.
                </p>
                <nuxt-link
                  to="/clients"
                  class="modern-btn"
                >
                  Deploy AI Workloads <i class="pl-1 fas fa-chevron-right" />
                </nuxt-link>
              </div>
            </div>
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
        <div class="columns is-centered">
          <div class="column is-12">
            <div class="tweets-card">
              <tweets :count="tweetCount" />
            </div>
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
      blogs: [],
      tweetCount: 3
    };
  },
  mounted () {
    this.fetchBlogs();
    this.setTweetCount();
    window.addEventListener('resize', this.setTweetCount);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setTweetCount);
  },
  destroyed () {},
  methods: {
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
    },
    setTweetCount () {
      this.tweetCount = window.innerWidth <= 500 ? 1 : 3;
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
.modern-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  background: #10E80C; // Nosana neon green
  color: #000 !important; // Black text for contrast
  padding: 0.75em 1.5em;
  border-radius: 0.5em;
  font-weight: 600;
  font-size: 1.1em;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(16, 232, 12, 0.08);
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s, color 0.2s;
  border: none;
  outline: none;
  cursor: pointer;
}
.modern-btn:hover, .modern-btn:focus {
  background: #000; // Black background on hover
  color: #10E80C !important; // Neon green text on hover
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(16, 232, 12, 0.16);
  transform: translateY(-2px) scale(1.03);
}
.modern-btn i {
  font-size: 1em;
  margin-left: 0.5em;
}
.feature-section {
  background: #f9f9f9;
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.feature-card {
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 4px 24px rgba(16, 232, 12, 0.07), 0 1.5px 6px rgba(0,0,0,0.03);
  padding: 2.5rem 2rem 2rem 2rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: box-shadow 0.2s, transform 0.2s;
  border: 1px solid #e6e6e6;
}
.feature-card:hover {
  box-shadow: 0 8px 32px rgba(16, 232, 12, 0.13), 0 3px 12px rgba(0,0,0,0.06);
  transform: translateY(-4px) scale(1.02);
}
.feature-card-cta .modern-btn {
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
  font-size: 1.15em;
  padding-left: 2em;
  padding-right: 2em;
}
.tweets-card {
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 4px 24px rgba(16, 232, 12, 0.07), 0 1.5px 6px rgba(0,0,0,0.03);
  padding: 2.5rem 2rem 2rem 2rem;
  margin-bottom: 2rem;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e6e6e6;
}
@media screen and (max-width: 500px) {
  .tweets-card {
    padding: 1rem 0.5rem 1rem 0.5rem;
    min-width: 0;
    border-radius: 0.75rem;
    font-size: 0.97em;
    box-shadow: 0 2px 8px rgba(16, 232, 12, 0.05);
  }
  .tweets-card * {
    word-break: break-word;
    max-width: 100%;
  }
}
</style>
