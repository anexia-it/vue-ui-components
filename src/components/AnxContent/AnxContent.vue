<template>
  <div
    :class="
      'anx-content ' +
        (inverse !== null ? 'inversed-colors ' : '') +
        (first !== null ? 'first-no-nav ' : '')
    "
  >
    <anx-title
      v-if="title !== null"
      :size="size"
      :noline="noline"
      :text="title"
    />

    <!-- @slot use this for the actual content -->
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxTitle from "../AnxTitle/AnxTitle.vue";

@Component({
  components: {
    AnxTitle
  }
})
export default class AnxContent extends Vue {
  /** The title for the content */
  @Prop({ default: null }) title!: string | null;

  /**
   * This is the size of the header
   * @values h1, h2, h3
   */
  @Prop({ default: "h1" }) size!: string;

  /** If this property is set to true, the colors will be inversed (blue background and white font) */
  @Prop({ default: null }) inverse!: boolean | null;

  /** If this property is set to true, the element will be handled as first inforamtion element*/
  @Prop({ default: null }) first!: boolean | null;

  /** No line for the anx-title */
  @Prop({ default: null }) noline!: boolean | null;
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.anx-content {
  margin-bottom: $anx-content-spacing;
  background-color: $anx-primary-white;
  padding: 40px;

  @media (max-width: $screen-xs) {
    padding: 20px;
  }

  &.inversed-colors {
    background-color: transparent;
    padding-left: 0 !important;
    padding-right: 0 !important;
    color: $anx-primary-white;

    .anx-title {
      color: $anx-primary-white;
    }
  }

  &.first-no-nav {
    margin: 0px;
    padding: 0px;
    margin-top: 15px; /* real margin to header-line 35px (hr has 20px) */
    margin-bottom: 30px; /* real margin 35px (textbox) */
  }

  & > * {
    &:last-child {
      margin-bottom: 0px !important;
    }
  }
}
</style>
