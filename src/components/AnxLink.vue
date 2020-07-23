<template>
  <a class="anx-link">
    <slot />
  </a>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class AnxLink extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.anx-link {
  color: $anx-primary-green;
  outline: none !important;
  text-decoration: none;

  &:hover {
    color: $anx-primary-green;
    cursor: pointer;
    border-bottom: 1px solid $anx-primary-green;
  }
}
</style>
