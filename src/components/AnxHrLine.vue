<template>
  <hr :style="cssProps" :class="`anx-hr-line ${color}`" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxHrLine extends Vue {
  /** The color of the hr line (grey, green, blue) */
  @Prop({ default: "grey" }) color!: string;
  @Prop({ default: "40px" }) margin!: string;

  get cssProps() {
    return {
      "--margin": this.margin
    };
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-hr-line {
  height: 1px;
  margin-top: var(--margin);
  margin-bottom: var(--margin);
  border: 0;
  box-sizing: inherit;

  &.grey {
    background-color: $anx-primary-grey-light;
  }

  &.green {
    background-color: $anx-primary-green;
  }

  &.blue {
    background-color: $anx-primary-blue;
  }
}
</style>
