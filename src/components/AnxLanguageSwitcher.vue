<template>
  <div v-if="i18n">
    <div class="anx-language-switcher">
      <a
        :class="locale === 'de' ? 'selected' : 'not-selected'"
        @click="setLocale('de')"
      >
        DE
      </a>
      /
      <a
        :class="locale === 'en' ? 'selected' : 'not-selected'"
        @click="setLocale('en')"
      >
        EN
      </a>
    </div>
  </div>
  <div v-else>
    No i18n instance provided!
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import VueI18n from "vue-i18n";

@Component({})
export default class I18nLangSwitcher extends Vue {
  /** The i18n instance from the root vue project */
  @Prop({ default: null }) i18n!: VueI18n;

  private locale = "";

  private setLocale(locale: string) {
    this.locale = locale;
    this.i18n.locale = locale;
  }

  private mounted() {
    this.locale = this.i18n.locale;
    console.log("get locale", this.locale);
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-language-switcher {
  color: $anx-primary-green;
  a,
  a:link,
  a:visited,
  a:focus {
    cursor: pointer;
    margin: 0px;
    color: $anx-primary-white;
    text-decoration: none;
  }
  .selected {
    cursor: pointer;
    color: $anx-primary-white;
    // border-bottom: 1px solid $anx-primary-green;
  }
  a:hover {
    color: $anx-primary-green;
  }

  .not-selected {
    text-decoration: none;
    color: $anx-primary-green;
    cursor: pointer;
  }
}
</style>
