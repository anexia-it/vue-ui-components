<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
    <div
      v-if="className === 'anx-input'"
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
        type="text"
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
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import { ValidationProvider } from "vee-validate";

@Component({
  components: {
    ValidationProvider
  }
})
export default class AnxInputField extends Vue {
  @Prop() rules!: string;

  @Prop() name!: boolean;

  @Prop({ default: "input-text-field" }) id!: string;

  @Prop() label!: string;

  @Prop({ default: "anx-input" }) className!: string;

  @Prop({ default: "100%" }) width!: string;

  @Prop() assistiveText!: string;

  private active = false;
  private filled = false;
  public updateInputField = "";

  @Watch("updateInputField")
  nameChanged(newVal: string) {
    if (newVal.length) {
      this.active = true;
    }
  }

  private mounted() {
    this.isFilled();
  }

  get cssProps() {
    return {
      "--input-width": this.width
    };
  }

  protected isFilled() {
    if (!this.updateInputField.length) {
      this.filled = false;
    } else {
      this.filled = true;
    }
  }

  protected inputBlur() {
    this.active = !this.active;
    this.isFilled();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.anx-input {
  color: $anx-lightest-grey-dark;
  display: block;
  font-family: MetaWebPro, Helvetica Neue, Helvetica, Arial, sans-serif;
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
  font-family: MetaWebPro, Helvetica Neue, Helvetica, Arial, sans-serif;
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
  font-family: MetaWebPro, Helvetica Neue, Helvetica, Arial, sans-serif;
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
