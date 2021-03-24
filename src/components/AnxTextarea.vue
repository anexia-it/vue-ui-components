<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="name"
    :rules="validationRules"
    :style="cssProps"
    class="anx-textarea"
    tag="div"
    ref="observer"
  >
    <textarea
      :id="id"
      :name="name"
      :rows="rows"
      :disabled="disabled !== null"
      v-model="updateInputField"
      :class="{ filled, active, 'is-invalid': errors && errors.length > 0 }"
      @input="$emit('input', updateInputField)"
      @blur="inputBlur"
      @click="clickInputField()"
    />
    <label id="textarea-label" :for="id">{{ label }}</label>
    <span v-if="validationRules !== null" class="error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationObserverInstance, ValidationProvider } from "vee-validate";

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
  /** The name of the component */
  @Prop({ default: "anx-textarea" }) name!: string;
  /**label: the label text for the textarea */
  @Prop({ default: "Additional Text" }) label!: string;
  /**rows: the number of rows for the textarea */
  @Prop({ default: "4" }) rows!: string;
  /**disabled: set the diasbled attribute of the textarea.
   * When the textarea should be diabled you must set it in most cases with this prop
   */
  @Prop({ default: null }) disabled!: boolean | null;
  /**width: the width of the textarea */
  @Prop({ default: "100%" }) width!: string;
  /**validation: is it set (true) then there will be validation-provider */
  @Prop({ default: null }) validation!: boolean | null; // This property is obsolete, don't use it
  /**rules: the rules for the validation. default is required */
  @Prop({ default: null }) rules!: string;
  /** This is the value passed automatically via v-model */
  @Prop({ default: "" }) value!: string;

  private active = false;
  private filled = false;
  public updateInputField = "";

  get cssProps() {
    return {
      "--textarea-width": this.width
    };
  }

  /**Watch the updateInputField variable. When it changed, then it check if
   * the input field should be active or not (User is typing)
   */
  @Watch("updateInputField")
  nameChanged(newVal: string) {
    if (newVal && newVal.length) {
      this.active = true;
    }
  }

  /**
   * Watch the attribute/prop value. When the value change, then it set the updateInputField
   * variabel with the new value (need to be pass to the parent) and set the input-field to filled.
   */
  @Watch("value")
  valueChanged() {
    console.log("value changed");
    this.updateInputField = this.value !== null ? this.value : "";
    this.isFilled();
  }

  /**
   * This function is needed, because the validation property is obsolete, but is used in some applications.
   * Backward compatibility is implemented by this function.
   * In the old anx-textarea, if the validation property was set, the rules would be required by default, without setting it.
   */
  private get validationRules() {
    if (this.validation !== null && this.rules === null) {
      return "required";
    }
    return this.rules;
  }

  /** Check if the input-field is filled, Set class filled. */
  protected isFilled() {
    if (this.updateInputField && this.updateInputField.length > 0) {
      this.filled = true;
    } else {
      this.filled = false;
    }
  }

  /**When the User click in and out of the field, the state active will be set and
   * the state filled will be checked.
   */
  protected async inputBlur() {
    /** Trigger a validation manually, when focus is lost */
    if (this.validationRules !== null) {
      await (this.$refs.observer as ValidationObserverInstance).validate();
    }

    this.active = !this.active;
    this.isFilled();
  }

  /**
   * This function is called, when the user clicks the input field
   * If the field is readonly, nothing should happen
   */
  private clickInputField() {
    this.active = true;
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

  textarea {
    &.is-invalid,
    &.is-invalid:focus {
      border: 1px solid $anx-error !important;
      ~ label {
        color: $anx-error !important;
      }
    }
  }
}
.anx-textarea textarea {
  width: var(--textarea-width);
  padding: 20px 17px 20px 17px;
  border: 1px solid $anx-second-grey-light;
  color: $anx-lightest-grey-dark !important;
  font-family: $anx-font-family;
  font-variant-numeric: lining-nums;
  font-size: 16px;
  resize: vertical;
  overflow: auto;

  &:focus,
  &.filled {
    &.active {
      border: 1px solid #77bc1f;
    }
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
      top: 1px;
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
