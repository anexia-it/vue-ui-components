<template>
  <div v-if="scrollable" class="anx-table-container">
    <div
      class="anx-table-container-scrollable"
      :style="height !== null ? `height: ${height};` : ''"
    >
      <slot />
    </div>
    <div v-if="scrollable !== null" class="scroll-shadow" />
  </div>
  <div class="anx-table-container" v-else>
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxTable extends Vue {
  /** Whether the table should be scrollable or not */
  @Prop({ default: false }) scrollable!: boolean;

  @Prop({ default: null }) height!: string;
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-table-container {
  position: relative;
  margin-bottom: 40px;

  .anx-table-container-scrollable {
    overflow-y: auto;
  }

  .scroll-shadow {
    position: absolute;
    bottom: 0;
    z-index: 10;
    width: 100%;
    height: 9px;
    background: transparent
      linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.1)) 0 0 no-repeat
      padding-box;
  }
}
</style>
