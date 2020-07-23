<template>
  <div :class="`anx-paragraph anx-paragraph-${size}`">
    <anx-title v-if="title !== null" :size="size" class="anx-paragraph-title">
      {{ title }}
    </anx-title>
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxTitle from "@/components/AnxTitle.vue";

@Component({
  components: {
    AnxTitle
  }
})
export default class AnxParagraph extends Vue {
  /** The title of the paragrapg */
  @Prop({ default: null }) title!: string;

  /** The size of the paragraph (h1, h2 or h3) */
  @Prop({ default: "h1" }) size!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.anx-paragraph {
  &.anx-paragraph-h1 {
    margin-bottom: 40px;
  }

  &.anx-paragraph-h2 {
    margin-bottom: 30px;
  }

  &.anx-paragraph-h3 {
    margin-bottom: 20px;
  }

  .anx-paragraph-title {
    margin-bottom: unset;

    &::after {
      content: "\A\2014";
      white-space: pre;
    }
  }
}
</style>
