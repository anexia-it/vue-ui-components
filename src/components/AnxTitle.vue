<template>
  <div
    :class="`anx-title size-${size} ` + (noMargin !== null ? 'no-margin ' : '')"
  >
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

  /** No margin after the title */
  @Prop({ default: null }) noMargin!: boolean | null;
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-title {
  text-transform: uppercase;
  color: $anx-primary-blue;
  margin-bottom: 20px;

  &.no-margin {
    margin-bottom: 0px !important;
  }

  &.size-h1 {
    font-size: 28px;
    font-weight: 600;
  }

  &.size-h2 {
    font-size: 23px;
    line-height: 27.6px;
    font-weight: 600;
  }

  &.size-h3 {
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
    color: $anx-lightest-grey-dark;
  }
}
</style>
