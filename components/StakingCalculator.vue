<template>
  <div>
    <div class="container">
      <div class="columns">
        <div class="column is-4">
          <h3 class="title is-2">
            Staking calculator
          </h3>
          <h4 class="title is-3">
            Stake NOS and receive rewards
          </h4>
          <p class="mb-5 is-size-4">
            By staking $NOS tokens, you not only contribute to the security and
            stability of the network but also earn rewards for your
            participation. Join the staking pool today and be part of the
            decentralized computing revolution with Nosana.
          </p>
          <a
            href="https://dashboard.nosana.com/stake/"
            target="_blank"
            class="has-text-accent has-text-weight-semibold"
          >
            Go to the Staking Dashboard<i class="pl-1 fas fa-chevron-right" />
          </a>
        </div>
        <div class="column is-8">
          <div class="has-background-grey-lighter has-radius p-6">
            <div class="columns">
              <div class="field column is-6">
                <label class="label">$NOS amount</label>
                <div class="is-flex is-align-items-center">
                  <input
                    v-model="amount"
                    class="input is-medium"
                    required
                    min="1"
                    step="0.1"
                    type="number"
                    placeholder="0"
                  >
                  <span class="ml-2 has-text-grey">NOS</span>
                </div>
              </div>

              <div class="field column is-6">
                <label class="label">Unstake period of:</label>
                <div class="control mb-5 is-multiline">
                  <div class="is-flex is-align-items-center">
                    <input
                      v-model="unstakeDays"
                      required
                      class="input is-medium"
                      type="number"
                      :min="unstakeDays"
                      step="1"
                      max="365"
                      placeholder="0"
                      @input="validateUnstakeDays"
                    >
                    <span class="ml-2 has-text-grey">Days</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column is-6">
                <div class="box">
                  <label class="label">Expected daily NOS rewards</label>
                  <div class="is-size-1 has-text-black">
                    <ICountUp
                      v-if="expectedRewards !== null"
                      :end-val="expectedRewards"
                      :options="{
                        decimalPlaces: 2,
                      }"
                    />
                    <span v-else>-</span>
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <div class="box">
                  <label class="label">Staked NOS</label>
                  <div class="is-size-1 has-text-black">
                    <ICountUp
                      v-if="amount !== null"
                      :end-val="Number(amount)"
                    />
                    <span v-else>-</span>
                  </div>
                </div>
              </div>
              <div class="column is-4">
                <div class="box">
                  <label class="label">xNOS Score</label>
                  <div class="is-size-2 has-text-black">
                    <ICountUp v-if="xNOS !== null" :end-val="Number(xNOS)" />
                    <span v-else>-</span>
                  </div>
                </div>
              </div>
              <div class="column is-4">
                <div class="box">
                  <label class="label">Multiplier</label>
                  <div class="is-size-2 has-text-black">
                    <ICountUp
                      :end-val="Number(multiplier)"
                      :options="{
                        decimalPlaces: 2,
                        prefix: 'x',
                      }"
                    />
                  </div>
                </div>
              </div>
              <div class="column is-4">
                <div class="box">
                  <label class="label">APY</label>
                  <div class="is-size-2 has-text-black">
                    <div v-if="APY !== null">
                      <ICountUp
                        :end-val="Number(APY)"
                        :options="{
                          decimalPlaces: 2,
                          suffix: '%',
                        }"
                      />
                    </div>
                    <span v-else>-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ICountUp from 'vue-countup-v2';
const BN = require('bn.js');
const SECONDS_PER_DAY = 24 * 60 * 60;

export default {
  components: {
    ICountUp
  },
  data () {
    return {
      poolInfo: null,
      amount: null,
      unstakeDays: 14,
      stakeTotals: null
    };
  },
  computed: {
    multiplier () {
      const unstakeTime = this.unstakeDays * SECONDS_PER_DAY;
      const multiplierSeconds = (SECONDS_PER_DAY * 365) / 3; // 4 months
      const multiplier = unstakeTime / multiplierSeconds;
      return multiplier + 1;
    },
    xNOS () {
      const formAmount = this.amount ? this.amount : 0;
      return formAmount * this.multiplier;
    },
    APY () {
      if (this.expectedRewards) {
        const apy =
          ((this.expectedRewards * 365) / (this.amount ? this.amount : 0)) *
          100;
        return apy;
      }
      return null;
    },
    expectedRewards () {
      if (!this.stakeTotals || !this.poolInfo) {
        return null;
      }
      const totalXnos = parseFloat(this.stakeTotals.totalXNosStaked) * 1e6;
      const emission = new BN(this.poolInfo.emission, 16).toNumber();
      return (
        ((this.xNOS * 1e6) / (totalXnos + this.xNOS * 1e6)) *
        ((emission / 1e6) * 60 * 60 * 24)
      );
    }
  },
  mounted () {
    this.getPoolInfo();
    this.getStakeTotals();
  },
  methods: {
    async getStakeTotals () {
      try {
        const response = await fetch(
          'https://dashboard.k8s.prd.nos.ci/api/stats'
        );
        this.stakeTotals = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    async getPoolInfo () {
      try {
        // https://dashboard.k8s.prd.nos.ci/api/stake/pool-info
        const response = await fetch(
          'https://dashboard.k8s.prd.nos.ci/api/stake/pool-info'
        );
        this.poolInfo = await response.json();
      } catch (e) {
        console.error('cant fetch rewards info', e);
      }
    },
    validateUnstakeDays () {
      if (this.unstakeDays > 365) {
        this.unstakeDays = 365;
      }
    }
  }
};
</script>
<style scoped lang="scss">
form {
  button {
    width: 100%;
  }
  .column .has-background-grey-lighter {
    height: 100%;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .buttons button {
    width: 45px;
    height: 22px;
  }
}
@media screen and (max-width: $tablet) {
  .p-6 {
    padding: 1.5rem !important;
  }
}
</style>
