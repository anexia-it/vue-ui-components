<template>
  <hr :style="cssProps" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxHrLine extends Vue {
  @Prop({ default: "$anx-primary-grey-light" }) color!: string;
  @Prop({ default: "40px" }) margin!: string;

  get cssProps() {
    return {
      "--color": this.color,
      "--margin": this.margin
    };
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
hr {
  background-color: var(--color);
  height: 1px;
  margin-top: var(--margin);
  margin-bottom: var(--margin);
  border: 0;
  box-sizing: inherit;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
