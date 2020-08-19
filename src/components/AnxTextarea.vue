<template>
  <!-- textarea with validationn-provider -->
  <ValidationProvider
    v-if="validation"
    v-slot="{ errors }"
    name="textarea"
    :rules="rules"
  >
    <div
      :class="
        errors && errors.length > 0 ? 'anx-textarea is-invalid' : 'anx-textarea'
      "
      :style="cssProps"
    >
      <textarea
        :id="id"
        :name="id"
        :rows="rows"
        :disabled="disabled"
        v-validate="rules"
        v-model="message"
        :class="{ filled: message.length >= 1 }"
        @input="$emit('input', message)"
      />
      <label id="textarea-label" :for="id">{{ label }}</label>
      <span class="error">{{ errors[0] }}</span>
    </div>
  </ValidationProvider>
  <!-- standard textarea without validation-provider -->
  <div v-else class="anx-textarea" :style="cssProps">
    <textarea
      :id="id"
      :name="id"
      :rows="rows"
      :disabled="disabled"
      v-model="message"
      :class="{ filled: message.length >= 1 }"
      @input="$emit('input', message)"
    />
    <label id="textarea-label" :for="id">{{ label }}</label>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ValidationProvider } from "vee-validate";

@Component({
  components: {
    ValidationProvider
  }
})
export default class AnxTextarea extends Vue {
  /** With this property, a textarea can be set */
  /**Props
   * id: the id and the name of the textarea
   */
  @Prop({ default: "anx-textarea" }) id!: string;
  /**label: the label text for the textarea */
  @Prop({ default: "Additional Text" }) label!: string;
  /**rows: the number of rows for the textarea */
  @Prop({ default: "4" }) rows!: string;
  /**disabled: set the diasbled attribute of the textarea.
   * When the textarea should be diabled you must set it in most cases with this prop
   */
  @Prop({ default: false }) disabled!: boolean;
  /**width: the width of the textarea */
  @Prop({ default: "100%" }) width!: string;
  /**validation: is it set (true) then there will be validation-provider */
  @Prop({ default: false }) validation!: boolean;
  /**rules: the rules for the validation. default is required */
  @Prop({ default: "required" }) rules!: string;

  private message = "";

  get cssProps() {
    return {
      "--textarea-width": this.width
    };
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-textarea {
  font-family: $anx-font-family;
  width: var(--textarea-width);
  display: block;
  position: relative;
  padding-top: 9px;
  margin-bottom: $form-components-spacing; /* real margin ~35px */

  @media only screen and (width: 1125px), only screen and (width: 1200px) {
    display: inline-block !important;
  }

  &.is-invalid > textarea,
  &.is-invalid > textarea:focus {
    border: 1px solid $anx-error;
    ~ label {
      color: $anx-error !important;
    }
  }
}
.anx-textarea textarea {
  width: var(--textarea-width);
  padding: 20px 17px 20px 17px;
  border: 1px solid $anx-second-grey-light;
  color: $anx-lightest-grey-dark !important;
  font-family: $anx-font-family;
  font-size: 16px;
  resize: vertical;
  overflow: auto;

  &:focus,
  &.filled {
    border: 1px solid #77bc1f;
    outline: 0;

    + label {
      color: $anx-primary-green !important;
      margin-left: 15px;
      background-color: #fff;
      font-size: 12px !important;
      opacity: 1 !important;
      z-index: 1;
      transition: all 0.1s ease;
      position: absolute;
      left: 0;
      top: 4px;
      padding: 0 2px 0 2px;
    }

    & placeholder {
      display: none;
    }
  }
}

.anx-textarea textarea + label {
  color: $anx-lightest-grey-dark !important;
  margin-left: 17px;
  margin-bottom: 0;
  background-color: transparent;
  font-size: 16px !important;
  opacity: 1 !important;
  z-index: 1;
  transition: all 0.1s ease;
  left: 0;
  top: 24px;
  position: absolute;
  pointer-events: none;
}

.anx-textarea textarea[disabled] label {
  opacity: 0 !important;
}

.anx-textarea textarea:not([disabled]) label {
  opacity: 1;
}

span.error {
  font-size: 12px;
  color: $anx-error;
  padding: 0;
  white-space: nowrap;
  display: block;
}
</style>
