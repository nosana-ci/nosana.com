<template>
  <div class="box p-0 mt-6 has-border-accent has-background-image mountain-grid">
    <div class="has-limited-width p-6">
      <div class="p-3">
        <h2 class="title is-4">
          Join the movement
        </h2>
        Ready to contribute your compute power to the grid?<br>
        Join our Discord and read the documentation to be fully prepared.
        <p class="mt-4">
          <a href="https://learn.nosana.com" class="is-underlined"><strong class="has-text-accent">Explore the docs &nbsp;&nbsp;↘</strong></a>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mountain-grid {
  max-width: 1920px;
  margin: 0 auto;
  > *{
    position: relative;
  }
  background-image: url('~assets/img/mountain-grid_animated.svg');
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
  position: relative;
  &:before {
    border-radius: 6px;
    position: absolute;
    display: block;
    content: "";
    top:0;
    left:0;
    width:100%;
    height: 100%;
    background: linear-gradient(90deg, #010C04 28.85%, rgba(1, 12, 4, 0) 100%);
  }
  .has-limited-width {
    border-radius: 7px;
    background: linear-gradient(90deg, rgba(10,10,10,1) 85%, rgba(10,10,10,0) 100%);
    @media screen and (max-width: $tablet) {
      background: $black;
      padding: 1.5rem !important;
    }
  }
}
</style>
