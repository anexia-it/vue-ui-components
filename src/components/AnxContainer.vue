<template>
  <div class="anx-container container" :width="width" :style="cssProps">
    <!-- @slot use this slot for content inside the conatiner -->
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

/**
 * The *anx-container* is part of the **grid system** used in the ui tool.
 */
@Component({})
export default class AnxContainer extends Vue {
  /** Specified the width of the Container. Note that 30px are used for padding. So a width of 530px would actually be 500px. */
  @Prop({ default: "530px" }) width!: string;

  get cssProps() {
    return {
      "--width": this.width
    };
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-container {
  max-width: var(--width);
}
</style>
