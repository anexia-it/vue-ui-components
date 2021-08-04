<template>
  <anx-table-container
    :scrollable="scrollable"
    :height="height !== null ? height : 'auto'"
  >
    <table
      :class="
        'anx-table ' +
          (stripped !== null ? 'anx-table-striped ' : '') +
          (bordered !== null ? 'anx-table-bordered ' : '') +
          (borderless !== null ? 'anx-table-borderless ' : '') +
          (scrollable !== null ? 'anx-table-scrollable ' : '') +
          (hover !== null ? 'anx-table-hover ' : '')
      "
    >
      <thead
        v-if="noHeader === null && displayColumns.length > 0"
        :class="uppercaseTitle !== null ? 'text-uppercase' : ''"
      >
        <tr>
          <th
            v-for="column in displayColumns"
            :key="column.index"
            scope="col"
            :width="column.width"
            :class="column.align ? `text-${column.align}` : ''"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot name="tbody">
          <anx-table-row v-for="(item, i) in items" :key="i" :item="item">
            <anx-table-col
              v-for="column in displayColumns"
              :key="`col-${i}-${column.index}`"
              :width="column.width"
              :align="column.align ? column.align : 'left'"
            >
              <slot
                :name="`${column.index}${i}`"
                v-bind:content="item[column.index]"
              >
                {{ item[column.index] }}
              </slot>
            </anx-table-col>
          </anx-table-row>
        </slot>
      </tbody>
    </table>
  </anx-table-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxTableContainer from "../AnxTableContainer/AnxTableContainer.vue";
import AnxTableRow from "../AnxTableRow/AnxTableRow.vue";
import AnxTableCol from "../AnxTableCol/AnxTableCol.vue";

/**
 * A powerfull table with many design features
 */
@Component({
  components: {
    AnxTableContainer,
    AnxTableRow,
    AnxTableCol
  }
})
export default class AnxTable extends Vue {
  /** Whether the table should be scrollable or not */
  @Prop({ default: null }) scrollable!: boolean | null;

  /** Whether the table is stripped or not */
  @Prop({ default: null }) stripped!: boolean | null;

  /** Wheter the tables outline is bordered or not */
  @Prop({ default: null }) bordered!: boolean | null;

  /** Do not show any borders */
  @Prop({ default: null }) borderless!: boolean | null;

  /** Wheter the table is bordered or not */
  @Prop({ default: null }) hover!: boolean | null;

  /** Wheter the table is bordered or not */
  @Prop({ default: null }) height!: string | null;

  /** Whether to display the header columns in uppercase or not */
  @Prop({ default: null }) uppercaseTitle!: boolean | null;

  /** The items for the table */
  @Prop({ default: null }) items!: Array<object> | null;

  /** With this property, the names for the columns and the linked index of the items can be defined */
  @Prop({ default: null }) columns!:
    | {
        name: string;
        index: string;
        width: string | null;
        align: string | null;
      }[]
    | null;

  /** Remove the header of the table */
  @Prop({ default: null }) noHeader!: boolean | null;

  /** Converts camelCase to Text */
  private camelCaseToText(camelCase: string) {
    return camelCase.replace(/([A-Z])/g, " $1").replace(/^./, function(str) {
      return str.toUpperCase();
    });
  }

  /** Returns the colums that should be displayed */
  private get displayColumns() {
    let columns: {
      name: string;
      index: string;
      width: string | null;
      align: string | null;
    }[] = [];

    if (this.columns === null) {
      /** If no specific columns are defined, we use the first entry of the items to get the names of the columns */
      if (this.items && this.items.length > 0) {
        for (const key of Object.keys(this.items[0])) {
          columns.push({
            name: this.camelCaseToText(key),
            index: key,
            width: "auto",
            align: "left"
          });
        }
      }
    } else {
      /** If the columns property is defined, we use it for the names */
      columns = this.columns;
    }

    return columns;
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.anx-table {
  color: $anx-dark-grey-color !important;
  border-collapse: collapse;
  text-align: left;
  width: 100%;
  border: none;
  background-color: $anx-primary-white;

  thead {
    background-color: $anx-table-header-background;
    tr {
      min-height: 40px;
      height: 40px;
      th {
        padding: 0.5rem 0.5rem 0.25rem 0.5rem;
      }
    }
  }

  &.anx-table-bordered {
    border: 1px solid $anx-table-border;

    thead {
      tr {
        min-height: 40px;
        height: 40px;
        th {
          border: 1px solid $anx-table-border;
          border-bottom: 2px solid $anx-table-border;
        }
      }
    }
  }

  &.anx-table-scrollable {
    overflow-y: auto;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
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
@import "../../assets/scss/_variables.scss";

.anx-table {
  thead {
    th {
      border-bottom: 2px solid $anx-table-border;
      font-weight: 600;
    }
  }
  tbody {
    tr {
      min-height: 40px;
      height: 40px;
      border-bottom: 1px solid $anx-table-border;
    }

    tr:last-child {
      border-bottom: 0;
    }
  }
  &.anx-table-bordered {
    tbody {
      tr {
        border: 1px solid $anx-table-border;
        td {
          border: 1px solid $anx-table-border;
        }
      }
    }
  }

  &.anx-table-borderless {
    border: 0 !important;

    thead {
      tr {
        th {
          border: 0 !important;
          border-bottom: 0 !important;
        }
      }
    }

    tbody {
      tr {
        border: 0 !important;
        td {
          border: 0 !important;
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

  &.anx-table-hover {
    tbody {
      tr:hover {
        background-color: $anx-table-row-hover !important;
      }
    }
  }

  /** If the tabled is striped and has the hover effect, the all odd tables rows have to
  *** change the background color to white on hover, so that the effect is visible */
  &.anx-table-hover.anx-table-striped {
    tbody {
      tr:nth-of-type(odd):hover {
        background-color: $anx-primary-white !important;
      }
    }
  }
}
</style>
