<template>
  <footer class="footer py-6 px-4">
    <div class="container">
      <nav
        class="is-transparent"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="container">
          <div class="columns py-5">
            <div class="column is-7">
              <img
                src="~/assets/img/Nosana_Logo_horizontal_color_white.svg"
                class="logo mb-2"
                style="height: 40px; margin-left: -5px"
              >
              <socials class="mb-4" />
            </div>
            <div class="column is-5">
              <div class="columns">
                <div class="column is-4">
                  <h4 class="title is-4 mb-3 has-text-white">
                    Product
                  </h4>
                  <nuxt-link
                    class="navbar-item"
                    to="/hosts"
                    exact-active-class="is-active"
                  >
                    <div>Become a GPU host</div>
                  </nuxt-link>
                  <nuxt-link
                    class="navbar-item"
                    to="/clients"
                    exact-active-class="is-active"
                  >
                    <div>Deploy AI workloads</div>
                  </nuxt-link>
                  <!-- <a
                    target="_blank"
                    href="https://explore.nosana.com"
                    class="navbar-item"
                    to="/docs"
                    exact-active-class="is-active"
                  >
                    <div>Explorer</div>
                  </a> -->
                </div>
                <div class="column is-4">
                  <h4 class="title is-4 mb-3 has-text-white">
                    Network
                  </h4>
                  <nuxt-link
                    class="navbar-item"
                    to="/team"
                    exact-active-class="is-active"
                  >
                    <div>About Nosana</div>
                  </nuxt-link>
                  <nuxt-link
                    target="_blank"
                    class="navbar-item"
                    to="/token"
                    exact-active-class="is-active"
                  >
                    <div>$NOS Token</div>
                  </nuxt-link>
                  <a
                    target="_blank"
                    href="https://stake.nosana.com"
                    class="navbar-item"
                    to="/docs"
                    exact-active-class="is-active"
                  >
                    <div>Staking</div>
                  </a>
                </div>
                <div class="column is-4">
                  <h4 class="title is-4 mb-3 has-text-white">
                    Resources
                  </h4>
                  <a
                    href="https://docs.nosana.com"
                    class="navbar-item"
                    to="/docs"
                    exact-active-class="is-active"
                  >
                    <div>Docs</div>
                  </a>
                  <nuxt-link
                    class="navbar-item"
                    to="/blog"
                    exact-active-class="is-active"
                  >
                    <div>Blog</div>
                  </nuxt-link>
                  <nuxt-link
                    class="navbar-item"
                    to="/support"
                    exact-active-class="is-active"
                  >
                    <div>Support</div>
                  </nuxt-link>
                  <nuxt-link
                    class="navbar-item"
                    to="/brand"
                    exact-active-class="is-active"
                  >
                    <div>Brand Assets</div>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div class="py-4 has-radius">
        <small class="is-size-7 has-text-white">© Nosana Network 2025 The Nosana Network Authors Documentation
          Distributed under CC BY 4.0</small>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: black;
  .navbar-menu {
    background-color: black;
  }
  .navbar-item {
    color: white;
    padding: 4px 0px;
    &:hover {
      background: transparent;
    }
    &.is-active {
      background: transparent !important;
    }
  }
}
.footer {
  .navbar-menu {
    display: flex !important;
  }
  border-top: 1px solid rgba($accent, 0.1);
}
</style>
