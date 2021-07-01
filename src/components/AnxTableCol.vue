<template>
  <td :class="`anx-table-col text-${align}`">
    <slot>
      {{ content }}
    </slot>
  </td>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

/**
 * A table colum for the *anx-table*
 */
@Component({})
export default class AnxTableCol extends Vue {
  /** The content for the column */
  @Prop({ default: "" }) content!: string;

  /** The align for the content in the column [left, center, right] */
  @Prop({ default: "left" }) align!: string;
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-table-col {
  padding: 0.438rem 0.5rem 0.125rem 0.5rem;
  padding-left: 8px;
  font-size: 16px;
  vertical-align: middle;
  overflow-wrap: anywhere;

  img {
    max-height: 20px;
  }
}
</style>
