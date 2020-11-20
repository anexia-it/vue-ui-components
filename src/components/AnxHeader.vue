<template>
  <div class="header" :style="cssProps">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="header-container d-flex">
            <div class="header-image">
              <slot name="icon">
                <anx-icon
                  alt="anx-header-logo"
                  :icon="icon"
                  :height="iconSize"
                  :width="iconSize"
                />
              </slot>
            </div>
            <div class="header-language-nav" v-if="i18n">
              <div
                :class="{ 'header-lang-switcher-top-nav': true, show: !menus }"
              >
                <AnxLanguageSwitcher
                  :i18n="i18n"
                  @localeChange="localeChange($event)"
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="header-nav-menu" v-if="menus">
            <div class="menu-text left">
              <!--add DTO -->
              <anx-link
                v-for="menu in menus"
                :key="menu.id"
                :href="`${menu.link}`"
                class="anx-link-header"
                :disabled="isLinkActive(menu.link) ? null : true"
              >
                {{ menu.menu }}
              </anx-link>
            </div>
            <div
              class="menu-text right header-lang-switcher-bottom-nav"
              v-if="i18n"
            >
              <div v-if="menus">
                <AnxLanguageSwitcher
                  :i18n="i18n"
                  @localeChange="localeChange($event)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import AnxIcon from "./AnxIcon.vue";
import AnxLink from "./AnxLink.vue";
import AnxLanguageSwitcher from "./AnxLanguageSwitcher.vue";
import VueI18n from "vue-i18n";
import Url from "url-parse";

@Component({
  components: { AnxLanguageSwitcher, AnxIcon, AnxLink }
})
export default class AnxHeader extends Vue {
  /** The i18n instance from the root vue project */
  @Prop({ default: null }) i18n!: VueI18n | null;
  /** The icon for the header */
  @Prop({ default: "anexia" }) icon!: string;
  /** The icon size for the header */
  @Prop({ default: "45px" }) iconSize!: string;
  /** The menus for the header */
  @Prop({ default: null }) menus!: Array<{
    menu: string;
    link: string;
  }> | null;
  /**Specify the width of the Header 530px => 500px real width (15px padding for mobile)*/
  @Prop({ default: "530px" }) width!: string;

  /** Emit the @localeChange event when the locale is changed via the AnxLanguageSwitcher */
  @Emit("localeChange")
  localeChange(locale: string) {
    return locale;
  }

  get cssProps() {
    return {
      "--width": this.width
    };
  }

  /** Checks if the specified link matches the window link */
  private isLinkActive(link: string): boolean {
    /** Try to get the current window url via window or $route ($route is more appropriate) */
    let currentUrl = null;
    if (typeof window !== "undefined") currentUrl = window.location.href;
    if (this.$route) currentUrl = this.$route.path;

    /** If the current window url could not be retrieved, we can't compare the urls */
    if (!currentUrl) return false;

    const url = new Url(link);
    const windowUrl = new Url(currentUrl);

    return url.href !== windowUrl.href;
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";

hr {
  background-color: $anx-primary-blue;
  height: 1px;
  margin-top: 1rem;
  margin-bottom: 20px;
  border: 0;
  box-sizing: inherit;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.header-container {
  margin-top: 30px;
  margin-bottom: 10px;

  .header-image {
    font-size: 0px;
  }

  .header-language-nav {
    width: 100%;
    text-align: right;
    margin: auto 0 auto 0;
    color: $anx-primary-blue;
  }
}

.header {
  margin-left: auto;
  margin-right: auto;
  width: var(--width);
  display: flex;

  .header-lang-switcher-top-nav {
    display: none;

    &.show {
      display: block !important;
    }
  }

  @media (max-width: $screen-xs) {
    .header-lang-switcher-top-nav {
      display: block;
    }

    .header-lang-switcher-bottom-nav {
      display: none;
    }
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
}
img {
  height: 45px;
}

.header-nav-menu {
  display: table;
  margin-bottom: 40px;
  width: 100%;
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column-reverse;
    padding-top: none;
  }
  .menu-text {
    .anx-link-header {
      margin-right: 20px;
    }

    &.left {
      float: left;
      padding-top: 0;
      @media screen and (max-width: 500px) {
      }
    }
    &.right {
      float: right;
      padding-top: 0;
      .active {
        color: $anx-primary-green;
      }
      @media screen and (max-width: 500px) {
        float: left;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
