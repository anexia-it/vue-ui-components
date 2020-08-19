<template>
  <div class="anx-container container" :style="cssProps">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxContainer extends Vue {
  /**Specify the width of the Container 530px => 500px real width (15px padding for mobile) */
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
