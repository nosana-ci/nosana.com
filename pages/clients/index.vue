<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns is-centered mt-6 mt-mobile-0">
          <div
            class="column is-10 has-text-centered has-background-black-blur-false"
          >
            <h1 class="title is-spaced site-title">
              AI innovation happens on Nosana
            </h1>
            <div class="py-2">
              <p class="block is-size-3" style="margin: 0 auto">
                Focus more on running ML models and less on managing
                infrastructure with seamless GPU workload deployments.
              </p>
              <div class="buttons is-flex is-justify-content-center mt-6">
                <button
                  class="button is-black is-medium"
                  style="max-width: 350px; width: 100%"
                  @click="getStartedModal = true; trackLinkClick('clients_get_started_free_click')"
                >
                  Get Started for Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container mb-6 pb-6">
        <div class="columns mt-6 pt-6">
          <div class="column is-4" data-aos="fade-in">
            <div class="is-flex mb-5 is-align-items-center">
              <div
                class="mr-3 grey-title-block has-radius p-2 is-flex is-align-items-center is-justify-content-center"
                style="flex: 0 0 80px; background-color: #f9f9f9"
              >
                <img
                  style="width: 100%; height: auto"
                  src="~assets/img/icons/seamless.png"
                >
              </div>
              <h3 class="title is-2 py-4">
                Seamless
              </h3>
            </div>
            <p class="mb-5 is-4 is-size-4">
              Select from a library of over 20 ready-made
              <a
                href="https://dashboard.nosana.com/jobs/templates"
                target="_blank"
                @click="trackLinkClick('clients_templates_click', 'assist')"
              >templates</a>
              or use your own custom container to suit your requirements.
            </p>
          </div>
          <div class="column is-4" data-aos="fade-in" data-aos-delay="100">
            <div class="is-flex mb-5 is-align-items-center">
              <div
                class="mr-3 grey-title-block has-radius is-flex p-2 is-align-items-center is-justify-content-center"
                style="flex: 0 0 80px; background-color: #f9f9f9"
              >
                <img
                  style="width: 100%; height: auto"
                  src="~assets/img/icons/on-demand.png"
                >
              </div>
              <h3 class="title is-2 py-4">
                On-Demand
              </h3>
            </div>
            <p class="mb-5 is-4 is-size-4">
              Rent available GPUs effortlessly and scale your workloads
              seamlessly to meet your needs.
            </p>
          </div>
          <div class="column is-4" data-aos="fade-in" data-aos-delay="200">
            <div class="is-flex mb-5 is-align-items-center">
              <div
                class="mr-3 grey-title-block has-radius p-2 is-flex is-align-items-center is-justify-content-center"
                style="flex: 0 0 80px; background-color: #f9f9f9"
              >
                <img
                  style="width: 100%; height: auto"
                  src="~assets/img/icons/cost-efficient.png"
                >
              </div>
              <h3 class="title is-2 py-4">
                Cost-Efficient
              </h3>
            </div>
            <p class="mb-5 is-4 is-size-4">
              With transparent pay-as-you-go pricing, you only pay for what you
              use—never for unused resources.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section has-background-black has-text-white">
      <div class="container py-6">
        <div class="columns py-6 is-align-items-center">
          <div class="column is-7 is-flex has-justify-content-center">
            <iframe
              src="https://www.youtube-nocookie.com/embed/uu3NmxldpWQ"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope;"
              referrerpolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div class="column is-5">
            <h3 class="title is-2 has-text-white">
              How Nosana Works
            </h3>
            <h4 class="title is-3 has-text-white">
              Everything You Need to Build and Scale
            </h4>
            <p class="mb-5 is-size-4">
              We’re at the forefront of a technological revolution. AI is
              transforming the way we solve problems, connect with customers,
              and increase efficiency—pushing the boundaries of what’s possible.
              Nosana is here to provide the tools and infrastructure you need to
              build, scale, and thrive in this new era of innovation.
            </p>
            <button
              class="button is-white is-medium"
              style="max-width: 350px; width: 100%"
              data-aos="fade-in"
              @click="requestDemoModal = true; trackLinkClick('clients_request_demo_click', 'assist')"
            >
              Request a Demo
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container py-6">
        <div class="columns py-6 is-align-items-center">
          <div class="column is-5">
            <h3 class="title is-2">
              Key Features for AI Innovators
            </h3>
            <accordion>
              <accordion-item v-for="faq in faqs" :key="faq.question">
                <!-- This slot will handle the title/header of the accordion and is the part you click on -->
                <template slot="accordion-trigger">
                  <h3 class="title is-3 mb-0 has-text-weight-semibold">
                    {{ faq.question }}
                  </h3>
                </template>
                <!-- This slot will handle all the content that is passed to the accordion -->
                <template slot="accordion-content">
                  <!-- eslint-disable vue/no-v-html -->
                  <span v-html="faq.answer" />
                </template>
              </accordion-item>
            </accordion>
          </div>
          <div
            class="column is-7 py-0 px-6"
            style="height: auto; align-self: stretch"
          >
            <div
              class="has-background-black has-radius-big p-6 is-flex is-align-items-center"
              style="height: 100%"
            >
              <img src="~/assets/img/dashboard.jpeg" alt="Dashboard">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section py-6 has-background-grey-lighter">
      <div class="container py-6 mb-6">
        <h3 class="title is-2 pt-3" id="calculator">
          Price Calculator
        </h3>
        <p>Estimate your costs by selecting the resources you need.</p>

        <div class="has-background-white has-radius mt-6 p-5">
          <PriceCalculator data-aos="fade-in" />
        </div>
      </div>
    </section>

    <section class="section py-6">
      <div class="container py-6 mb-6">
        <h3 class="title is-1 pt-3">
          Client Use Case
        </h3>
        <h3 class="title is-2">
          Web3 AI startup Sogni uses Nosana’s GPUs to power next-gen art tools.
        </h3>

        <div class="columns">
          <div class="column is-6">
            <div class="mt-6">
              <p>Use case</p>
              <img
                src="~/assets/img/sogni-logo.svg"
                data-aos="fade-in"
                alt="Sogni"
                class="mt-3 mb-5"
              >
              <p class="is-size-3 mb-3 has-text-weight-semibold has-text-black">
                "Hosting 100+ state-of-the-art image generation models on Nosana
                has been seamless. The reliability of their decentralized GPUs
                and the flexibility of their framework make them our go-to
                partner for scaling creative tools."
              </p>
              <p>
                Mark Ledford, Founder and CTO,
                <a href="https://www.sogni.ai/" target="_blank">Sogni AI</a>
              </p>

              <div class="columns my-5">
                <div class="is-6 column" data-aos="fade-right">
                  <div class="has-background-grey-lighter p-5">
                    <div class="has-text-grey-light mt-1">
                      Generated Images
                    </div>
                    <h4 class="title is-2 pt-2 is-flex mb-1">
                      <ICountUp
                        v-if="imagesGenerated"
                        :end-val="Number(imagesGenerated)"
                        :options="{
                          enableScrollSpy: true,
                        }"
                      />
                      <span v-else>...</span>
                    </h4>
                  </div>
                </div>
                <div class="is-6 column" data-aos="fade-left">
                  <div class="has-background-grey-lighter p-5">
                    <div class="has-text-grey-light mt-1">
                      Compute hours provided
                    </div>
                    <h4 class="title is-2 pt-2 is-flex mb-1">
                      <ICountUp
                        v-if="computeHours"
                        :end-val="computeHours"
                        :options="{
                          enableScrollSpy: true,
                        }"
                      />
                      <span v-else>...</span>
                    </h4>
                  </div>
                </div>
              </div>

              <nuxt-link
                to="/clients/sogni"
                class="has-text-accent has-text-weight-semibold is-size-5"
                @click.native="trackLinkClick('clients_read_story_click', 'assist')"
              >
                Read the story
                <i class="pl-1 fas fa-chevron-right" />
              </nuxt-link>
            </div>
          </div>
          <div class="column is-6">
            <img
              class="has-radius-big"
              src="~/assets/img/sogni-graphic.jpeg"
              alt="Sogni Graphic"
              data-aos="fade-in"
            >
          </div>
        </div>
      </div>
    </section>

    <section class="section py-6 bottom-section has-background-grey-lighter">
      <div class="container py-6 mb-6 has-text-centered">
        <h3 class="title is-2 pt-3 mb-2" data-aos="fade-in">
          Start shaping the future with Nosana, today.
        </h3>
        <h3
          class="title is-3 mb-0 has-text-weight-semibold"
          data-aos="fade-in"
          data-aos-delay="100"
        >
          No Limits. Only Possibilities.
        </h3>
        <div class="buttons is-flex is-justify-content-center mt-6">
          <button
            class="button is-black is-medium mr-3"
            data-aos="fade-right"
            style="max-width: 300px; width: 100%"
            @click="getStartedModal = true; trackLinkClick('clients_get_started_free_click')"
          >
            Get Started for Free
          </button>
          <button
            data-aos="fade-left"
            class="button is-black is-medium ml-3"
            style="max-width: 300px; width: 100%"
            @click="requestDemoModal = true; trackLinkClick('clients_request_demo_click', 'assist')"
          >
            Request a Demo
          </button>
        </div>
      </div>
    </section>

    <!-- Get Started modal -->
    <div class="modal" :class="{ 'is-active': getStartedModal }">
      <div class="modal-background" @click="getStartedModal = false" />
      <!-- Calendly inline widget begin -->
      <div
        class="calendly-inline-widget"
        data-url="https://calendly.com/d/cmt6-k7v-hmc"
        style="max-width: 450px; width: 100%; height: 700px"
      />
      <script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      ></script>
      <!-- Calendly inline widget end -->
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="getStartedModal = false"
      />
    </div>

    <!-- Request demo modal -->
    <div class="modal" :class="{ 'is-active': requestDemoModal }">
      <div class="modal-background" @click="requestDemoModal = false" />
      <!-- Calendly inline widget begin -->
      <div
        class="calendly-inline-widget"
        data-url="https://calendly.com/d/crn4-74f-2wm"
        style="min-width: 450px; height: 700px"
      />
      <script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      ></script>
      <!-- Calendly inline widget end -->

      <button
        class="modal-close is-large"
        aria-label="close"
        @click="requestDemoModal = false"
      />
    </div>
  </div>
</template>
<script>
import ICountUp from 'vue-countup-v2';
import PriceCalculator from '../../components/PriceCalculator.vue';
export default {
  components: { ICountUp, PriceCalculator },
  colorMode: 'light',
  data () {
    return {
      faqs: [
        {
          question: 'Cost-Efficient GPU Rental',
          answer:
            'Save up to <b>6x</b> on compute costs compared to traditional providers. Nosana’s GPU marketplace ensures affordable pricing without compromising performance.'
        },
        {
          question: 'Scalable and On-Demand Compute',
          answer:
            'Access GPU resources in real time, with no delays or bottlenecks. Nosana’s network dynamically scales to meet your workload needs, supporting growth and peak demand effortlessly.'
        },
        {
          question: 'Decentralized and Secure Infrastructure',
          answer:
            'Leverage Nosana’s transparent and secure decentralized network. Built-in validation and peer-to-peer transactions ensure reliability and security for your AI inference workloads.'
        },
        {
          question: 'Seamless Integration with AI Workflows',
          answer:
            'Deploy faster with Docker-ready infrastructure. Bring your own AI models (e.g., Hugging Face) and Docker images from any registry to streamline your AI workflows.'
        }
      ],
      getStartedModal: false,
      requestDemoModal: false,
      imagesGenerated: null,
      computeHours: null
    };
  },
  mounted () {
    this.getSogniData();
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
    },
    async getSogniData () {
      try {
        const response = await fetch(
          'https://socket.sogni.ai/api/v1/analytics/lifetime'
        );
        const data = await response.json();
        this.imagesGenerated = data.jobCompleteWorker;
        this.computeHours = data.renderSecCompleteWorker / 3600;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: $tablet) {
  .grey-title-block {
    display: none;
  }
  .columns.my-6.pt-6 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    padding-top: 0 !important;
  }
  .mt-5 {
    margin-top: 0 !important;
  }
  .has-radius.p-6 {
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
  button {
    margin: 0 !important;
  }
  .bottom-section button {
    margin-bottom: 0.3rem !important;
  }
}
iframe {
  aspect-ratio: 16 / 9;
  width: 100% !important;
}
</style>
