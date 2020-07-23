<template>
  <anx-global id="app">
    <!-- you can set a image as prop or default img just a anx-logo -->
    <anx-header :img="require('@/assets/anexia.svg')" />
    <div class="space"></div>
    <anx-header :menus="items" />

    <anx-container>
      <anx-content title="test title">
        This is the content
        <anx-alert
          :show="showSuccessAlert"
          @dismiss="showSuccessAlert = !showSuccessAlert"
          type="success"
        >
          This is a success message
        </anx-alert>

        <anx-alert
          :show="showErrorAlert"
          @dismiss="showErrorAlert = !showErrorAlert"
          type="error"
        >
          This is an error message
        </anx-alert>
      </anx-content>
    </anx-container>

    <anx-footer />
  </anx-global>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AnxHeader from "@/components/AnxHeader.vue";
import AnxFooter from "@/components/AnxFooter.vue";
import AnxGlobal from "@/components/AnxGlobal.vue";
import AnxContainer from "@/components/AnxContainer.vue";
import AnxContent from "@/components/AnxContent.vue";
import AnxAlert from "@/components/AnxAlert.vue";

@Component({
  components: {
    AnxHeader,
    AnxFooter,
    AnxContainer,
    AnxContent,
    AnxAlert,
    AnxGlobal
  }
})
export default class App extends Vue {
  public items: Array<object> = [
    { menu: "Software", link: "/x" },
    { menu: "Hosting", link: "/y" }
  ];

  showSuccessAlert = true;
  showErrorAlert = true;
}
</script>
<style lang="scss">
@import "@/assets/scss/_variables.scss";

.space {
  height: 20px;
}
</style>
