<template>
  <anx-table-container
    :scrollable="scrollable !== null ? true : false"
    :height="height !== null ? height : 'auto'"
  >
    <table
      :class="
        'anx-table ' +
          (stripped !== null ? 'anx-table-striped ' : '') +
          (bordered !== null ? 'anx-table-bordered ' : '') +
          (scrollable !== null ? 'anx-table-scrollable ' : '')
      "
    >
      <thead :class="uppercaseTitle !== null ? 'text-uppercase' : ''">
        <tr>
          <th
            v-for="column in columns"
            :key="column.name"
            scope="col"
            :width="column.width"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </anx-table-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxTableContainer from "@/components/AnxTableContainer.vue";

@Component({
  components: {
    AnxTableContainer
  }
})
export default class AnxTable extends Vue {
  /** Whether the table should be scrollable or not */
  @Prop({ default: null }) scrollable!: boolean;

  /** Wheter the table is stripped or not */
  @Prop({ default: null }) stripped!: boolean;

  /** Wheter the table is bordered or not */
  @Prop({ default: null }) bordered!: boolean;

  /** Wheter the table is bordered or not */
  @Prop({ default: null }) height!: string;

  /** Whether to display the header columns in uppercase or not */
  @Prop({ default: null }) uppercaseTitle!: boolean;

  /** The columns for the header of the table */
  @Prop({ default: [] }) columns!: Array<object>;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.anx-table {
  color: $anx-primary-grey-dark !important;
  border-collapse: collapse;
  text-align: left;
  width: 100%;
  border: none;

  thead {
    background-color: $anx-table-header-background;
    tr {
      th {
        font-family: MetaWebPro;
        padding: 0.5rem 0.5rem 0.438rem 0.5rem;
      }
    }
  }

  &.anx-table-bordered {
    border: 1px solid $anx-table-border !important;

    thead {
      tr {
        th {
          border: 1px solid $anx-table-border !important;
          border-bottom: 2px solid $anx-table-border !important;
        }
      }
    }
  }

  &.anx-table-scrollable {
    overflow-y: auto;
  }
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
</style>

<!-- This style is for the table rows (in the child). This is why the style is not scoped -->
<style lang="scss">
@import "@/assets/scss/_variables.scss";

.anx-table {
  &.anx-table-bordered {
    tbody {
      tr {
        border: 1px solid $anx-table-border !important;
        td {
          border: 1px solid $anx-table-border !important;
        }
      }
    }
  }

  &.anx-table-striped {
    tbody {
      tr:nth-of-type(odd) {
        background-color: $anx-table-row-background !important;
      }
    }
  }
}
</style>
