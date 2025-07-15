<template>
  <div>
    <section class="section home-block">
      <BackgroundParallax />
      <div class="container">
        <div class="columns is-centered mt-6 mt-mobile-0">
          <div
            class="column is-8 pt-6 has-text-centered has-background-black-blur-false has-text-white"
          >
            <h1 class="title pt-6 is-spaced site-title has-text-white">
              Affordable GPU Rental for<br> AI Inference at Scale
            </h1>
            <div class="py-2">
              <p
                class="block has-limited-width-big is-size-5"
                style="margin: 0 auto"
              >
                Nosana is your go-to GPU marketplace for AI inference.
                Save up to 6x on compute costs and scale your AI workloads effortlessly.
              </p>
            </div>
            <a
              href="https://dashboard.nosana.com/deploy"
              target="_blank"
              class="button is-white is-medium mt-5"
              style="max-width: 350px; width: 100%"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import BackgroundParallax from './BackgroundParallax.vue';

export default {
  components: { BackgroundParallax }
};
</script>
<style lang="scss" scoped>
@import "bulma/sass/utilities/mixins";
.home-block {
  position: relative;
  min-height: 660px;
  overflow: hidden;
  margin-top: -5rem;
}

.bg-scroll {
  background-image: url("~assets/img/home/bg.jpg");
}

@include touch {
  .home-block {
    min-height: auto;
    padding-top: 80px;
  }
  .mt-mobile-0 {
    margin-top: 0 !important;
  }
}

@media screen and (max-width: $tablet) {
  .button {
    margin-left: 0 !important;
    margin-top: 10px;
  }
}
</style>
