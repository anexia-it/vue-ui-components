<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="dataVvAs === null ? name : dataVvAs"
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
      v-model="localValue"
      :class="{ filled, active, 'is-invalid': errors && errors.length > 0 }"
      :autocomplete="autocomplete"
      @input="$emit('input', localValue)"
      @blur="inputBlur"
      @click="clickInputField()"
    />
    <label id="textarea-label" :for="id">{{ label }}</label>
    <span
      v-if="validationRules !== null && errors && errors.length > 0"
      class="error"
      >{{ errors[0] }}</span
    >
  </ValidationProvider>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationObserverInstance, ValidationProvider } from "vee-validate";

/**
 * This component is an advanced input textarea
 */
@Component({
  components: {
    ValidationProvider
  }
})
export default class AnxTextarea extends Vue {
  /** This is the name of the textarea */
  @Prop({ default: "anx-textarea" }) id!: string;
  /** This is the name of the textarea */
  @Prop({ default: "anx-textarea" }) name!: string;
  /** This will be shown as field name in error messages. Can be used for localization */
  @Prop({ default: null }) dataVvAs!: string | null;
  /** This is the label of the textarea that will be displayed */
  @Prop({ default: "Additional Text" }) label!: string;
  /** This is the number of rows the textarea should have */
  @Prop({ default: "4" }) rows!: string;
  /** With this property you can set the textarea to disabled */
  @Prop({ default: null }) disabled!: boolean | null;
  /** This is the width of the textarea */
  @Prop({ default: "100%" }) width!: string;
  /**
   * If this property is set to true, a standard *required* validation will be applied on the textarea
   * @deprecated Use the *rules* property instead to define rules
   */
  @Prop({ default: null }) validation!: boolean | null;
  /** These are the rules for validation. See [VeeValidate Rules](https://vee-validate.logaretm.com/v2/guide/rules.html). */
  @Prop({ default: null }) rules!: string;
  /** This is the value passed automatically via v-model */
  @Prop({ default: null }) value!: string;
  /** HTML autocomplete attribute */
  @Prop({ default: "" }) autocomplete!: string;

  private active = false;
  private filled = false;

  /** This variable is used as v-model for the input field (Using the value variable directly is not allowed because props should not be mutated directly) */
  private localValue = "";

  get cssProps() {
    return {
      "--textarea-width": this.width
    };
  }

  /**
   * Watch the localValue variable used as v-model for the textarea
   * When it changes, the users is typing and changed some text, it has
   * to be checked if the textarea should be active or not.
   */
  @Watch("localValue")
  localValueChanged(newVal: string) {
    if (newVal && newVal.length) {
      this.active = true;
    }
  }

  /**
   * Watch the attribute/prop value.
   * When this variable changes it means that the value for the textarea has been
   * updated from the parent component programmatically. The localValue variable has to
   * be assigned and it has to be checked, if the textarea is filled
   */
  @Watch("value")
  valueChanged() {
    this.localValue = this.value !== null ? this.value : "";
    this.isFilled();
  }

  /**
   * After mount, the prop value has to be assigned to the localValue and it has to be checked,
   * if the input field should be filled
   */
  private mounted() {
    this.localValue = this.value !== null ? this.value : "";
    this.isFilled();
  }

  /** Do a validation if the component is updated */
  private updated() {
    /** Only validate, if the value is set */
    if (this.value && this.value !== "") this.validate();
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
    if (this.localValue && this.localValue.length > 0) {
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
    this.validate();

    this.active = !this.active;
    this.isFilled();
  }

  /** Validate the input with the defined rules */
  public async validate() {
    if (this.validationRules !== null) {
      await (this.$refs.observer as ValidationObserverInstance).validate();
    }
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
@import "../../assets/scss/_variables.scss";

.anx-textarea {
  font-family: $anx-font-family;
  width: var(--textarea-width);
  display: block;
  position: relative;
  padding-top: 9px;
  margin-bottom: $anx-form-components-spacing; /* real margin ~35px */

  @media only screen and (width: 1125px), only screen and (width: 1200px) {
    display: inline-block !important;
  }

  textarea {
    &.is-invalid,
    &.is-invalid:focus {
      border: 1px solid $anx-error-color !important;
      ~ label {
        color: $anx-error-color !important;
      }
    }
  }
}
.anx-textarea textarea {
  width: var(--textarea-width);
  padding: 20px 17px 20px 17px;
  border: 1px solid $anx-hint-grey;
  color: $anx-dark-grey-color-lightest !important;
  font-family: $anx-font-family;
  font-variant-numeric: lining-nums;
  font-size: 16px;
  resize: vertical;
  overflow: auto;

  &:focus,
  &.filled {
    &.active {
      border: 1px solid $anx-success-color;
    }
    outline: 0;

    + label {
      color: $anx-success-color !important;
      margin-left: 15px;
      background-color: $anx-primary-white;
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
  color: $anx-dark-grey-color-lightest !important;
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
  color: $anx-error-color;
  padding: 0;
  white-space: nowrap;
  display: block;
}
</style>
