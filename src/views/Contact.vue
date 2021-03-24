<template>
  <anx-global id="app">
    <anx-header
      :menus="items"
      :i18n="$i18n"
      :icon-url="null"
      @localeChange="localeChange($event)"
    >
      <template v-slot:icon>
        <img
          alt="anx-header-logo"
          v-bind:src="require('../assets/img/anexia-logo.svg')"
        />
      </template>
    </anx-header>
    <div class="space"></div>

    <anx-container>
      <anx-contact />
    </anx-container>

    <anx-footer
      :links="[
        { text: 'Impressum', link: '#' },
        { text: 'AGB', link: '#' }
      ]"
    >
      <template v-slot:icon>
        <img
          class="anx-logo-footer"
          alt="anx-logo-footer"
          v-bind:src="require('../assets/img/anexia-logo.svg')"
          width="56px"
          height="23px"
        />
      </template>
    </anx-footer>
  </anx-global>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AnxContact from "@/components/AnxContact.vue";
import AnxContainer from "@/components/AnxContainer.vue";
import AnxFooter from "@/components/AnxFooter.vue";
import AnxGlobal from "@/components/AnxGlobal.vue";
import AnxHeader from "@/components/AnxHeader.vue";

@Component({
  components: {
    AnxContact,
    AnxContainer,
    AnxFooter,
    AnxGlobal,
    AnxHeader
  }
})
export default class Login extends Vue {
  public items: Array<object> = [
    { menu: "Kitchensink", link: "/kitchensink" },
    { menu: "Login", link: "/login" },
    { menu: "Crud", link: "/crud" },
    { menu: "Contact", link: "/contact" }
  ];
}
</script>
