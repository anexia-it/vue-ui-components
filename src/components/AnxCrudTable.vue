<template>
  <div>
    <anx-button
      @click="
        createInstance = new modelClass();
        showCreateModal = true;
      "
      >Create
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
          <br /><br />
          {{ i }}: <input type="text" v-model="createInstance[i]" />
        </div>
      </span>
      <template slot="modal-footer">
        <anx-button @click="createItem">Save </anx-button>
      </template>
    </anx-modal>
    <anx-table stripped bordered hover :columns="tableColumns">
      <template v-slot:tbody>
        <anx-table-row v-for="(instance, i) in instances" :key="i">
          <anx-table-col v-for="(instanceProp, j) in instance" :key="j">
            {{ instanceProp }}
          </anx-table-col>
          <anx-table-col align="center">
            <anx-icon
              icon="einstellungen-verwaltung"
              width="40px"
              @click.native="
                showEditModal = true;
                selectedItem = instance;
              "
            />
            <anx-icon
              icon="loeschen"
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
        <br /><br />
        {{ i }}: <input type="text" v-model="selectedItem[i]" />
      </span>
      <template slot="modal-footer">
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
import { AbstractModel } from "../lib/models/AbstractModel";

@Component({
  components: {
    AnxTable,
    AnxTableRow,
    AnxTableCol,
    AnxIcon,
    AnxModal,
    AnxButton
  }
})
export default class AnxCrudTable extends Vue {
  @Prop({ default: null }) modelClass!: typeof AbstractModel | null;

  private instances: AbstractModel[] = [];
  private selectedItem: AbstractModel | null = null;
  private createInstance: AbstractModel | null = null;

  private showDeleteModal = false;
  private showEditModal = false;
  private showCreateModal = false;

  private mounted() {
    if (this.modelClass instanceof AbstractModel) {
      console.log("fetch");
      this.fetch();
    }
    console.log("not fetch");
  }

  @Watch("modelClass")
  onModelClassChange() {
    this.fetch();
    console.log("change fetch");
  }
  get tableColumns() {
    if (this.instances.length) {
      const instanceProps = Object.keys(this.instances[0]).map((v: string) => {
        return {
          name: v
        };
      });
      instanceProps.push({
        name: "Actions"
      });
      return instanceProps;
    }
    return [];
  }

  private async fetch() {
    if (!this.modelClass) {
      return;
    }
    this.instances = await this.modelClass.getAll();
  }

  private async deleteSelectedItem() {
    if (this.selectedItem) {
      await this.selectedItem.delete();
      await this.fetch();
      this.showDeleteModal = false;
    } else {
      throw new Error("No selected item to delete set!");
    }
  }

  private async editSelectedItem() {
    if (this.selectedItem) {
      await this.selectedItem.update();
      await this.fetch();
      this.showEditModal = false;
    } else {
      throw new Error("No selected item to update!");
    }
  }

  private async createItem() {
    if (!this.createInstance) {
      return;
    }
    await this.createInstance.save();
    await this.fetch();
    this.showCreateModal = false;
  }
}
</script>
