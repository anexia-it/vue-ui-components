<template>
  <div id="app">
    <!-- you can set a image as prop or default img just a anx-logo -->
    <anx-header :img="require('@/assets/anexia.svg')" />
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
export default class App extends Vue {}
</script>
