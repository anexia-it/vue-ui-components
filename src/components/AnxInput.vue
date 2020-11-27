<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :name="name"
    :rules="rules"
    tag="div"
    class="anx-input"
    :class="{
      active: active,
      filled: filled,
      inline: inline !== null ? true : false
    }"
    :style="cssProps"
  >
    <input
      :id="id"
      v-model="updateInputField"
      :data-vv-as="name"
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
      <slot>
        <!-- The content in here will be displayed on the right (to use inline elements) -->
      </slot>
    </div>
  </ValidationProvider>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import { ValidationProvider } from "vee-validate";

@Component({
  components: {
    ValidationProvider
  }
})
export default class AnxInput extends Vue {
  /**With this property, a anx-input can be set and designed */
  /**Props
   * name: is the name of the input-field
   */
  @Prop({ default: "anx-input" }) name!: string;
  /**id: the id of the input field */
  @Prop({ default: "input-text-field" }) id!: string;
  /**label: the label-text of the input field */
  @Prop() label!: string;
  /** type: type of the input-field for example: text, password */
  @Prop({ default: "text" }) type!: string;
  /** rules: needed for validation
   * this are the rules, which will be used for teh input validation
   */
  @Prop({ default: null }) rules!: string | null;
  /**width: the width of the input-field */
  @Prop({ default: "100%" }) width!: string;
  /**assistiveText: the hint-text under the input-field
   * it will only be showed, when there are no errors (validation)
   */
  @Prop({ default: null }) assistiveText!: string | null;
  /**readonly: the readonly attribute for the input-field.
   * Is this prop is set there will be now validation and you
   * can't change the value. But the animation will be execute, when the
   * value is set.
   */
  @Prop({ default: null }) readonly!: boolean | null;
  /**vallue: only needed if readonly
   * is the value who will be show as input
   */
  @Prop({ default: "" }) value!: string;
  /** Display the input field inline */
  @Prop({ default: null }) inline!: boolean | null;
  /** Autocomplete attribute */
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
    if (this.readonly === null) {
      this.active = !this.active;
      this.isFilled();
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
