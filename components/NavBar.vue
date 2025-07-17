<template>
  <div>
    <nav
      class="navbar py-1 is-fixed-top"
      role="navigation"
      aria-label="main navigation"
      :class="{ 'menu-expanded': mobileMenu }"
    >
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item p-0 logo-top" to="/">
            <img
              class="logo"
              src="~/assets/img/Nosana_Logo_horizontal_color_white.svg"
            >
          </nuxt-link>

          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            :class="{ 'is-active': mobileMenu }"
            aria-expanded="false"
            data-target="navbar"
            @click="mobileMenu = !mobileMenu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div
          id="navbar"
          class="navbar-menu"
          :class="{ 'is-active': mobileMenu }"
        >
          <div class="navbar-start" />
          <div class="navbar-end is-align-items-center">
            <div class="navbar-item mobile-only" @click="mobileMenu = false">
              <a
                href="https://dashboard.nosana.com/deploy"
                target="_blank"
                class="button is-secondary is-size-6"
              >
                Deploy Now
              </a>
            </div>
            <div class="navbar-item is-hoverable" @click="mobileMenu = false">
              <nuxt-link
                class="navbar-link is-arrowless"
                to="/hosts"
                exact-active-class="is-active"
              >
                <div>Hosting</div>
              </nuxt-link>
            </div>
            <div class="navbar-item" @click="mobileMenu = false">
              <nuxt-link
                class="navbar-link is-arrowless"
                to="/clients"
                exact-active-class="is-active"
              >
                <div>Deploy AI Workloads</div>
              </nuxt-link>
            </div>
            <div
              class="navbar-item has-dropdown is-hoverable"
              @click="mobileMenu = false"
            >
              <a
                class="navbar-link is-arrowless"
                exact-active-class="is-active"
              >
                <div>Network</div>
              </a>
              <div class="navbar-dropdown is-boxed">
                <nuxt-link
                  class="navbar-item"
                  to="/team"
                  exact-active-class="is-active"
                >
                  About Nosana
                </nuxt-link>
                <nuxt-link
                  class="navbar-item"
                  to="/token"
                  exact-active-class="is-active"
                >
                  $NOS Token
                </nuxt-link>
                <a
                  href="https://dashboard.nosana.com/stake/"
                  target="_blank"
                  class="navbar-item"
                >
                  <span>Staking</span>
                </a>
              </div>
            </div>
            <div
              class="navbar-item has-dropdown is-hoverable"
              @click="mobileMenu = false"
            >
              <a class="navbar-link is-arrowless">
                <div>Resources</div>
              </a>
              <div class="navbar-dropdown is-boxed">
                <a href="https://docs.nosana.com" class="navbar-item">
                  <span>Docs</span>
                </a>
                <nuxt-link
                  class="navbar-item"
                  to="/blog"
                  exact-active-class="is-active"
                >
                  <span>Blog</span>
                </nuxt-link>
                <nuxt-link
                  class="navbar-item"
                  to="/blog?tag=events"
                  exact-active-class="is-active"
                >
                  <span>Events</span>
                </nuxt-link>
                <nuxt-link
                  class="navbar-item"
                  to="/support"
                  exact-active-class="is-active"
                >
                  <span>Support</span>
                </nuxt-link>
                <nuxt-link
                  class="navbar-item"
                  to="/brand"
                  exact-active-class="is-active"
                >
                  <span>Brand Assets</span>
                </nuxt-link>
              </div>
            </div>
            <div class="navbar-item desktop-only" @click="mobileMenu = false">
              <a
                href="https://dashboard.nosana.com/"
                target="_blank"
                class="button is-secondary is-size-6"
              >
                Deploy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      mobileMenu: false
    };
  }
};
</script>

<style lang="scss">
.navbar {
  &.is-transparent {
    background: transparent;
  }

  @media screen and (max-width: $tablet) {
    &.menu-expanded {
      background-color: black !important;
    }
  }

  .logo {
    height: 38px;
    max-width: none;
    max-height: none;
    margin-top: 0px;
    margin-right: 8px;
  }

  .navbar-brand {
    .navbar-item {
      &.is-active,
      &:hover {
        color: $primary;
      }
    }
    @media screen and (max-width: $tablet) {
      padding: 0 10px !important;
      .logo-top {
        width: 100%;
        justify-content: center;
      }
      .navbar-burger {
        margin-left: -40px;
      }
    }
  }

  .navbar-menu {
    margin-top: 8px;
    justify-content: center;

    .navbar-item {
      font-weight: 500;
      padding: 10px 20px;
      text-align: center;
      font-size: 0.9rem;
      transition: background 0.2s, color 0.2s;
      position: relative;
      border-radius: 4px;

      &:hover, &.is-active {
        background: rgba(255,255,255,0.10);
        color: $primary;
      }

      .navbar-link {
        position: relative;
        transition: color 0.2s;
        &::after {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background: $primary;
          border-radius: 1px;
          transition: width 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        &:hover::after, &.is-active::after {
          width: 100%;
        }
      }

      @media screen and (max-width: $tablet) {
        &.has-dropdown > a {
          background: $primary;
        }
      }

      &.is-active {
        color: $primary;
        font-weight: 700;

        &:after {
          width: calc(100% - 1.5rem - 15px);
        }
      }
    }
    .navbar-dropdown {
      .navbar-item {
        transition: background 0.2s, color 0.2s, border-left 0.2s, box-shadow 0.2s, transform 0.18s;
        border-left: 3px solid transparent;
        &:hover, &.is-active {
          background: rgba($accent, 0.12);
          color: $primary;
          border-left: 3px solid $accent;
          box-shadow: 0 2px 12px 0 rgba($accent, 0.10);
          transform: translateX(2px) scale(1.03);
        }
      }
    }
  }

  .mobile-only {
    display: none;
  }

  @media screen and (max-width: 1023px) {
    .mobile-only {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .desktop-only {
      display: none;
    }
  }

  @media screen and (min-width: 1024px) {
    .mobile-only {
      display: none;
    }
    .desktop-only {
      display: flex;
    }
  }
}

.navbar {
  background: rgba(0, 0, 0, 0.7);
  @media screen and (max-width: 1023px) {
    .navbar-burger {
      color: #fff;
    }
  }
}

.navbar {
  .navbar-menu {
    .navbar-item .navbar-link {
      color: #fff;
      &:focus {
        background: transparent;
      }
      &.is-active {
        background: transparent;
        text-decoration: underline;
      }
    }
  }
}

@media screen and (max-width: 1023px) {
  .navbar {
    .navbar-menu {
      background-color: black;
      .navbar-item {
        color: #fff;
        &.is-active,
        &:hover {
          color: black;
        }
        .navbar-dropdown {
          .navbar-item {
            &:hover {
              background-color: $grey;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .navbar > .container .navbar-brand,
  .container > .navbar .navbar-brand {
    margin-left: 0;
  }
  .navbar > .container .navbar-menu,
  .container > .navbar .navbar-menu {
    margin-right: 0;
  }
  .navbar .navbar-menu .navbar-item {
    &:hover a.navbar-link {
      background-color: transparent !important;
    }
  }
}
</style>
