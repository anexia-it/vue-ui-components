<template>
  <div :class="'anx-content ' + (inverse !== null ? 'inversed-colors ' : '')">
    <anx-title v-if="title !== null" :size="size">
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
export default class AnxContent extends Vue {
  /** The title for the content */
  @Prop({ default: null }) title!: string;

  /** This is the size of the header (h1, h2, h3) */
  @Prop({ default: "h1" }) size!: string;

  /** If this property is set to true, the colors will be inversed (blue background and white font) */
  @Prop({ default: null }) inverse!: boolean;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.anx-content {
  margin-bottom: 40px;
  background-color: $anx-primary-white;
  padding: 40px;

  @media (max-width: $screen-md) {
    padding: 20px;
  }

  &.inversed-colors {
    background-color: unset;
    padding-left: 0 !important;
    padding-right: 0 !important;
    color: $anx-primary-white;

    .anx-title {
      color: $anx-primary-white;
    }
  }

  div:last-child {
    margin-bottom: 0;
  }
}
</style>
