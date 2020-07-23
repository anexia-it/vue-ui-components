<template>
  <div id="app">
    <!-- you can set a image as prop or default img just a anx-logo -->
    <anx-header :img="require('@/assets/anexia.svg')" />
    <div class="space"></div>
    <anx-header :menus="items" />
    {{ $t("uiplugin.header") }}
    <anx-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AnxHeader from "@/components/AnxHeader.vue";
import AnxFooter from "@/components/AnxFooter.vue";

@Component({
  components: {
    AnxHeader,
    AnxFooter
  }
})
export default class App extends Vue {
  public items: Array<object> = [
    { menu: "Software", link: "/x" },
    { menu: "Hosting", link: "/y" }
  ];
}
</script>
<style lang="scss">
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/bootstrap-grid.scss";
.space {
  height: 20px;
}
</style>
