<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :name="dataVvAs === null ? name : dataVvAs"
    :rules="rules"
    tag="div"
    class="anx-input"
    :class="{
      active: active,
      filled: filled,
      inline: inline !== null ? true : false
    }"
    :style="cssProps"
    ref="observer"
  >
    <input
      :id="id"
      v-model="updateInputField"
      :type="type"
      :name="name"
      hide-details="true"
      @blur="inputBlur"
      @click="clickInputField()"
      :class="{
        'is-invalid': errors && errors.length > 0,
        'with-margin': (typeof valid !== 'boolean' || valid) && !assistiveText
      }"
      @input="$emit('input', updateInputField)"
      :autocomplete="autocomplete"
      :readonly="readonly !== null ? true : false"
    />
    <label :for="id" :class="errors && errors.length > 0 ? 'error' : ''">
      {{ label }}
    </label>
    <div
      v-if="errors.length > 0 || (assistiveText && assistiveText.length > 0)"
      :class="{
        'anx-input-hint': true,
        inline: inline !== null ? true : false
      }"
    >
      <span v-if="errors.length > 0" class="error">{{ errors[0] }}</span>
      <span
        v-else-if="assistiveText && assistiveText.length > 0"
        class="assistiv"
        >{{ assistiveText }}</span
      >
    </div>

    <div v-if="inline !== null" class="inline-content-right">
      <!-- @slot This slot is used for displaying content on the right side of the input -->
      <slot>
        <!-- The content in here will be displayed on the right (to use inline elements) -->
      </slot>
    </div>
  </ValidationProvider>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import { ValidationObserverInstance, ValidationProvider } from "vee-validate";

/**
 * This component is a advanced version of the simple HTML input tag. This component is used for user input via a textbox.
 */
@Component({
  components: {
    ValidationProvider
  }
})
export default class AnxInput extends Vue {
  /** This is the name of the input field */
  @Prop({ default: "anx-input" }) name!: string;
  /** This will be shown as field name in error messages. Can be used for localization */
  @Prop({ default: null }) dataVvAs!: string | null;
  /** This is the id of the input field */
  @Prop({ default: "input-text-field" }) id!: string;
  /** This is the label of the input field that will be displayed */
  @Prop() label!: string;
  /** This property will be directly translated to HTML input type of the input field */
  @Prop({ default: "text" }) type!: string;
  /** These are the rules for validation. See [VeeValidate Rules](https://vee-validate.logaretm.com/v2/guide/rules.html). */
  @Prop({ default: null }) rules!: string | null;
  /** The width of the input field */
  @Prop({ default: "100%" }) width!: string;
  /**
   * This is the assisitive text that will be displayed underneath
   * the input field. Will only be shown, if there are no errors.
   */
  @Prop({ default: null }) assistiveText!: string | null;
  /**
   * If this property is set there will be no validation and you
   * can't change the value. The style and the behaviour of the
   * input will remain the same. The value can still be changed
   * programmatically via the v-model.
   */
  @Prop({ default: null }) readonly!: boolean | null;
  /** this is the value that can be used via **v-model** */
  @Prop({ default: "" }) value!: string;
  /** Display the input field inline */
  @Prop({ default: null }) inline!: boolean | null;
  /** HTML autocomplete attribute */
  @Prop({ default: "" }) autocomplete!: string;

  private active = false;
  private filled = false;
  public updateInputField = "";

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
    this.updateInputField = this.value !== null ? this.value : "";
    this.isFilled();
  }

  /**After creation the value will be save in the updateInputField and check if it has the
   * state filled.
   */
  private mounted() {
    this.updateInputField = this.value;
    this.isFilled();
  }

  /** Do a validation if the component is updated */
  private updated() {
    /** Only validate, if the value is set */
    if (this.value && this.value !== "") this.validate();
  }

  get cssProps() {
    return {
      "--input-width": this.width
    };
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
  protected inputBlur() {
    /** Do validation on focus lost */
    this.validate();

    if (this.readonly === null) {
      this.active = !this.active;
      this.isFilled();
    }
  }

  /** Validate the input with the defined rules */
  private async validate() {
    if (this.rules !== null) {
      await (this.$refs.observer as ValidationObserverInstance).validate();
    }
  }

  /**
   * This function is called, when the user clicks the input field
   * If the field is readonly, nothing should happen
   */
  private clickInputField() {
    if (this.readonly === null) {
      this.active = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-input {
  color: $anx-lightest-grey-dark;
  display: block;
  font-family: $anx-font-family;
  font-size: 16px;
  font-weight: 400;
  line-height: 25.6px;
  max-width: 100%;
  padding-top: 20px;
  position: relative;
  width: var(--input-width);

  &.inline {
    width: 100% !important;
  }

  .with-margin {
    margin-bottom: $form-components-spacing;
  }

  input {
    outline: none;
    font-variant-numeric: lining-nums;
  }

  &.inline {
    input {
      outline: none;
      width: var(--input-width);
    }

    label {
      width: var(--input-width);
    }
  }

  .inline-content-right {
    position: absolute;
    right: 0px;
    top: 14px;
  }
}

.inline {
  display: inline-block;
}

.anx-input label {
  bottom: 0;
  color: $anx-lightest-grey-dark;
  cursor: default;
  display: block;
  font-family: $anx-font-family;
  font-size: 16px;
  font-weight: 400;
  height: 45px;
  left: 0;
  line-height: 25.6px;
  margin-bottom: 5px;
  overflow: hidden;
  pointer-events: none;
  right: 0;
  text-align: left;
  top: 24px;
  white-space: nowrap;
  width: 100%;
}
.anx-input label,
.anx-input label:after {
  position: absolute;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.anx-input label:after {
  background-color: $anx-primary-green;
  bottom: 15px;
  content: "";
  height: 1px;
  left: 45%;
  visibility: hidden;
  width: 10px;
}
.anx-input input {
  background-color: transparent;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid $anx-second-grey-light;
  color: $anx-lightest-grey-dark;
  cursor: text;
  display: block;
  box-sizing: border-box;
  font-family: $anx-font-family;
  font-size: 16px;
  font-stretch: 100%;
  font-style: normal;
  font-weight: 400;
  height: 34px !important;
  line-height: 25.6px;
  margin: 0;
  padding-top: 2px;
  padding-bottom: 3px;
  text-align: left;
  text-indent: 0;
  text-rendering: auto;
  text-shadow: none;
  text-size-adjust: 100%;
  text-transform: none;
  width: 100%;
  word-spacing: 0;
  writing-mode: horizontal-tb;
  -webkit-appearance: none;
  -webkit-rtl-ordering: logical;

  &:read-only {
    border: none !important;
  }

  /**for IE11 */
  &[readonly="readonly"] {
    border: none !important;

    ~ label:after {
      background-color: unset;
    }
  }
}

.anx-input.active label,
.anx-input.filled label {
  color: $anx-primary-green;
  font-size: 12px;
  height: 65px;
  line-height: 19.2px;
  top: 4px;
  visibility: visible;
}

.anx-input.active label:after {
  background-color: $anx-primary-green;
  left: 0;
  visibility: visible;
  width: 100%;
}

.anx-input.active input.is-invalid ~ label:after {
  background-color: $anx-error !important;
}

.anx-input.active input {
  background-color: transparent;
  outline: 0 none $anx-lightest-grey-dark;
}

.anx-input > input.is-invalid {
  border-bottom: 1px solid $anx-error !important;

  & ~ label {
    color: $anx-error;
  }

  &:read-only {
    border: none !important;
  }
}

.anx-input-hint {
  font-size: 12px;
  padding: 0;
  white-space: nowrap;
  margin-bottom: $form-components-spacing;
  margin-top: 5px;

  .error {
    color: $anx-error;
  }

  .error::after {
    background-color: $anx-error !important;
  }

  .assistiv {
    color: $anx-primary-grey-light;
  }
}
</style>
