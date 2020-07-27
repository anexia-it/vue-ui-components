<template>
  <form class="anx-form" @submit.prevent="submit">
    <slot />
    <anx-button
      v-if="submitButton !== null"
      type="submit"
      :width="submitButton.width ? submitButton.width : '100%'"
      :text="submitButton.text"
    ></anx-button>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import AnxButton from "@/components/AnxButton.vue";

@Component({
  components: {
    AnxButton
  }
})
export default class AnxAlert extends Vue {
  /** With this property, a submit button can be set */
  @Prop({ default: null }) submitButton!: Record<string, string>;

  /** Emit the submit event */
  @Emit("submit")
  submit() {
    return true;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
