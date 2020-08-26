<template>
  <div>
    <div
      class="anx-input"
      :class="{ active: active, filled: filled }"
      @click="active = true"
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
      >
      <label :for="id">
        {{ label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({})
export default class MyInput extends Vue {
  @Prop() name!: string;
  @Prop({ default: 'input-text-field' }) id!: string;
  @Prop() label!: string;
  @Prop({ default: 'text' }) type!: string;
  @Prop({ default: '' }) value!: string;

  private active = false;
  private filled = false;
  public updateInputField = '';

  @Watch('updateInputField')
  nameChanged (newVal: string) {
    if (newVal.length) {
      this.active = true
    }
  }

  @Watch('value')
  valueChanged () {
    // if (this.readonly !== false) {
    this.updateInputField = this.value !== null ? this.value : ''
    this.isFilled()
    // }
  }

  private mounted () {
    this.updateInputField = this.value !== null ? this.value : ''
    this.isFilled()
  }

  protected isFilled () {
    if (!this.updateInputField.length) {
      this.filled = false
    } else {
      this.filled = true
    }
  }

  protected inputBlur () {
    this.active = !this.active
    this.isFilled()
  }
}
</script>

<style lang="scss" scoped>

.anx-input {
  color: black;
  display: block;

  font-size: 16px;
  font-weight: 400;
  line-height: 25.6px;
  max-width: 100%;
  padding-top: 20px;
  position: relative;

  input {
    outline: none;
  }
}

.anx-input label {
  bottom: 0;
  color: black;
  cursor: default;
  display: block;
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
  background-color: green;
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
  border-bottom: 1px solid black;
  color: black;
  cursor: text;
  display: block;
  box-sizing: border-box;
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
  color: green;
  font-size: 12px;
  height: 65px;
  line-height: 19.2px;
  top: 4px;
  visibility: visible;
}

.anx-input.active label:after {
  background-color: green;
  left: 0;
  visibility: visible;
  width: 100%;
}
.anx-input.active input {
  background-color: transparent;
  outline: 0 none black;
}

.anx-input > input.is-invalid {
  border-bottom: 1px solid red !important;

  & ~ label {
    color: red;
  }

  &:read-only {
    border: none !important;
  }
}

label.error {
  color: red !important;
}
label.error::after {
  background-color: red !important;
}

span.error {
  font-size: 12px;
  color: red;
  padding: 0;
  white-space: nowrap;
}

span.assistiv {
  font-size: 12px;
  color: black;
  padding: 0;
  white-space: nowrap;
}
</style>
