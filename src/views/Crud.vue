<template>
  <anx-container width="1000px">
    <anx-content>
      <h1>Standard CRUD table with ID DESC sorting</h1>
      <anx-crud-table
        :modelClass="modelClass"
        :sort="{ name: 'id', order: 'DESC' }"
        :hideColumns="['userId']"
        :maxItems="5"
      >
      </anx-crud-table>

      <br />
      <br />

      <h1>CRUD table with custom edit modal</h1>
      <anx-crud-table
        :modelClass="modelClass"
        :sort="{ name: 'id', order: 'DESC' }"
        @editActionClicked="showEditModal = true"
        :maxItems="10"
      >
        <template slot="editModal">
          <div>
            <anx-modal
              v-if="showEditModal"
              @close="showEditModal = false"
              size="xxl"
            >
              <h1>Example of a custom modal!</h1>
            </anx-modal>
          </div>
        </template>
      </anx-crud-table>
    </anx-content>
  </anx-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AnxContent from "@/components/AnxContent.vue";
import AnxContainer from "@/components/AnxContainer.vue";
import AnxCrudTable from "@/components/AnxCrudTable.vue";
import AnxModal from "@/components/AnxModal.vue";
import { AbstractModel } from "@/lib/models/AbstractModel";
import { Posts } from "@/lib/models/test/Posts";

@Component({
  components: {
    AnxCrudTable,
    AnxContainer,
    AnxContent,
    AnxModal
  }
})
export default class Crud extends Vue {
  modelClass: { new (): AbstractModel } | null = null;

  showEditModal = false;

  mounted() {
    this.modelClass = Posts;
  }
}
</script>
