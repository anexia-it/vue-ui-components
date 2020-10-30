<template>
  <component
    v-if="title === null"
    :is="element"
    :class="
      `anx-paragraph anx-paragraph-${size} ` +
        (hint !== null ? 'hint ' : '') +
        (inverse !== null ? 'inversed-colors' : '')
    "
  >
    <slot />
  </component>

  <!-- 
  We have to put the AnxTitle outside of the <component> because
  if we use <p> as <component>, the browser would automatically
  change our <p> to a <div> because we can't have an <h1> inside
  a <p>. This would throw an error in nuxt.
  -->
  <div v-else>
    <anx-title
      :size="size"
      :class="`anx-paragraph-title ` + (noline !== null ? 'noline ' : '')"
      :no-margin="noMarginTitle"
    >
      {{ title }}
    </anx-title>
    <component
      :is="element"
      :class="
        `anx-paragraph anx-paragraph-${size} ` +
          (hint !== null ? 'hint ' : '') +
          (inverse !== null ? 'inversed-colors' : '')
      "
    >
      <slot />
    </component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxTitle from "./AnxTitle.vue";

@Component({
  components: {
    AnxTitle
  }
})
export default class AnxParagraph extends Vue {
  /** The title of the paragrapg */
  @Prop({ default: null }) title!: string | null;

  /** The size of the paragraph (h1, h2 or h3) */
  @Prop({ default: "h1" }) size!: string;

  /** The paragraph can also be displayed as hint */
  @Prop({ default: null }) hint!: boolean | null;

  /** The paragraph title has a line or not */
  @Prop({ default: null }) noline!: boolean | null;

  /** Inverse the colors of the paragraph */
  @Prop({ default: null }) inverse!: boolean | null;

  /** No margin after the title */
  @Prop({ default: null }) noMarginTitle!: boolean | null;

  /** This is the element that will be inserted for anx-paragraph */
  @Prop({ default: "p" }) element!: string;
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-paragraph {
  font-size: 16px;
  line-height: 1.5em;
  overflow-wrap: anywhere;

  p {
    margin: 0;
  }

  span {
    overflow-wrap: anywhere;
  }

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

    &.noline {
      margin-bottom: 19px; /*real margin isi 30px - because textbox size*/

      &::after {
        content: "" !important;
        white-space: pre;
      }
    }
  }

  &.hint {
    color: $anx-second-grey-light;
    font-size: 12px;
    line-height: 1.2em;
    margin-bottom: 0px;
  }

  &.inversed-colors {
    color: $anx-primary-white;

    .anx-paragraph-title {
      color: $anx-primary-white;
    }
  }
}
</style>
