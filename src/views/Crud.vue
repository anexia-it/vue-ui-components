<template>
  <anx-container width="1000px">
    <anx-content>
      <anx-crud-table
        :modelClass="modelClass"
        :sort="{ name: 'id', order: 'DESC' }"
      ></anx-crud-table>
    </anx-content>
  </anx-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AnxContent from "@/components/AnxContent.vue";
import AnxContainer from "@/components/AnxContainer.vue";
import AnxCrudTable from "@/components/AnxCrudTable.vue";
import { AbstractModel } from "@/lib/models/AbstractModel";
import { Posts } from "@/lib/models/test/Posts";

@Component({
  components: {
    AnxCrudTable,
    AnxContainer,
    AnxContent
  }
})
export default class Crud extends Vue {
  private modelClass: { new (): AbstractModel } | null = null;

  private mounted() {
    this.modelClass = Posts;
  }
}
</script>
