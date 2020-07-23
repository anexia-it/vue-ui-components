<template>
  <div class="anx-global">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

/**
 * This component contains global styles for the ANX application
 * Every content has to be inside this component
 */
@Component({})
export default class AnxGlobal extends Vue {}
</script>

<style lang="scss">
@import "@/assets/scss/fonts.scss";
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/bootstrap-grid.scss";

html {
  body {
    margin: 0px !important;
    background-color: $anx-dark-blue;
  }
}
</style>
