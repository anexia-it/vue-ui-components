<template>
  <td class="anx-table-col">
    <slot>
      {{ content }}
    </slot>
  </td>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxTableCol extends Vue {
  /** The content for the column */
  @Prop({ default: "" }) content!: string;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.anx-table-col {
  padding: 0.438rem 0.5rem 0.438rem 0.5rem;
  padding-left: 8px;
  font-size: 16px;
  vertical-align: middle;
}
</style>
