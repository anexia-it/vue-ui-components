<template>
  <!--The readonly Input field -->
  <div
    v-if="readonly !== false"
    class="anx-input"
    :class="{ filled: filled }"
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
      :class="errors && errors.length > 0 ? 'is-invalid' : ''"
      readonly="readonly !== false ? true"
    />
    <label :for="id">
      {{ label }}
    </label>
  </div>
  <!-- the normal input field with validation provider -->
  <ValidationProvider
    v-else-if="rules"
    v-slot="{ errors }"
    :name="name"
    :rules="rules"
  >
    <div
      class="anx-input"
      :class="{ active: active, filled: filled }"
      @click="active = true"
      :style="cssProps"
    >
      <input
        :id="id"
        v-model="updateInputField"
        v-validate="rules"
        :data-vv-as="name"
        :type="type"
        :name="name"
        hide-details="true"
        @blur="inputBlur"
        :class="errors && errors.length > 0 ? 'is-invalid' : ''"
        @input="$emit('input', updateInputField)"
      />
      <label :for="id" :class="errors && errors.length > 0 ? 'error' : ''">
        {{ label }}
      </label>
      <span v-if="errors.length > 0" class="error">{{ errors[0] }}</span>
      <span
        v-else-if="
          errors.length === 0 && assistiveText && assistiveText.length > 0
        "
        class="assistiv"
        >{{ assistiveText }}</span
      >
    </div>
  </ValidationProvider>
  <div
    v-else-if="!rules"
    class="anx-input"
    :class="{ active: active, filled: filled }"
    @click="active = true"
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
      @input="$emit('input', updateInputField)"
    />
    <label :for="id">
      {{ label }}
    </label>
    <span v-if="assistiveText.length > 0" class="assistiv">{{
      assistiveText
    }}</span>
  </div>
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
  @Prop() name!: string;
  /**id: the id of the input field */
  @Prop({ default: "input-text-field" }) id!: string;
  /**label: the label-text of the input field */
  @Prop() label!: string;
  /** type: type of the input-field for example: text, password */
  @Prop({ default: "text" }) type!: string;
  /** rules: needed for validation
   * this are the rules, which will be used for teh input validation
   */
  @Prop() rules!: string;
  /**width: the width of the input-field */
  @Prop({ default: "100%" }) width!: string;
  /**assistiveText: the hint-text under the input-field
   * it will only be showed, when there are no errors (validation)
   */
  @Prop({ default: "" }) assistiveText!: string;
  /**readonly: the readonly attribute for the input-field.
   * Is this prop is set (true) there will be now validation and you
   * can't change the value. But the animation will be execute, when the
   * value is set.
   */
  @Prop({ default: false }) readonly!: boolean;
  /**vallue: only needed if readonly
   * is the value who will be show as input
   */
  @Prop({ default: "" }) value!: string;

  private active = false;
  private filled = false;
  public updateInputField = "";

  /**Watch the updateInputField variable. When it changed, then it check if
   * the input field should be active or not (User is typing)
   */
  @Watch("updateInputField")
  nameChanged(newVal: string) {
    if (newVal.length) {
      this.active = true;
    }
  }
  /**FOR READONLY!
   * Watch the attribute/prop value. When the value change, then it set the updateInputField
   * variabel with the new value (need to be pass to the parent) and set the input-field to filled.
   */
  @Watch("value")
  valueChanged() {
    if (this.readonly !== false) {
      this.updateInputField = this.value !== null ? this.value : "";
      this.isFilled();
    }
  }

  /**After creation the value will be save in the updateInputField and check if it has the
   * state filled.
   */
  private mounted() {
    this.updateInputField = this.value !== null ? this.value : "";
    this.isFilled();
  }

  get cssProps() {
    return {
      "--input-width": this.width
    };
  }

  /** Check if the input-field is filled, Set class filled. */
  protected isFilled() {
    if (!this.updateInputField.length) {
      this.filled = false;
    } else {
      this.filled = true;
    }
  }

  /**When the User click in and out of the field, the state active will be set and
   * the state filled will be checked.
   */
  protected inputBlur() {
    this.active = !this.active;
    this.isFilled();
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
  margin-bottom: $form-components-spacing;

  input {
    outline: none;
  }
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
  padding: 6px 0;
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

label.error {
  color: $anx-error !important;
}
label.error::after {
  background-color: $anx-error !important;
}

span.error {
  font-size: 12px;
  color: $anx-error;
  padding: 0;
  white-space: nowrap;
}

span.assistiv {
  font-size: 12px;
  color: $anx-primary-grey-light;
  padding: 0;
  white-space: nowrap;
}
</style>
