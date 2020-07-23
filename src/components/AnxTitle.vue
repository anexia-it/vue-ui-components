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
  /** This is the size of the header (xl, l, m) */
  @Prop({ default: "xl" }) size!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.anx-title {
  text-transform: uppercase;
  color: $anx-primary-blue;
  font-family: MetaWebPro;
  margin-bottom: 20px;

  &.size-xl {
    font-size: 28px;
  }

  &.size-l {
    font-size: 23px;
  }

  &.size-m {
    font-size: 18px;
  }
}
</style>
