<template>
  <div>
    <h1 v-if="modelClass">{{ modelClass.name }}</h1>
    <anx-button
      @click="
        createInstance = new modelClass();
        showCreateModal = true;
        $emit('createActionClicked');
      "
      >Create new
    </anx-button>
    <br />
    <br />
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
          <anx-button @click="createItem">Save </anx-button>
        </template>
      </anx-modal>
    </slot>
    <anx-table stripped bordered hover :columns="tableColumns">
      <template v-slot:tbody>
        <anx-table-row
          v-for="(instance, i) in paginatedSortedFilteredInstances"
          :key="i"
        >
          <anx-table-col
            v-for="(instanceProp, j) in instance"
            :key="j"
            align="center"
          >
            {{ instanceProp }}
          </anx-table-col>
          <anx-table-col class="actions" align="center">
            <anx-icon
              v-if="editable"
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
        <span
          class="page-switch-link"
          @click="
            () => {
              if (page > 0) page--;
            }
          "
          >&lt;</span
        >
        Page {{ Math.ceil(page) + 1 }} of
        {{ Math.ceil(sortedInstances.length / maxItems) }}
        <span
          class="page-switch-link"
          @click="
            () => {
              if (page < sortedInstances.length / maxItems - 1) page++;
            }
          "
          >&gt;</span
        >
        <span
          class="page-switch-link fast-forward"
          @click="page = sortedInstances.length / maxItems - 1"
          >&raquo;</span
        >
      </div>
    </div>

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

import AnxTable from "./AnxTable.vue";
import AnxTableRow from "./AnxTableRow.vue";
import AnxTableCol from "./AnxTableCol.vue";
import AnxIcon from "./AnxIcon.vue";
import AnxModal from "./AnxModal.vue";
import AnxButton from "./AnxButton.vue";
import AnxInput from "./AnxInput.vue";
import { AbstractModel } from "../lib/models/AbstractModel";

@Component({
  components: {
    AnxTable,
    AnxTableRow,
    AnxTableCol,
    AnxIcon,
    AnxModal,
    AnxButton,
    AnxInput
  }
})
export default class AnxCrudTable extends Vue {
  @Prop({ default: null }) modelClass!: typeof AbstractModel | null;

  /** Show delete action */
  @Prop({ default: true }) deletable!: boolean;

  /** Show edit action */
  @Prop({ default: true }) editable!: boolean;

  /** Authorization header for API requests */
  @Prop({ default: "" }) authorization!: string;

  /** Default column sorting */
  @Prop({ default: { name: 0, order: "ASC" } }) sort!: {
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
  page = 0;

  mounted() {
    if (this.modelClass) {
      this.fetch();
    }
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

  get paginatedSortedFilteredInstances() {
    const instances = this.paginatedSortedInstances;
    this.hideColumns.forEach(column => {
      instances.map(instance => {
        if (Object.prototype.hasOwnProperty.call(instance, column)) {
          // eslint-disable-next-line
          delete (instance as any)[column];
        } else {
          console.warn(
            "Tried to hide a non existend column! Are you sure you set hideColumn correct for the CRUD table?"
          );
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

  get sortedInstances() {
    if (
      !this.internalSort ||
      !this.internalSort.name ||
      !this.internalSort.order
    ) {
      return this.instances;
    }
    const sort = this.instances.sort((a, b) => {
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
    this.instances = await this.modelClass.getAll({
      authorization: this.authorization
    });
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
      color: #77bc1f;
    }
    .fast-forward {
      font-size: 25px;
    }
  }
}
</style>
