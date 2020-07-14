<template>
  <div id="app">
    <AnxHeader />
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
