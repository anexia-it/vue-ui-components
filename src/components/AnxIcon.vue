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
  /** The name of the icon (With this property, different icons can be loaded) */
  @Prop({ default: "anexia" }) icon!: string;

  /** The width of the icon */
  @Prop({ default: null }) width!: string | null;

  /** The height of the icon */
  @Prop({ default: null }) height!: string | null;

  /** The margin of the icon */
  @Prop({ default: null }) margin!: string | null;

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
