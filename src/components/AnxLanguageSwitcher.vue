<template>
  <div v-if="i18n">
    <div class="anx-language-switcher">
      <anx-link v-if="locale === 'en'" @click="setLocale('de')">DE</anx-link>
      <span v-else>DE</span>
      <span> / </span>
      <anx-link v-if="locale === 'de'" @click="setLocale('en')">EN</anx-link>
      <span v-else>EN</span>
    </div>
  </div>
  <div v-else>
    No i18n instance provided!
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxLink from "./AnxLink.vue";
import VueI18n from "vue-i18n";

@Component({
  components: {
    AnxLink
  }
})
export default class I18nLangSwitcher extends Vue {
  /** The i18n instance from the root vue project */
  @Prop({ default: null }) i18n!: VueI18n;

  private locale = "";

  private setLocale(locale: string) {
    this.locale = locale;
    this.i18n.locale = locale;
    console.log("ste locale");
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
  span {
    color: $anx-primary-white;
  }
}
</style>
