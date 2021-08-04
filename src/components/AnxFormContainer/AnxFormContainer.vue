<template>
  <div class="anx-form-container">
    <!-- @slot use this for your input components that should be grouped together -->
    <slot />
  </div>
</template>

<style lang="scss">
@import "../../assets/scss/_variables.scss";

.anx-form-container {
  margin-bottom: $anx-form-components-spacing;

  div {
    margin-bottom: 10px !important;

    &:last-child {
      margin-bottom: 0px;
    }
  }
}
</style>
