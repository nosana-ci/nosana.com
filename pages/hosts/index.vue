<template>
  <div>
    <section class="section intro">
      <BackgroundParallax />
      <div class="container">
        <div class="columns is-centered mt-6 mt-mobile-0">
          <div
            class="column is-10 pt-6 has-text-centered has-background-black-blur-false has-text-white"
          >
            <h1 class="title pt-6 is-spaced site-title has-text-white">
              Turn Your GPUs Into Profit
            </h1>
            <div class="py-2">
              <p
                class="block has-limited-width-big is-size-5"
                style="margin: 0 auto"
              >
                Whether your GPUs are in a data center or at home, Nosana offers
                simple onboarding and tools to monetize your resources. By
                connecting to our global network, you can monetize your GPUs
                while supporting cutting-edge AI innovation.
              </p>
              <div class="buttons is-flex is-justify-content-center mt-6">
                <a
                  href="https://docs.nosana.com/hosts/grid.html"
                  target="_blank"
                  class="button is-white is-medium mr-2"
                  style="max-width: 350px; width: 100%"
                >
                  Get Started
                </a>
                <a
                  href="mailto: sales@nosana.io"
                  target="_blank"
                  class="button is-white is-outlined is-medium ml-2"
                  style="max-width: 350px; width: 100%"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section py-6 has-background-black has-text-white">
      <div class="container py-6 mb-6">
        <h3 class="title is-1 py-6 mb-6 has-text-white">
          Unlock the full potential of your GPU hardware.
        </h3>
        <div class="columns is-multiline">
          <div class="is-4 column" data-aos="fade-in">
            <h4 class="title is-3 has-text-white">
              Passive Income <br>
              <span class="has-text-grey-light">Generate consistent earnings from otherwise unused
                hardware.</span>
            </h4>
          </div>
          <div class="is-4 column" data-aos="fade-in">
            <h4 class="title is-3 has-text-white">
              Global Clientele <br>
              <span class="has-text-grey-light">Connect to a global network of AI startups, researchers, and
                businesses effortlessly.</span>
            </h4>
          </div>
          <div class="is-4 column" data-aos="fade-in" data-aos-delay="100">
            <h4 class="title is-3 has-text-white">
              Fast Onboarding <br>
              <span class="has-text-grey-light">Track performance, earnings, and contributions with full
                transparency.
              </span>
            </h4>
          </div>
          <div class="is-4 column" data-aos="fade-in" data-aos-delay="200">
            <h4 class="title is-3 has-text-white">
              Real-Time Metrics<br>
              <span class="has-text-grey-light">Track performance, earnings, and contributions with full
                transparency.</span>
            </h4>
          </div>
          <div class="is-4 column" data-aos="fade-in" data-aos-delay="300">
            <h4 class="title is-3 has-text-white">
              Support Innovation<br>
              <span class="has-text-grey-light">
                Help AI startups and organizations innovate without focusing on
                infrastructure.
              </span>
            </h4>
          </div>
          <div class="is-4 mt-6 column is-flex is-align-items-center">
            <a
              href="https://docs.nosana.com/hosts/grid.html"
              target="_blank"
              class="button is-white is-medium mr-2"
              style="width: 100%"
            >
              Start earning now
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="section py-6 has-background-grey-lighter network-summary">
      <div class="container py-6 mb-6">
        <h3 class="title is-2 pt-3 mb-6">
          Network Summary
        </h3>
        <div class="columns is-multiline">
          <div class="is-3 column">
            <div class="has-background-white p-5">
              <div class="has-text-grey-light mt-1">
                GPUs Connected
              </div>
              <h4 class="title is-2 pt-2 is-flex mb-1">
                <ICountUp
                  v-if="true"
                  :end-val="3000"
                  :options="{
                    enableScrollSpy: true,
                    suffix: '+',
                  }"
                />
                <span v-else>...</span>
              </h4>
            </div>
          </div>
          <div class="is-3 column">
            <div class="has-background-white p-5">
              <div class="has-text-grey-light mt-1">
                Compute hours provided
              </div>
              <h4 class="title is-2 pt-2 is-flex mb-1">
                <ICountUp
                  v-if="duration"
                  :end-val="Math.round(duration / 3600)"
                  :options="{
                    enableScrollSpy: true,
                    decimalPlaces: 0,
                  }"
                />
                <span v-else>...</span>
              </h4>
            </div>
          </div>
          <div class="is-3 column">
            <div class="has-background-white p-5">
              <div class="has-text-grey-light mt-1">
                Value Earned
              </div>
              <h4 class="title is-2 pt-2 is-flex mb-1">
                <ICountUp
                  v-if="valueEarned"
                  :end-val="valueEarned"
                  :options="{
                    enableScrollSpy: true,
                    decimalPlaces: 0,
                    suffix: ' NOS',
                  }"
                />
                <span v-else>...</span>
              </h4>
            </div>
          </div>
          <div class="is-3 column">
            <div class="has-background-white p-5">
              <div class="has-text-grey-light mt-1">
                Completed Jobs
              </div>
              <h4 class="title is-2 pt-2 is-flex mb-1">
                <ICountUp
                  v-if="jobsCompleted"
                  :end-val="jobsCompleted"
                  :options="{
                    enableScrollSpy: true,
                    decimalPlaces: 0,
                  }"
                />
                <span v-else>...</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section py-6">
      <div class="container py-6">
        <div class="columns py-6 is-align-items-center">
          <div class="column is-5">
            <h3 class="title is-2">
              Get Started and Start Earning in 4 Steps
            </h3>
            <ol class="title is-3 ml-6 mt-5">
              <li class="mb-3 pt-3" data-aos="fade-in" data-aos-delay="100">
                <strong>Install the Nosana Node</strong>
                <p
                  class="has-color-text is-size-6 has-text-weight-normal pt-2"
                  style="line-height: 25px"
                >
                  Set up your Node and connect to the Nosana Network.
                </p>
              </li>
              <li class="mb-3" data-aos="fade-in">
                <strong>Register and Verify</strong>
                <p
                  class="has-color-text is-size-6 has-text-weight-normal pt-2"
                  style="line-height: 25px"
                >
                  Join the network and verify your hardware.
                </p>
              </li>
              <li class="mb-3" data-aos="fade-in">
                <strong>Start Earning</strong>
                <p
                  class="has-color-text is-size-6 has-text-weight-normal pt-2"
                  style="line-height: 25px"
                >
                  Get paid for every second your GPUs are used by Nosana
                  Clients.
                </p>
              </li>
              <li data-aos="fade-in">
                <strong>Track Performance</strong>
                <p
                  class="has-color-text is-size-6 has-text-weight-normal pt-2"
                  style="line-height: 25px"
                >
                  Monitor performance and payments in your dashboard.
                </p>
              </li>
            </ol>

            <a
              href="https://docs.nosana.com/hosts/grid.html"
              target="_blank"
              class="button is-black is-medium mt-5"
              style="width: 100%"
              data-aos="fade-in"
            >
              Join and start earning today
            </a>
          </div>
          <div
            class="column is-7 iframe-column is-flex has-justify-content-center p-6"
          >
            <iframe
              src="https://www.youtube-nocookie.com/embed/RVik-mh0wWY"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope;"
              referrerpolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section py-6 has-background-black has-text-white">
      <div class="container py-6 mb-6">
        <h3 class="title is-2 mb-5 has-text-white">
          How much can you earn?
        </h3>
        <p>Maximize the value of your hardware without extra effort.</p>
        <div class="has-background-white has-text-black has-radius p-5 mt-6">
          <earnings-calculator v-if="nosPrice" :nos-price="nosPrice" />
        </div>
      </div>
    </section>

    <section
      class="section py-0 has-background-grey-lighter tweet-section"
      style="overflow: hidden"
    >
      <div class="container py-6">
        <div class="columns my-6 py-6">
          <div
            class="column is-4 py-6 my-6 has-background-grey-lighter"
            style="position: relative; z-index: 1"
            data-aos="fade-right"
          >
            <h3 class="title is-2">
              Nosana Community
            </h3>
            <p class="mb-5 is-size-4">
              Nosana is powered by a dynamic and open community. As a public
              service, our network’s source code is fully open-source and
              accessible to all. This openness invites collaboration and
              innovation, with every contribution helping to shape the future of
              Nosana.
            </p>
            <socials class="mb-4 pt-3" dark />
          </div>
          <div class="column is-8">
            <tweets-host />
          </div>
        </div>
      </div>
    </section>

    <section class="section py-6 bottom-c2a">
      <div class="container py-6">
        <h3 class="title is-1 pt-6">
          Join Today!
        </h3>
        <h3 class="title is-2">
          Whether you’re running GPUs in a qualified datacenter or have one at
          home, Nosana makes it simple to join.
        </h3>
        <div class="buttons is-flex mt-6 mb-6">
          <a
            href="https://docs.nosana.com/hosts/grid.html"
            target="_blank"
            class="button is-black is-medium mr-2"
            style="max-width: 350px; width: 100%"
          >
            Become a Host
          </a>
          <a
            target="_blank"
            href="mailto: sales@nosana.io"
            class="button is-black is-outlined is-medium ml-2"
            style="max-width: 350px; width: 100%"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import ICountUp from 'vue-countup-v2';
import BackgroundParallax from '../../components/BackgroundParallax.vue';

export default {
  colorMode: 'light',
  components: { BackgroundParallax, ICountUp },
  data () {
    return {
      jobsCompleted: null,
      duration: null,
      valueEarned: null,
      nosPrice: null,
      numberOfGpus: null
    };
  },
  mounted () {
    this.getStatistics();
  },
  methods: {
    async getStatistics () {
      try {
        const responseStats = await fetch(
          'https://dashboard.k8s.prd.nos.ci/api/stats/'
        );
        const stats = await responseStats.json();
        if (stats) {
          this.nosPrice = stats.price;
        }
        const response = await fetch(
          'https://dashboard.k8s.prd.nos.ci/api/jobs/stats/'
        );
        const data = await response.json();
        this.jobsCompleted = data.completed;
        this.duration = data.duration;
        this.valueEarned = data.price;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
iframe {
  aspect-ratio: 16 / 9;
  width: 100% !important;
}

.bg-scroll {
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    ),
    url("~assets/img/host-bg.jpg");
  background-size: cover;
  background-position: center;
}

.tweet-image {
  position: absolute;
  top: 0;
  bottom: 0;
  @media screen and (max-width: $tablet) {
    position: relative;
  }
}
@media screen and (max-width: $tablet) {
  .container.py-6 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .intro,
  .bottom-c2a {
    .button {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }
  .iframe-column {
    padding: 1.5rem !important;
    padding-bottom: 0 !important;
  }
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
