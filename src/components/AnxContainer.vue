<template>
  <div class="anx-container container">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class AnxContainer extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
