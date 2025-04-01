<template>
  <div class="columns is-multiline">
    <div class="is-3 column">
      <div class="has-background-white p-5">
        <div class="has-text-grey-light mt-1">
          Stakers
        </div>
        <h4 class="title is-2 pt-2 is-flex mb-1">
          <ICountUp
            v-if="numberOfStakers"
            :end-val="numberOfStakers"
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
          USD Value Staked
        </div>
        <h4 class="title is-2 pt-2 is-flex mb-1">
          <ICountUp
            v-if="usdStake"
            :end-val="Number(usdStake)"
            :options="{
              enableScrollSpy: true,
              decimalPlaces: 0,
              prefix: '$',
            }"
          />
          <span v-else>...</span>
        </h4>
      </div>
    </div>
    <div class="is-3 column">
      <div class="has-background-white p-5">
        <div class="has-text-grey-light mt-1">
          NOS Marketcap
        </div>
        <h4 class="title is-2 pt-2 is-flex mb-1">
          <ICountUp
            v-if="marketCap"
            :end-val="marketCap"
            :options="{
              enableScrollSpy: true,
              decimalPlaces: 0,
              prefix: '$',
            }"
          />
          <span v-else>...</span>
        </h4>
      </div>
    </div>
    <div class="is-3 column">
      <div class="has-background-white p-5">
        <div class="has-text-grey-light mt-1">
          NOS Price
        </div>
        <h4 class="title is-2 pt-2 is-flex mb-1">
          <ICountUp
            v-if="nosPrice"
            :end-val="nosPrice"
            :options="{
              enableScrollSpy: true,
              decimalPlaces: 2,
              prefix: '$',
            }"
          />
          <span v-else>...</span>
          <span
            v-if="dailyPriceChange !== null && dailyPriceChange < 0"
            class="has-text-danger ml-3 is-size-6 has-text-weight-medium"
          >
            <i class="fas fa-arrow-down pl-1 pr-1" />
            {{ dailyPriceChange.toFixed(2) }}%
          </span>
          <span
            v-else-if="dailyPriceChange !== null"
            class="has-text-secondary ml-3 is-size-6 has-text-weight-medium"
          >
            <i class="fas fa-arrow-up pl-1 pr-1" />
            {{ dailyPriceChange.toFixed(2) }}%
          </span>
        </h4>
      </div>
    </div>
    <div v-if="extended" class="is-3 column">
      <div class="has-background-white p-5">
        <div class="has-text-grey-light mt-1">
          Volume (24h)
        </div>
        <h4 class="title is-2 pt-2 is-flex mb-1">
          <ICountUp
            v-if="volume"
            :end-val="volume"
            :options="{
              enableScrollSpy: true,
              decimalPlaces: 0,
              prefix: '$',
            }"
          />
          <span v-else>...</span>
        </h4>
      </div>
    </div>
    <div v-if="extended" class="is-3 column">
      <div class="has-background-white p-5">
        <div class="has-text-grey-light mt-1">
          Circulating Supply
        </div>
        <h4 class="title is-2 pt-2 is-flex mb-1">
          <ICountUp
            v-if="circulatingSupply"
            :end-val="circulatingSupply"
            :options="{
              enableScrollSpy: true,
              decimalPlaces: 0,
            }"
          />
          <span v-else>...</span>
        </h4>
      </div>
    </div>
    <div
      v-if="extended"
      class="is-3 column"
    >
      <div class="has-background-white p-5">
        <div class="has-text-grey-light mt-1">
          Total Supply
        </div>
        <h4 class="title is-2 pt-2 is-flex mb-1">
          <ICountUp
            v-if="totalSupply"
            :end-val="totalSupply"
            :options="{
              enableScrollSpy: true,
              decimalPlaces: 0,
            }"
          />
          <span v-else>...</span>
        </h4>
      </div>
    </div>
    <div
      v-if="extended"
      class="is-3 column"
    >
      <div class="has-background-white p-5">
        <div class="has-text-grey-light mt-1">
          Fully Diluted Market Cap
        </div>
        <h4 class="title is-2 pt-2 is-flex mb-1">
          <ICountUp
            v-if="fullyDilutedMarketCap"
            :end-val="fullyDilutedMarketCap"
            :options="{
              enableScrollSpy: true,
              decimalPlaces: 0,
              prefix: '$',
            }"
          />
          <span v-else>...</span>
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
import ICountUp from 'vue-countup-v2';
export default {
  components: { ICountUp },
  colorMode: 'light',
  props: {
    extended: {
      type: Boolean,
      default () {
        return false;
      }
    }
  },
  data () {
    return {
      marketCap: null,
      nosPrice: null,
      numberOfStakers: null,
      usdStake: null,
      volume: null,
      circulatingSupply: null,
      totalSupply: null,
      fullyDilutedMarketCap: null,
      dailyPriceChange: null
    };
  },
  mounted () {
    this.getStatistics();
  },
  methods: {
    async getStatistics () {
      try {
        const response = await fetch(
          'https://dashboard.k8s.prd.nos.ci/api/stats/'
        );
        const data = await response.json();
        console.log('data', data);
        if (data) {
          this.nosPrice = data.price;
          this.marketCap = data.marketCap;
          this.numberOfStakers = data.stakers;
          this.usdStake = data.usdValueStaked;
          this.volume = data.dailyVolume;
          this.totalSupply = data.totalSupply;
          this.circulatingSupply = data.circulatingSupply;
          this.fullyDilutedMarketCap = data.fullyDilutedMarketCap;
          this.dailyPriceChange = data.dailyPriceChange;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
<style scoped lang="scss">
@media screen and (max-width: $tablet) {
  h4 {
    justify-content: center;
  }
}
</style>
