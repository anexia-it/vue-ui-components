<template>
  <div>
    <h1 v-if="modelClass">{{ modelClass.name }}</h1>
    <anx-button
      @click="
        createInstance = new modelClass();
        showCreateModal = true;
      "
      >Create new
    </anx-button>
    <br />
    <br />
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
    <anx-table stripped bordered hover :columns="tableColumns">
      <template v-slot:tbody>
        <anx-table-row v-for="(instance, i) in sortedInstances" :key="i">
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

  get sortedInstances() {
    if (
      !this.internalSort ||
      !this.internalSort.name ||
      !this.internalSort.order
    ) {
      return this.instances;
    }
    const sort = this.instances.sort((a, b) => {
      if (this.internalSort?.order === "ASC") {
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
    });
    console.log(sort[0]);
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
      const instanceProps: {
        name: string;
        index?: string;
        width?: string | null;
        align?: string | null;
      }[] = Object.keys(this.instances[0]).map((v: string) => {
        return {
          name: v
        };
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
  }
}
</style>
