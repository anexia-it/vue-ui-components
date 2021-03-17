<template>
  <div class="header anx-header" :style="cssProps">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="header-container d-flex">
            <div class="header-image anx-header-image">
              <anx-link
                :href="iconUrl"
                no-style
                :disabled="iconUrl == null ? true : null"
              >
                <slot name="icon">
                  <anx-icon
                    alt="anx-header-logo"
                    :icon="icon"
                    :height="iconSize"
                    :width="iconSize"
                  />
                </slot>
              </anx-link>
            </div>
            <div class="header-language-nav" v-if="i18n">
              <slot name="header-top-right">
                <div
                  :class="{
                    'header-lang-switcher-top-nav': true,
                    show: !menus
                  }"
                >
                  <AnxLanguageSwitcher
                    v-if="i18nOptions !== null"
                    :i18n="i18n"
                    :languages="i18nOptions"
                    @localeChange="localeChange($event)"
                  />
                  <AnxLanguageSwitcher
                    v-else
                    :i18n="i18n"
                    @localeChange="localeChange($event)"
                  />
                </div>
              </slot>
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
                :disabled="isLinkActive(menu) ? null : true"
                :external="menu.external ? true : null"
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
                  v-if="i18nOptions !== null"
                  :i18n="i18n"
                  :languages="i18nOptions"
                  @localeChange="localeChange($event)"
                />
                <AnxLanguageSwitcher
                  v-else
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
  /** Require the url module (import can't be used because it does not have @types) */
  Url = require("url-parse");

  /** The i18n instance from the root vue project */
  @Prop({ default: null }) i18n!: VueI18n | null;
  /** The options that will be passed to the anx-language-switcher */
  @Prop({ default: null }) i18nOptions!: Array<{}> | null;
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
  /** The url for the click on the icon (set to null to disable) */
  @Prop({ default: "/" }) iconUrl!: string | null;

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

  /** Checks if the specified link should be active in the header (active means clickable) */
  private isLinkActive(menu: {
    menu: string;
    link: string;
    external: boolean;
    activeRegex: RegExp;
  }): boolean {
    const link = menu.link;

    /** Try to get the current window url via window or $route ($route is more appropriate) */
    let currentUrl = null;
    if (typeof window !== "undefined") currentUrl = window.location.href;
    if (this.$route) currentUrl = this.$route.path;

    /** If the current window url could not be retrieved, we can't compare the urls */
    if (!currentUrl) return false;

    const url = new this.Url(link);
    const windowUrl = new this.Url(currentUrl);

    /** URL must not always be an exact match to be highlighted, you can also provide a regex */
    let matches = false;
    matches = url.href === windowUrl.href;
    if (!matches && menu.activeRegex) {
      matches = windowUrl.href.match(menu.activeRegex) !== null ? true : false;
    }

    /** Link is only active, if it doesn't match. Otherwise it is deactivated (not clickable) */
    return !matches;
  }
}
</script>

<!-- Scoped css only for this component -->
<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.header-container {
  margin-top: 30px;

  .header-image {
    font-size: 0px;
    height: 45px;
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

<!-- Style for injected header image -->
<style lang="scss">
@import "../assets/scss/_variables.scss";

.anx-header {
  .anx-header-image {
    img {
      height: 45px;
    }
  }
}
</style>
