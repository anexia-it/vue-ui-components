<template>
  <div>
    <img v-bind:src="getImage()" :style="cssProps" />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component({})
export default class AnxIcon extends Vue {
  @Prop({ default: "" }) img!: string;
  @Prop({ default: "" }) width!: string;

  private getImage() {
    let icon = "";
    if (this.img == "") {
      icon = "anexia.svg";
    } else {
      if (this.img.includes(".svg")) {
        icon = this.img;
      } else {
        icon = this.img + ".svg";
      }
    }
    return require("@/assets/icons/" + icon);
  }

  get cssProps() {
    return {
      "--icon-width": this.width
    };
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
img {
  width: var(--icon-width);
}
</style>
