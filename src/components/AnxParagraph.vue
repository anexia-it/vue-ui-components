<template>
  <div :class="`anx-paragraph anx-paragraph-${size}`">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxParagraph extends Vue {
  /** The size of the paragraph (s, m or l) */
  @Prop({ default: "l" }) size!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.anx-paragraph {
  &.anx-paragraph-l {
    margin-bottom: 40px;
  }

  &.anx-paragraph-m {
    margin-bottom: 30px;
  }

  &.anx-paragraph-s {
    margin-bottom: 20px;
  }
}
</style>
