<template>
  <div :class="'anx-content ' + (inverseColors ? 'inversed-colors ' : '')">
    <div class="row">
      <div class="col-md-12 inner-content">
        <anx-title v-if="title !== null" :size="size">
          {{ title }}
        </anx-title>
        <slot />
      </div>
    </div>
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

  /** This is the size of the header (xl, l, m) */
  @Prop({ default: "xl" }) size!: string;

  /** If this property is set to true, the colors will be inversed (blue background and white font) */
  @Prop({ default: false }) inverseColors!: boolean;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.anx-content {
  margin-bottom: 40px;
  background-color: $anx-primary-white;

  .inner-content {
    margin: 40px;

    @media (max-width: $screen-md) {
      margin: 20px;
    }
  }

  &.inversed-colors {
    background-color: unset;

    .inner-content {
      margin-left: 0 !important;
      margin-right: 0 !important;
      color: $anx-primary-white;

      .anx-title {
        color: $anx-primary-white;
      }
    }
  }
}
</style>
