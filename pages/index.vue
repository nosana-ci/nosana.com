<template>
  <div>
    <home-intro />
    <section class="section has-background-black has-text-white">
      <div class="container mb-6 pb-6">
        <h2 class="title py-6 site-title has-text-white">
          Access AI Compute Power<br> or Monetize Your GPU Resources
        </h2>
        <div class="columns my-6 py-6 is-variable is-2 is-desktop">
          <div class="column is-6" data-aos="fade-right">
            <div class="cta-card">
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
              <nuxt-link to="/hosts" class="cta-green-btn">
                Start Hosting <i class="pl-1 fas fa-chevron-right" />
              </nuxt-link>
            </div>
          </div>
          <div class="column is-6" data-aos="fade-left">
            <div class="cta-card">
              <h3 class="title is-2 has-text-white">
                GPU Power for Your AI Needs
              </h3>
              <h4 class="title is-3 has-text-white">
                Access a global GPU network for your AI inference jobs, at unbeatable prices.
              </h4>
              <p class="mb-5 is-size-5" style="color: #ccc;">
                Nosana’s global network offers on-demand compute power with dynamic pricing,
                so you can scale your AI models and run complex tasks efficiently.
                Focus on your innovations without the burden of managing infrastructure.
              </p>
              <nuxt-link to="/clients" class="cta-green-btn">
                Get Started <i class="pl-1 fas fa-chevron-right" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section py-6 features-section">
      <div class="container py-6 mb-6">
        <h3 class="title is-2 py-6 mb-6">
          On-Demand GPU Compute for Everyone<br>
          From AI Startups and Research Labs to Grad Students
        </h3>
        <div class="columns is-multiline features-row">
          <div class="is-4 column feature-card-col" data-aos="fade-in">
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
          <div class="is-4 column feature-card-col" data-aos="fade-in" data-aos-delay="100">
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
          <div class="is-4 column feature-card-col" data-aos="fade-in" data-aos-delay="200">
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
          <div class="is-4 column mt-6 feature-card-col" data-aos="fade-in" data-aos-delay="300">
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
          <div class="is-4 column mt-6 feature-card-col" data-aos="fade-in" data-aos-delay="400">
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
          <div class="is-4 mt-6 column feature-card-col" data-aos="fade-in" data-aos-delay="500">
            <div class="feature-card feature-card-link feature-card-cta">
              <h4 class="title is-3">
                Ready to Get Started?
              </h4>
              <p class="is-size-5 mb-4">
                Experience the power of Nosana’s GPU network for your AI workloads. Sign up and deploy in minutes.
              </p>
              <nuxt-link
                to="/clients"
                class="cta-white-btn"
              >
                Deploy AI Workloads <i class="pl-1 fas fa-chevron-right" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section py-6 has-background-grey-lighter network-summary">
      <div class="container py-6 mb-6">
        <h3 class="title is-2 pt-3 mb-6">
          Network Summary
        </h3>
        <NetworkSummary />
      </div>
    </section>
    <!-- Discover -->
    <Discover
      title="Catch Up on Nosana’s Recent News"
      :blogs="blogs"
    />
    <section
      class="section py-0 has-background-grey-lighter tweet-section community-section"
      style="overflow: hidden"
    >
      <div class="container py-6">
        <div class="columns my-6 py-6">
          <div
            class="column is-4 py-6 my-6 community-card"

            data-aos="fade-right"
          >
            <h3 class="title is-2 mb-3">
              Nosana Community
            </h3>
            <p class="mb-5 is-size-4 community-desc">
              Nosana is powered by a dynamic and open community. As a public service,
              our network’s source code is fully open-source and accessible to all.
              This openness invites collaboration and innovation, with every contribution helping
              to shape the future of Nosana.
            </p>
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
.cta-green-btn {
  display: inline-flex;
  align-items: center;
  background: #10E80C;
  color: #fff !important;
  font-weight: 700;
  border-radius: 8px;
  padding: 0.75em 1.5em;
  font-size: 1.15rem;
  box-shadow: 0 2px 12px 0 rgba(0,184,107,0.10);
  transition: background 0.18s cubic-bezier(0.4,0,0.2,1), color 0.18s cubic-bezier(0.4,0,0.2,1),
    transform 0.18s cubic-bezier(0.4,0,0.2,1);
  border: none;
  cursor: pointer;
  text-decoration: none;
  &:hover, &:focus {
    background: #111;
    color: #fff !important;
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12);
  }
  i {
    font-size: 1em;
    margin-left: 0.5em;
    transition: color 0.18s;
  }
}
.cta-white-btn {
  display: inline-flex;
  align-items: center;
  background: #fff;
  color: #181818 !important;
  border: 1.5px solid #10E80C;
  font-weight: 700;
  border-radius: 8px;
  padding: 0.75em 1.5em;
  font-size: 1.15rem;
  box-shadow: 0 2px 12px 0 rgba(0,184,107,0.10);
  transition: background 0.18s cubic-bezier(0.4,0,0.2,1), color 0.18s cubic-bezier(0.4,0,0.2,1),
    transform 0.18s cubic-bezier(0.4,0,0.2,1);
  cursor: pointer;
  text-decoration: none;
  &:hover, &:focus {
    background: #181818;
    color: #fff !important;
    border-color: #10E80C;
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12);
  }
  i {
    font-size: 1em;
    margin-left: 0.5em;
    transition: color 0.18s;
  }
}
.cta-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(16,232,12,0.07) 100%);
  border-radius: 1.25rem;
  box-shadow: 0 4px 32px 0 rgba(16,232,12,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.10);
  padding: 2.5rem 2rem 2.5rem 2rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
  @media (max-width: 900px) {
    padding: 1.5rem 1rem;
  }
  &:hover {
    box-shadow: 0 8px 40px 0 rgba(16,232,12,0.16), 0 2px 16px 0 rgba(0,0,0,0.14);
    transform: translateY(-2px) scale(1.01);
  }
  h3, h4 {
    color: #fff;
  }
  .cta-green-btn {
    margin-top: auto;
  }
}
.features-row {
  display: flex;
  flex-wrap: wrap;
}
.feature-card-col {
  display: flex;
  flex-direction: column;
}
.features-section .feature-card {
  background: linear-gradient(135deg, #fff 0%, #f3fff6 100%);
  border-radius: 1.25rem;
  box-shadow: 0 4px 24px 0 rgba(16,232,12,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.07);
  padding: 2.2rem 1.5rem 1.7rem 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
  min-height: 100%;
  height: 100%;
  @media (max-width: 900px) {
    padding: 1.2rem 0.7rem;
    min-height: 120px;
  }
  &:hover {
    box-shadow: 0 8px 32px 0 rgba(16,232,12,0.16), 0 2px 16px 0 rgba(0,0,0,0.12);
    transform: translateY(-2px) scale(1.01);
  }
  h4 {
    color: #181818;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  p {
    color: #333;
  }
}
.features-section .feature-card-link {
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f3fff6 0%, #fff 100%);
  min-height: 100px;
  a {
    color: #10E80C !important;
    font-weight: 700;
    font-size: 1.15rem;
    text-decoration: none;
    transition: color 0.18s;
    &:hover {
      color: #0bbd09 !important;
    }
  }
}
.features-section .feature-card-cta {
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  .cta-green-btn {
    margin-top: auto;
    font-size: 1.15rem;
    padding: 0.8em 2em;
  }
  .text-black{
    color: #181818 !important;
  }

}
.text-black {
  color: #181818 !important;
}
.community-section .community-card {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%;
  background: linear-gradient(135deg, #fff 0%, #f3fff6 100%);
  border-radius: 1.25rem;
  box-shadow: 0 4px 24px 0 rgba(16,232,12,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.07);
  padding: 2.5rem 2rem 2.5rem 2rem;
  margin-bottom: 1.5rem;
  @media (max-width: 900px) {
    padding: 1.5rem 1rem;
  }
  h3 {
    color: #181818;
    font-weight: 700;
    margin-bottom: 1.2rem;
  }
  .community-desc {
    color: #333;
    font-size: 1.25rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
}
</style>
