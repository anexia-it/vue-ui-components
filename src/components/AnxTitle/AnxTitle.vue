<template>
  <component
    :is="size"
    :style="cssProps"
    :class="
      `anx-title size-${size} ` +
        (noMargin !== null ? 'no-margin ' : '') +
        (noline !== null ? 'no-line ' : '')
    "
  >
    <!-- @slot This slot can be used for setting the text of the title -->
    <slot>{{ text }}</slot>
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import design from "../../assets/scss/_variables.scss";

/**
 * This component is used for rendering titles that match the UI design guidelines
 */
@Component({})
export default class AnxContent extends Vue {
  /**
   * This is the size of the header.
   * Note: This will also be used as tag name (e.g. h1 renders a <h1> tag in the source code)
   * @values h1, h2, h3
   */
  @Prop({ default: "h1" }) size!: string;

  /** No margin after the title */
  @Prop({ default: null }) noMargin!: boolean | null;

  /** The text, to be displayed (can also be set via slot) */
  @Prop({ default: "" }) text!: string;

  /** Do not display a line after the title */
  @Prop({ default: null }) noline!: boolean | null;

  /** The margin after the title */
  @Prop({ default: null }) margin!: string | null;

  get cssProps() {
    return {
      "--margin-bottom":
        this.margin !== null ? this.margin : design.titleSpacing
    };
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.anx-title {
  text-transform: uppercase;
  color: $anx-primary-color;
  margin-top: 0px;
  line-height: 1.2em;
  margin-bottom: var(--margin-bottom);
  font-variant-numeric: lining-nums;

  &.no-margin,
  &:not(.no-line) {
    margin-bottom: 0px !important;
  }

  &.size-h1 {
    font-size: 28px;
    font-weight: 500;
  }

  &.size-h2 {
    font-size: 23px;
    font-weight: 500;
  }

  &.size-h3 {
    font-size: 20px;
    font-weight: 500;
    color: $anx-dark-grey-color-lightest;
  }

  &:not(.no-line):after {
    content: "\a—";
    white-space: pre;
  }
}
</style>
