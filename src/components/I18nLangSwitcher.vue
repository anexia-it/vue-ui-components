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
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
//import 'vue-i18n'

@Component({})
export default class I18nLangSwitcher extends Vue {
  private setLocale (locale: string) {
    this.$i18n.locale = locale
  }
 
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.language-switcher {
  color: $anx-primary-white;
  a,
  a:link,
  a:visited,
  a:focus {
    cursor: pointer;
    margin: 0px;
    color: $anx-primary-white;
    text-decoration: none;
  }
  a:hover {
    color: $anx-primary-green;
  }
  .selected{
    color: $anx-primary-green !important;
    cursor: pointer;
  }

  .not-selected {
    // color: $anx-primary-green;
    cursor: pointer;
  }
}
</style>
