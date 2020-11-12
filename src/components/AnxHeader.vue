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
          <anx-hr-line margin-top="20px" margin-bottom="20px" color="blue" />
          <div class="header-nav-menu" v-if="menus">
            <div class="menu-text left">
              <!--add DTO -->
              <anx-link
                v-for="menu in menus"
                :key="menu.id"
                :href="`${menu.link}`"
                class="anx-link-header"
                :disabled="isLinkActive(menu.link)"
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
import AnxHrLine from "./AnxHrLine.vue";
import AnxIcon from "./AnxIcon.vue";
import AnxLink from "./AnxLink.vue";
import AnxLanguageSwitcher from "./AnxLanguageSwitcher.vue";
import VueI18n from "vue-i18n";

@Component({
  components: { AnxHrLine, AnxLanguageSwitcher, AnxIcon, AnxLink }
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
    /** Checking if the window is defined. On the nuxt server side, the window will be undefinded and the following code of this function would throw an error */
    if (typeof window === "undefined") return false;

    const path = this.formatPath(window.location.pathname);

    return path === this.formatPath(link);
  }

  /** Adds a / to the end of the path if it is not present */
  private formatPath(path: string | null): string {
    if (!path) {
      return "";
    }

    if (path[path.length - 1] !== "/") {
      path += "/";
    }

    return path;
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

.header-container {
  margin-top: 30px;

  .header-image {
    font-size: 0px;
    height: 45px;

    img {
      height: 45px;
    }
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

      &:last-of-type {
        margin-right: 0;
      }
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
