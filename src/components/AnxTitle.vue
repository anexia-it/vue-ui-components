<template>
  <component
    :is="size"
    :class="`anx-title size-${size} ` + (noMargin !== null ? 'no-margin ' : '')"
  >
    <slot>
      {{ text }}
    </slot>
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxContent extends Vue {
  /** This is the size of the header (h1, h2, h3). Note: This will be used as tag name */
  @Prop({ default: "h1" }) size!: string;

  /** No margin after the title */
<<<<<<< HEAD
  @Prop({ default: null }) noMargin!: boolean | null;
=======
  @Prop({ default: null }) noMargin!: boolean;

  /** The text, to be displayed (can also be set via slot) */
  @Prop({ default: "" }) text!: string;
>>>>>>> 8901a73... fix: anx title changes tags to header
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
    font-weight: 500;
  }

  &.size-h2 {
    font-size: 23px;
    line-height: 27.6px;
    font-weight: 500;
  }

  &.size-h3 {
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
    color: $anx-lightest-grey-dark;
  }
}
</style>
