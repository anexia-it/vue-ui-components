<template>
  <tr class="anx-table-row">
    <td>test</td>
    <td>test</td>
    <td>test</td>
    <td>test</td>
  </tr>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxTableRow extends Vue {
  /** The columns for the row */
  @Prop({ default: [] }) columns!: Array<object>;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

tr {
  height: 40px;

  td {
    padding: 0.438rem 0.5rem 0.438rem 0.5rem;
    padding-left: 8px;
    font-size: 16px;
    vertical-align: middle;
  }
}
</style>
