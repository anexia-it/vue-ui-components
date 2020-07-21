<template>
  <div id="app">
    <!-- you can set a image as prop or default img just a anx-logo -->
    <anx-header :langSwitch="true" :img="require('@/assets/anexia.svg')" />
    <div class="space"></div>
    <anx-header :langSwitch="true" :menus="items" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AnxHeader from "@/components/AnxHeader.vue";

@Component({
  components: {
    AnxHeader
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

.space {
  height: 20px;
}
</style>
