<template>
  <div v-if="i18n">
    <div class="anx-language-switcher">
      <label v-for="(lang, key) in languages" :key="lang.code">
        <anx-link
          v-if="locale !== lang.code"
          @click="setLocale(lang.code)"
          :href="lang.link"
        >
          {{ lang.text }}
        </anx-link>
        <span v-else>{{ lang.text }}</span>
        <span v-if="key != languages.length - 1"> / </span>
      </label>
    </div>
  </div>
  <div v-else>
    No i18n instance provided!
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import AnxLink from "./AnxLink.vue";
import VueI18n from "vue-i18n";

@Component({
  components: {
    AnxLink
  }
})
export default class I18nLangSwitcher extends Vue {
  /** The i18n instance from the root vue project */
  @Prop({ default: null }) i18n!: VueI18n | null;

  /**
   * With this property, the different languages that
   * will be selectable in the language switcher can
   * be set
   */
  @Prop({
    default: [
      {
        code: "de",
        link: "#",
        text: "DE"
      },
      {
        code: "en",
        link: "#",
        text: "EN"
      }
    ]
  })
  languages!: Array<{}>;

  /** Emit the changes languages as @localeChange event */
  @Emit("localeChange")
  setLocale(locale: string) {
    /** Set the locale in the property */
    this.locale = locale;

    /** Set the locale for the i18n instance if provided */
    if (this.i18n !== null) {
      this.i18n.locale = locale;
    }

    return locale;
  }

  /** The current locale */
  private locale = "";

  /** Sync the current locale with the i18n locale on mount */
  private mounted() {
    if (this.i18n) {
      this.locale = this.i18n.locale;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-language-switcher {
  span {
    font-weight: 500;
    color: $anx-primary-white;
  }
}
</style>
