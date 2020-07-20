<template>
  <div>
    <div class="language-switcher">
      <a
        :class="$i18n.locale === 'de' ? 'selected' : 'not-selected'"
        @click="setLocale('de')"
      >
        DE
      </a>
      /
      <a
        :class="$i18n.locale === 'en' ? 'selected' : 'not-selected'"
        @click="setLocale('en')"
      >
        EN
      </a>
      <a href="/de">DE</a>
      /
      <a href="/en">EN</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import 'vue-i18n'

@Component({})
export default class I18nLangSwitcher extends Vue {
  private setLocale (locale: string) {
    // this.$store.commit('setLocale', locale)
    this.$i18n.locale = locale
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
.language-switcher {

  display: inline-block;
  color: $anx-primary-white !important;
  a {
   &:any-link { color: green } 

    margin: 0px;
    color: $anx-primary-white !important;
  }

  .selected {
    color: #fff !important;
    cursor: initial;
  }

  .not-selected {
    color: $anx-primary-green;
    cursor: pointer;
  }
}
