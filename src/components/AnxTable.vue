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
          (scrollable !== null ? 'anx-table-scrollable ' : '') +
          (hover !== null ? 'anx-table-hover ' : '')
      "
    >
      <thead :class="uppercaseTitle !== null ? 'text-uppercase' : ''">
        <tr>
          <th
            v-for="(item, index) in items[0]"
            :key="index"
            scope="col"
            :width="getWidthForColumn(index)"
          >
            {{ camelCaseToText(index) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <anx-table-row v-for="(item, i) in items" :key="i" :item="item">
          <anx-table-col v-for="(content, name) in item" :key="name">
            <slot :name="`${name}${i}`" v-bind:content="content">
              {{ content }}
            </slot>
          </anx-table-col>
        </anx-table-row>
      </tbody>
    </table>
  </anx-table-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxTableContainer from "./AnxTableContainer.vue";
import AnxTableRow from "./AnxTableRow.vue";
import AnxTableCol from "./AnxTableCol.vue";

@Component({
  components: {
    AnxTableContainer,
    AnxTableRow,
    AnxTableCol
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
  @Prop({ default: null }) hover!: boolean;

  /** Wheter the table is bordered or not */
  @Prop({ default: null }) height!: string;

  /** Whether to display the header columns in uppercase or not */
  @Prop({ default: null }) uppercaseTitle!: boolean;

  /** The items for the table */
  @Prop({ default: [] }) items!: Array<object>;

  /** The widths for all the colums, this has to be an object. Example: { age: '100px' } to make the width of the column named age 100 px */
  @Prop() widths!: Record<string, string>;

  /** Searches if the width for a specific column is set and returns it */
  private getWidthForColumn(index: string): string {
    if (this.widths && index in this.widths) {
      return this.widths[index];
    }
    return "auto";
  }

  /** Converts camelCase to Text */
  private camelCaseToText(camelCase: string) {
    return camelCase.replace(/([A-Z])/g, " $1").replace(/^./, function(str) {
      return str.toUpperCase();
    });
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-table {
  color: $anx-primary-grey-dark !important;
  border-collapse: collapse;
  text-align: left;
  width: 100%;
  border: none;

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
    border: 1px solid $anx-table-border !important;

    thead {
      tr {
        min-height: 40px;
        height: 40px;
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
@import "../assets/scss/_variables.scss";

.anx-table {
  tbody {
    tr {
      min-height: 40px;
      height: 40px;
    }
  }
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

  &.anx-table-hover {
    tbody {
      tr:hover {
        background-color: $anx-table-row-hover !important;
      }
    }
  }
}
</style>
