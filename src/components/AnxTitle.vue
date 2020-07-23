<template>
  <div :class="`anx-title size-${size}`">
    <span>
      <slot />
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxContent extends Vue {
  /** This is the size of the header (h1, h2, h3) */
  @Prop({ default: "h1" }) size!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.anx-title {
  text-transform: uppercase;
  color: $anx-primary-blue;
  font-family: "MetaWebPro";
  margin-bottom: 20px;

  &.size-h1 {
    font-size: 28px;
  }

  &.size-h2 {
    font-size: 23px;
    line-height: 27.6px;
  }

  &.size-h3 {
    font-size: 18px;
    line-height: 24px;
    color: $anx-lightest-grey-dark;
  }
}
</style>
