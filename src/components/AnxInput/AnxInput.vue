<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :name="dataVvAs === null ? name : dataVvAs"
    :rules="rules"
    tag="div"
    :class="{
      'anx-input': true,
      active: active,
      filled: filled,
      inline: inline !== null ? true : false,
      'is-disabled': disabled !== null ? true : false
    }"
    :style="cssProps"
    ref="observer"
  >
    <!--
      This will be emitted on user input
      @event input
    -->
    <input
      :id="id"
      v-model="localValue"
      :type="type"
      :name="name"
      hide-details="true"
      @blur="inputBlur"
      @click="clickInputField()"
      :class="{
        'is-invalid': errors && errors.length > 0,
        'with-margin': (typeof valid !== 'boolean' || valid) && !assistiveText
      }"
      @input="$emit('input', localValue)"
      :autocomplete="autocomplete"
      :readonly="readonly !== null ? true : false"
      :disabled="disabled !== null"
    />
    <label :for="id" :class="errors && errors.length > 0 ? 'error' : ''">
      {{ label }}
    </label>
    <div
      v-if="
        (errors && errors.length > 0) ||
          (assistiveText && assistiveText.length > 0)
      "
      :class="{
        'anx-input-hint': true,
        inline: inline !== null ? true : false
      }"
    >
      <span v-if="errors && errors.length > 0" class="error">{{
        errors[0]
      }}</span>
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
  @Prop({ default: "Input" }) label!: string;
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
  /** With this property you can set the input field to disabled */
  @Prop({ default: null }) disabled!: boolean | null;

  private active = false;
  private filled = false;

  /** This variable is used as v-model for the input field (Using the value variable directly is not allowed because props should not be mutated directly) */
  private localValue = "";

  /**
   * Watch the localValue variable used as v-model for the input field
   * When it changes, the users is typing and changed some text, it has
   * to be checked if the input field should be active or not.
   */
  @Watch("localValue")
  localValueChanged(newVal: string) {
    if (newVal && newVal.length) {
      this.active = true;
    }
  }

  /**
   * Watch the attribute/prop value.
   * When this variable changes it means that the value for the input field has been
   * updated from the parent component programmatically. The localValue variable has to
   * be assigned and it has to be checked, if the input field is filled
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

  get cssProps() {
    return {
      "--input-width": this.width
    };
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
@import "../../assets/scss/_variables.scss";

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

  &.is-disabled {
    opacity: 0.6;
    input {
      cursor: default;
    }
  }

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
