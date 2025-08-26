<template>
  <div class="px-3">
    <h3 class="title is-3 pt-4">
      Adjust parameters like GPU type, hours, and quantity to see how much you’ll save:
    </h3>
    <div class="columns">
      <div class="column is-half">
        <div class="field mb-5 pt-2">
          <label class="label">What <b>GPU Type</b> do you need?</label>
          <div class="control is-fullwidth">
            <div class="select is-fullwidth">
              <select v-model="gpuType">
                <option
                  v-for="(price, type) in gpuPrices"
                  :key="type"
                  :value="type"
                >
                  {{ type }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="field mb-5 pt-2">
          <label class="label"><b>Number of GPUs</b> that you need</label>
          <div class="control is-fullwidth">
            <div class="select is-fullwidth">
              <select v-model.number="numberOfGPUs">
                <option v-for="n in 10" :key="n" :value="n">
                  {{ n }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="field pt-2">
          <label class="label mb-3">How many <b>days / hours</b> do you need?</label>
          <div class="is-flex is-align-items-baseline">
            <div
              class="control mr-5 is-flex is-align-items-center"
              style="width: 200px"
            >
              <div class="select is-fullwidth">
                <select v-model="durationType">
                  <option value="hours">
                    Hours
                  </option>
                  <option value="days">
                    Days
                  </option>
                </select>
              </div>
            </div>
            <div class="control" style="width: 100%">
              <div class="field">
                <input
                  v-model.number="amount"
                  class="slider"
                  type="range"
                  min="1"
                  :max="durationType === 'hours' ? 24 : 30"
                >
                <p style="margin-top: -5px;" class="has-text-centered">{{ amount }} {{ durationType }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-half mb-5">
        <div class="box has-background-grey-lighter">
          <div class="is-flex is-align-items-center mb-4">
            <p>Estimated price with</p>
            <img
              class="ml-2"
              style="width: 120px"
              src="~assets/img/Nosana_Logo_horizontal_color_black.svg"
              alt="Nosana"
            >
          </div>
          <p class="mb-3">
            GPU Type: <br><strong>{{ gpuType }} {{ numberOfGPUs }}x</strong>
          </p>
          <p>
            Duration: <br><strong>{{ amount }} {{ durationType }}</strong>
          </p>
          <div class="is-flex is-justify-content-flex-end">
            <div class="pt-2 is-flex is-align-items-flex-end mb-3">
              <span
                class="is-size-5 mr-1 has-text-weight-semibold"
                style="line-height: 18px"
              >$</span>
              <h4 class="title is-2" style="line-height: 28px">
                <span v-if="estimatedPrice">
                  {{ estimatedPrice.toFixed(2) }}
                </span>
                <span v-else>...</span>
              </h4>
            </div>
          </div>
          <a
            href="https://dashboard.nosana.com/markets"
            target="_blank"
            class="button is-black is-medium is-fullwidth mt-5"
            @click="trackLinkClick('clients_see_all_gpus_click')"
          >
            See all GPUs
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gpuPrices: null,
      gpuType: 'NVIDIA GeForce RTX 4090',
      numberOfGPUs: 1,
      durationType: 'hours',
      amount: 1
    };
  },
  computed: {
    estimatedPrice () {
      if (this.gpuPrices) {
        const pricePerHour = this.gpuPrices[this.gpuType] * 1.1;
        const hours =
          this.durationType === 'days' ? this.amount * 24 : this.amount;
        return pricePerHour * this.numberOfGPUs * hours;
      } else {
        return null;
      }
    }
  },
  mounted () {
    this.getMarkets();
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
    async getMarkets () {
      try {
        const response = await fetch(
          'https://dashboard.k8s.prd.nos.ci/api/markets/?type=PREMIUM'
        );
        const data = await response.json();
        const excludeMarkets = [
          'columbia-uni-4090',
          'sogni-4090',
          'alpha-4090',
          'nvidia-8x-a5000'
        ];
        const markets = data.filter(
          market =>
            !excludeMarkets.includes(market.slug) && market.type === 'PREMIUM' && !market.slug.includes('laptop')
        );

        const pricePerGpu = {};
        markets.forEach((market) => {
          if (market.gpu_types && market.gpu_types.length) {
            market.gpu_types.forEach((gpu) => {
              pricePerGpu[gpu] = market.usd_reward_per_hour;
            });
          }
        });
        this.gpuPrices = pricePerGpu;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.slider {
  width: 100%;
}
input[type="range"] {
  accent-color: black;
}
</style>
