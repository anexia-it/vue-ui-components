<template>
  <hr :style="cssProps" :class="`anx-hr-line ${color}`" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

/**
 * This component is like a simple *\<hr\>* html tag with some features and predefined layout.
 */
@Component({})
export default class AnxHrLine extends Vue {
  /**
   * The color of the hr line (the colors are predefined)
   * @values grey, green, blue
   */
  @Prop({ default: "grey" }) color!: string;

  /** The margin top and bottom */
  @Prop({ default: "40px" }) margin!: string;

  /** The margin top (if set, margin property will be overwritten) */
  @Prop({ default: null }) marginTop!: string | null;

  /** The margin bottom (if set, margin property will be overwritten) */
  @Prop({ default: null }) marginBottom!: string | null;

  get cssProps() {
    return {
      "--marginTop": this.marginTop !== null ? this.marginTop : this.margin,
      "--marginBottom":
        this.marginBottom !== null ? this.marginBottom : this.margin
    };
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.anx-hr-line {
  height: 1px;
  margin-top: var(--marginTop);
  margin-bottom: var(--marginBottom);
  border: 0;
  box-sizing: inherit;

  &.grey {
    background-color: $anx-light-grey-color;
  }

  &.green {
    background-color: $anx-secondary-color;
  }

  &.blue {
    background-color: $anx-primary-color;
  }
}
</style>
