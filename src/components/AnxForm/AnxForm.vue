<template>
  <ValidationObserver :ref="name" v-slot="{ invalid }">
    <form :id="name" class="anx-form" @submit.prevent="checkValidation">
      <!-- @slot put your input components inside here -->
      <slot />
      <div class="submit-button-wrapper" v-if="submitButton !== null">
        <anx-button
          type="submit"
          :width="submitButton.width ? submitButton.width : null"
          :text="submitButton.text"
          :disabled="submitButton.disabled && invalid"
          :inline="submitButton.inline"
        />
      </div>
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { ValidationObserver, Validator } from "vee-validate";
import AnxButton from "../AnxButton/AnxButton.vue";

/**
 * A simple form used for collecting user input
 */
@Component({
  components: {
    AnxButton,
    ValidationObserver
  }
})
export default class AnxForm extends Vue {
  /** With this property, a submit button can be set */
  @Prop({ default: null }) submitButton!: {
    text: string;
    disabled: boolean;
    width: string;
  } | null;

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

  /** Checks if the form is valid and does validation */
  public async isValid() {
    const validator = (this.$refs[this.name] as unknown) as Validator;
    if (await validator.validate()) {
      return true;
    }

    return false;
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.anx-form {
  .submit-button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>