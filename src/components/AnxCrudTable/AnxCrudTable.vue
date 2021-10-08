<template>
  <div class="anx-crud-table">
    <div class="anx-crud-header">
      <div :class="{ 'anx-crud-header-row': true, 'with-input': useSearch }">
        <!-- @slot This slot can be used to change the title -->
        <slot name="title">
          <anx-title
            size="h1"
            noline
            no-margin
            v-if="modelClass && showHeader"
            :text="modelClass.name"
          />
        </slot>
        <!--
          Will be emitted when the create action has been clicked for an entry in the table

          @event createActionClicked
        -->
        <div class="flex-end">
          <anx-input
            v-if="useSearch"
            class="crud-search"
            :label="searchFieldLabel"
            width="200px"
            v-model="searchValue"
          />

          <div>
            <anx-button
              id="crud-create"
              @click="
                createInstance = new modelClass();
                showCreateModal = true;
                $emit('createActionClicked');
              "
              :text="createButtonText"
            />
          </div>
        </div>
      </div>
    </div>

    <anx-table stripped bordered hover :columns="tableColumns">
      <template v-slot:tbody>
        <anx-table-row
          v-for="(instance,
          i) in paginatedSortedFilteredInstancesNonSoftDeleted"
          :key="i"
        >
          <anx-table-col
            v-for="(instanceProp, j) in instance"
            :key="j"
            align="center"
            :content="instanceProp"
          />
          <anx-table-col class="actions" align="center">
            <!--
              Will be emitted when the update action has been clicked for an entry in the table

              @event editActionClicked
            -->
            <anx-icon
              v-if="editable"
              :id="`crud-update-icon-${i}`"
              icon="einstellungen-verwaltung"
              class="action"
              width="40px"
              @click.native="
                showEditModal = true;
                selectedItem = instance;
                $emit('editActionClicked');
              "
            />
            <anx-icon
              v-if="deletable"
              :id="`crud-delete-icon-${i}`"
              icon="loeschen"
              class="action"
              width="40px"
              @click.native="
                showDeleteModal = true;
                selectedItem = instance;
              "
            />
          </anx-table-col>
        </anx-table-row>
      </template>
    </anx-table>

    <div v-if="isPaginated" class="pagination">
      <div class="page-switch">
        <span class="page-switch-link fast-forward" @click="page = 0"
          >&laquo;</span
        >
        <span class="page-switch-link backward" @click="page--">&lt;</span>
        Page {{ page + 1 }} of {{ numberPages }}
        <span class="page-switch-link forward" @click="page++">&gt;</span>
        <span
          class="page-switch-link fast-forward"
          @click="page = numberPages - 1"
          >&raquo;</span
        >
      </div>
    </div>

    <!-- ========================== -->
    <!-- Modals -->
    <!-- @slot This can be used for modifing the create modal -->
    <slot name="createModal">
      <anx-modal
        title="Create"
        v-if="showCreateModal"
        has-close-button
        close-button-align="right"
        @close="showCreateModal = false"
      >
        <span v-for="(instanceProp, i) in createInstance" :key="i">
          <div v-if="i !== 'id'">
            <anx-input :label="i" v-model="createInstance[i]" />
          </div>
        </span>
        <template slot="modal-footer">
          <span class="button-space"></span>
          <anx-button @click="createItem">Save</anx-button>
        </template>
      </anx-modal>
    </slot>

    <!-- @slot This can be used for modifing the delete modal -->
    <slot name="deleteModal">
      <anx-modal
        title="Confirm delete"
        v-if="showDeleteModal"
        confirm
        has-close-button
        close-button-align="right"
        @close="showDeleteModal = false"
        @confirm="deleteSelectedItem"
      >
        Do you really want to delete?
      </anx-modal>
    </slot>

    <!-- @slot This can be used for modifing the edit modal -->
    <slot name="editModal">
      <anx-modal
        title="Edit"
        v-if="showEditModal"
        has-close-button
        close-button-align="right"
        @close="showEditModal = false"
      >
        <span v-for="(instanceProp, i) in selectedItem" :key="i">
          <div v-if="i !== 'id'">
            <anx-input :label="i" v-model="selectedItem[i]" />
          </div>
        </span>
        <template slot="modal-footer">
          <span class="button-space"></span>
          <anx-button @click="editSelectedItem">Save</anx-button>
        </template>
      </anx-modal>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import AnxTable from "../AnxTable/AnxTable.vue";
import AnxTableRow from "../AnxTableRow/AnxTableRow.vue";
import AnxTableCol from "../AnxTableCol/AnxTableCol.vue";
import AnxTitle from "../AnxTitle/AnxTitle.vue";
import AnxIcon from "../AnxIcon/AnxIcon.vue";
import AnxModal from "../AnxModal/AnxModal.vue";
import AnxButton from "../AnxButton/AnxButton.vue";
import AnxInput from "../AnxInput/AnxInput.vue";
import { AbstractModel } from "../../lib/models/AbstractModel";

/**
 * This component is based on the *anx-table* and fully automatically renders a CRUD table with your data.
 */
@Component({
  components: {
    AnxTable,
    AnxTableRow,
    AnxTableCol,
    AnxTitle,
    AnxIcon,
    AnxModal,
    AnxButton,
    AnxInput
  }
})
export default class AnxCrudTable extends Vue {
  /** This is the model class the crud table uses to retrieve data */
  @Prop({ default: null }) modelClass!: typeof AbstractModel | null;

  /** With this property the header can be hidden */
  @Prop({ default: true }) showHeader!: boolean;

  /** Here you can provide columns that will be used for the search field. The columns have to match the properties of the model class. If no columns are provided, the search field will not be displayed */
  @Prop({ default: null }) searchColumns!: Array<string> | null;

  /** This is the text for the label of the search field */
  @Prop({ default: "Search" }) searchFieldLabel!: string;

  /** Show delete action */
  @Prop({ default: true }) deletable!: boolean;

  /** This is the text for the create button */
  @Prop({ default: "Create new" }) createButtonText!: string;

  /** Show edit action */
  @Prop({ default: true }) editable!: boolean;

  /** Authorization header for API requests */
  @Prop({ default: "" }) authorization!: string;

  /** The sorting for the table. The *name of the column* and the *order* (ASC, DESC) have to be provided as object */
  @Prop({
    default: () => {
      return { name: 0, order: "ASC" };
    }
  })
  sort!: {
    name: number;
    order: string;
  };

  /** Array of columns which should be hidden for the user */
  @Prop({ default: () => [] }) hideColumns!: string[];

  /** Define maximum number of items shown, if number of items exceeds this, pagination will be added */
  @Prop({ default: -1 }) maxItems!: number;

  instances: AbstractModel[] = [];
  selectedItem: AbstractModel | null = null;
  createInstance: AbstractModel | null = null;

  showDeleteModal = false;
  showEditModal = false;
  showCreateModal = false;
  internalSort: {
    name: number;
    order: string;
  } = { name: 0, order: "ASC" };

  searchValue = "";

  /** Number of pages should be at least 1 (even if there are no entries: "Page 1 of 1") */
  private get numberPages() {
    const num = Math.ceil(this.sortedInstances.length / this.maxItems);
    if (num <= 0) {
      return 1;
    } else {
      return num;
    }
  }

  /** _page cannot be used as name for internal page */
  page_ = 0;
  private get page(): number {
    if (this.page_ < this.numberPages) {
      return this.page_;
    } else {
      this.page = this.numberPages - 1;
      return this.page_;
    }
  }

  private set page(page: number) {
    if (page < 0 || this.numberPages <= 0) {
      this.page_ = 0;
    } else if (page >= this.numberPages && this.numberPages > 0) {
      this.page_ = this.numberPages - 1;
    } else {
      this.page_ = page;
    }
  }

  mounted() {
    this.fetch();

    if (this.sort) {
      this.internalSort = this.sort;
    }
  }

  @Watch("sort")
  onSortChanged() {
    if (this.sort) {
      this.internalSort = this.sort;
    }
  }

  @Watch("modelClass")
  onModelClassChange() {
    this.fetch();
  }

  get paginatedSortedFilteredInstancesNonSoftDeleted() {
    return this.paginatedSortedFilteredInstances.filter(instance => {
      if (
        Object.prototype.hasOwnProperty.call(instance, "deleted") &&
        (instance as any).deleted // eslint-disable-line
      ) {
        return false;
      }
      return true;
    });
  }

  get paginatedSortedFilteredInstances() {
    const instances = this.paginatedSortedInstances;
    this.hideColumns.forEach(column => {
      instances.map(instance => {
        if (Object.prototype.hasOwnProperty.call(instance, column)) {
          // eslint-disable-next-line
          delete (instance as any)[column];
        }
      });
    });
    return instances;
  }

  get paginatedSortedInstances() {
    if (!this.isPaginated) {
      return this.sortedInstances;
    }
    return this.sortedInstances.slice(
      this.page * this.maxItems,
      (this.page + 1) * this.maxItems
    );
  }

  get isPaginated() {
    return this.maxItems > 0;
  }

  get useSearch() {
    // Check if search columns are defined
    if (!this.searchColumns || this.searchColumns.length === 0) {
      return false;
    }

    // If there are no instances we can't use search
    if (!this.instances || this.instances.length === 0) {
      return false;
    }

    // Check if all search columns are right, otherwise don't use the search
    for (let i = 0; i < this.searchColumns.length; i++) {
      if (!(this.searchColumns[i] in this.instances[0])) {
        // eslint-disable-next-line
        console.error(
          `Unknown search column ${this.searchColumns[i]}! Check if you are using the property properly.`
        );
        return false;
      }
    }

    return true;
  }

  get searchFilteredInstances() {
    // Check if the search should be used
    if (!this.useSearch || !this.searchValue || this.searchValue == "") {
      return this.instances;
    }

    const instances: AbstractModel[] = [];
    this.instances.forEach((instance: AbstractModel) => {
      if (this.searchColumns) {
        for (let i = 0; i < this.searchColumns.length; i++) {
          if (this.searchColumns[i] in instance) {
            if (
              // eslint-disable-next-line
              (instance as any)[this.searchColumns[i]]
                .toLowerCase()
                .indexOf(this.searchValue.toLowerCase()) >= 0
            ) {
              instances.push(instance);
              break;
            }
          }
        }
      }
    });

    return instances;
  }

  get sortedInstances() {
    if (
      !this.internalSort ||
      !this.internalSort.name ||
      !this.internalSort.order
    ) {
      return this.searchFilteredInstances;
    }
    const sort = this.searchFilteredInstances.sort((a, b) => {
      /*eslint-disable */ 
      /**
       * We need to access the object dynamically here but 
       * we don't know the properties of it since the modelClass is injected on runtime
       */ 
      if (this.internalSort.order === "ASC") {
        return (
          (a as any)[this.internalSort.name] -
          (b as any)[this.internalSort.name]
        );
      } else {
        return (
          (b as any)[this.internalSort.name] -
          (a as any)[this.internalSort.name]
        );
      }
      /*eslint-enable */
    });
    return sort;
  }

  /**
   * Only show actions tab when there are any actions, you need to add upcoming actions here too
   */
  get hasActions() {
    return this.editable || this.deletable;
  }

  get tableColumns() {
    if (this.instances.length) {
      let instanceProps: {
        name: string;
        index?: string;
        width?: string | null;
        align?: string | null;
      }[] = Object.keys(this.instances[0]).map((v: string) => {
        return {
          name: v
        };
      });
      instanceProps = instanceProps.filter(instanceProp => {
        if (this.hideColumns.includes(instanceProp.name)) {
          return false;
        }
        return true;
      });
      if (instanceProps[0].name === "id") {
        instanceProps[0].width = "60px";
        instanceProps[0].align = "center";
      }

      if (this.hasActions) {
        instanceProps.push({
          name: "Actions"
        });
      }
      return instanceProps;
    }
    return [];
  }

  async fetch() {
    if (!this.modelClass) {
      return;
    }

    try {
      this.instances = await this.modelClass.getAll({
        authorization: this.authorization
      });
    } catch (ex) {
      this.instances = [];
    }
  }

  async deleteSelectedItem() {
    if (this.selectedItem) {
      await this.selectedItem.delete({ authorization: this.authorization });
      await this.fetch();
      this.showDeleteModal = false;
    } else {
      throw new Error("No selected item to delete set!");
    }
  }

  async editSelectedItem() {
    if (this.selectedItem) {
      await this.selectedItem.update({ authorization: this.authorization });
      await this.fetch();
      this.showEditModal = false;
    } else {
      throw new Error("No selected item to update!");
    }
  }

  async createItem() {
    if (!this.createInstance) {
      return;
    }
    await this.createInstance.save({ authorization: this.authorization });
    await this.fetch();
    this.showCreateModal = false;
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.anx-crud-table {
  .anx-crud-header {
    background-color: $anx-table-header-background;
    border: 1px solid $anx-table-border;

    .anx-crud-header-row {
      width: 100%;
      display: flex;
      padding: 20px;
      align-items: flex-end;

      &.with-input {
        padding-top: 10px;
      }

      .anx-button {
        float: right;
      }

      .flex-end {
        margin-left: auto;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
      }

      .anx-input {
        margin-right: 20px;
      }
    }
  }

  .button-space {
    width: 20px;
  }
  .actions {
    .action {
      padding: 5px;
      cursor: pointer;
    }
  }

  .pagination {
    width: 100%;
    display: flex;
    .page-switch {
      margin-left: auto;

      .page-switch-link {
        cursor: pointer;
        font-size: 20px;
        padding: 0 5px;
        color: $anx-secondary-color;
      }
      .fast-forward {
        font-size: 25px;
      }
    }
  }
}
</style>

<style lang="scss">
.anx-crud-table {
  .anx-crud-header {
    .anx-crud-header-row {
      .flex-end {
        .anx-input {
          input {
            margin-bottom: 0px !important;
          }
        }
      }
    }
  }
}
</style>
