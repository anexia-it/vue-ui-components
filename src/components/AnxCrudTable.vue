<template>
  <div>
    <anx-table stripped bordered hover :columns="tableColumns">
      <template v-slot:tbody>
        <anx-table-row v-for="(instance, i) in instances" :key="i">
          <anx-table-col v-for="(instanceProp, j) in instance" :key="j">
            {{ instanceProp }}
          </anx-table-col>
          <anx-table-col align="center">
            <anx-icon icon="einstellungen-verwaltung" width="40px" />
            <anx-icon
              icon="loeschen"
              width="40px"
              @click.native="showDeleteModal = true"
            />
          </anx-table-col>
        </anx-table-row>
      </template>
    </anx-table>
    <anx-modal
      v-if="showDeleteModal"
      confirm
      has-close-button
      close-button-align="right"
      @close="showDeleteModal = false"
    >
      Do you really want to delete?
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
import { AbstractModel } from "@/lib/models/AbstractModel";

@Component({
  components: {
    AnxTable,
    AnxTableRow,
    AnxTableCol,
    AnxIcon,
    AnxModal
  }
})
export default class AnxCrudTable extends Vue {
  @Prop({ default: null }) modelClass!: typeof AbstractModel | null;

  private instances: AbstractModel[] = [];
  private showDeleteModal = false;

  private mounted() {
    if (this.modelClass instanceof AbstractModel) {
      this.fetch;
    }
  }

  @Watch("modelClass")
  onModelClassChange() {
    this.fetch();
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
}
</script>
