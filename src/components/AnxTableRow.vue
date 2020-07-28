<template>
  <tr class="anx-table-row">
    <slot>
      <td v-for="(content, name) in item" :key="name">
        {{ content }}
      </td>
    </slot>
  </tr>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxTableRow extends Vue {
  /** The columns for the row */
  @Prop({ default: {} }) item!: Record<string, string>;
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-table-row {
  height: 40px;
}
</style>
