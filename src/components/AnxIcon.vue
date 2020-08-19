<template>
  <component
    :is="iconName"
    class="anx-icon"
    :width="width"
    :height="height"
    :margin="margin"
  ></component>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component({})
export default class AnxIcon extends Vue {
  @Prop({ default: "anexia" }) icon!: string;
  @Prop({ default: "" }) width!: string;
  @Prop({ default: "" }) height!: string;
  @Prop({ default: "" }) margin!: string;

  get iconName() {
    if (this.icon.indexOf("anx-icon") === 0) return this.icon;
    else return `anx-icon-${this.icon}`;
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-icon {
  display: inline-block;
}
</style>
