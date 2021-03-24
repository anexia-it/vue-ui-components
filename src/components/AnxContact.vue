<template>
  <div class="anx-contact">
    <anx-content>
      Has to be implemented!
    </anx-content>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import AnxContent from "./AnxContent.vue";

@Component({
  components: {
    AnxContent
  }
})
export default class AnxContact extends Vue {}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
</style>
