<template>
  <footer class="footer-bar boxed-footer py-6 px-4">
    <div class="container">
      <div class="footer-content columns is-variable is-8 is-multiline">
        <div class="column is-4 has-text-centered-mobile mb-5 mb-0-tablet">
          <img
            src="~/assets/img/Nosana_Logo_horizontal_color_white.svg"
            class="logo mb-3"
            style="height: 48px; margin-left: 0"
          >
          <div class="footer-socials mt-3 mb-4">
            <socials />
          </div>
        </div>
        <div class="column is-2">
          <h4 class="footer-title mb-3">
            Product
          </h4>
          <nuxt-link class="footer-link" to="/hosts">
            Become a GPU host
          </nuxt-link>
          <nuxt-link class="footer-link" to="/clients">
            Deploy AI workloads
          </nuxt-link>
        </div>
        <div class="column is-2">
          <h4 class="footer-title mb-3">
            Network
          </h4>
          <nuxt-link class="footer-link" to="/team">
            About Nosana
          </nuxt-link>
          <nuxt-link class="footer-link" to="/token">
            $NOS Token
          </nuxt-link>
          <a class="footer-link" href="https://dashboard.nosana.com/stake" target="_blank">
            Staking
          </a>
        </div>
        <div class="column is-2">
          <h4 class="footer-title mb-3">
            Resources
          </h4>
          <a class="footer-link" href="https://docs.nosana.com" target="_blank">
            Docs
          </a>
          <nuxt-link class="footer-link" to="/blog">
            Blog
          </nuxt-link>
          <nuxt-link class="footer-link" to="/support">
            Support
          </nuxt-link>
          <nuxt-link class="footer-link" to="/brand">
            Brand Assets
          </nuxt-link>
        </div>
      </div>
      <div class="footer-divider" />
      <div class="py-4 has-radius has-text-centered">
        <small class="is-size-7 has-text-white">© Nosana Network 2025 The Nosana Network Authors.
          Documentation distributed under CC BY 4.0</small>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-bar.boxed-footer {
  background: #101010;
  border-radius: 1.5rem 1.5rem 0 0;
  box-shadow: 0 -2px 24px rgba(16, 232, 12, 0.07), 0 -1.5px 6px rgba(0,0,0,0.03);
  border-top: 1px solid rgba(16, 232, 12, 0.08);
  margin-top: 3rem;
  padding-bottom: 0;
}
.footer-content {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 1.5rem;
}
.footer-title {
  color: #10E80C;
  font-weight: 700;
  font-size: 1.1em;
  letter-spacing: 0.01em;
}
.footer-link {
  display: block;
  color: #fff;
  opacity: 0.85;
  margin-bottom: 0.5rem;
  font-size: 1em;
  text-decoration: none;
  transition: color 0.2s, opacity 0.2s;
}
.footer-link:hover {
  color: #10E80C;
  opacity: 1;
}
.footer-socials {
  display: flex;
  justify-content: flex-start;
  gap: 1.2rem;
}
.footer-divider {
  border-top: 1px solid #222;
  margin: 0 auto 1.5rem auto;
  width: 100%;
  max-width: 900px;
  opacity: 0.2;
}
.logo {
  display: block;
  margin: 0 auto 0.5rem auto;
}
@media screen and (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: stretch;
    text-align: left;
    gap: 2rem;
  }
  .footer-title {
    margin-top: 2rem;
    text-align: left;
  }
  .footer-link {
    margin-left: 0;
    margin-right: 0;
    text-align: left;
  }
  .logo {
    margin-left: 0;
    margin-right: 0;
  }
  .footer-socials {
    justify-content: center;
  }
}
</style>
