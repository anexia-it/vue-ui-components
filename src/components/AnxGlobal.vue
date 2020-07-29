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
@import "../assets/scss/fonts.scss";
@import "../assets/scss/_variables.scss";
@import "../assets/scss/bootstrap-grid.scss";

html {
  body {
    margin: 0px !important;
    background-color: $anx-dark-blue;
    color: $anx-lightest-grey-dark;
    font-size: 16px;

    .text-uppercase {
      text-transform: uppercase;
    }

    span {
      &.f-100 {
        font-weight: 100;
      }
      &.f-200 {
        font-weight: 200;
      }
      &.f-300 {
        font-weight: 300;
      }
      &.f-400 {
        font-weight: 400;
      }
      &.f-500 {
        font-weight: 500;
      }
      &.f-600 {
        font-weight: 600;
      }
      &.f-700 {
        font-weight: 700;
      }
      &.f-800 {
        font-weight: 800;
      }
      &.f-900 {
        font-weight: 900;
      }
    }
  }
}
</style>
