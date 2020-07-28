<template>
  <ValidationObserver :ref="name" v-slot="{ invalid }">
    <form :id="name" class="anx-form" @submit.prevent="checkValidation">
      <slot />
      <anx-button
        v-if="submitButton !== null"
        type="submit"
        :width="submitButton.width ? submitButton.width : '100%'"
        :text="submitButton.text"
        :disabled="invalid"
      />
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { ValidationObserver, Validator } from "vee-validate";
import AnxButton from "./AnxButton.vue";

@Component({
  components: {
    AnxButton,
    ValidationObserver
  }
})
export default class AnxAlert extends Vue {
  /** With this property, a submit button can be set */
  @Prop({ default: null }) submitButton!: Record<string, string>;

  /** The name of the form. This is important when using several forms on one page */
  @Prop({ default: "anx-form" }) name!: string;

  /** Emit the submit event */
  @Emit("submit")
  submit() {
    return true;
  }

  /**
   * This validates the form manually
   * This is needed, cause the input fields are only validated after first input.
   * If a field is required but has never had any input, the { valid } prop of the observer would be true.
   */
  private async checkValidation() {
    const validator = (this.$refs[this.name] as unknown) as Validator;
    if (await validator.validate()) {
      this.submit();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
</style>
