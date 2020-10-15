<template>
  <!-- Checkbox with validation provider -->
  <ValidationProvider
    v-if="validation !== null"
    v-slot="{ errors }"
    :name="name"
    rules="required:true"
  >
    <div class="anx-checkbox">
      <label :for="name">
        <input
          :id="name"
          :name="name"
          type="checkbox"
          v-validate="'required:true'"
          v-model="valueModel"
          :class="errors && errors.length > 0 ? 'is-invalid' : ''"
          @change="$emit('input', valueModel)"
        />
        <div class="text">{{ name }}</div>
      </label>
      <span class="error">{{ errors[0] }}</span>
    </div>
  </ValidationProvider>
  <!-- standard Checkbox-->
  <div v-else class="anx-checkbox">
    <label :for="name">
      <input
        :id="name"
        :name="name"
        type="checkbox"
        v-model="valueModel"
        @change="$emit('input', valueModel)"
      />
      <div class="text">{{ name }}</div>
    </label>
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
export default class AnxCheckbox extends Vue {
  /** This is the name of the input with type checkbox and the label text */
  @Prop() name!: string;
  /** If the validation property is set, a ValidationProvider with "required" validation will be added */
  @Prop({ default: null }) validation!: boolean | null;
  /** This is the property, that can be used via v-model. The @input event will automatically be emitted on change */
  @Prop({}) value!: boolean;

  /** Watch, if the value in the parent changes */
  @Watch("value")
  onValueChanged(newVal: boolean) {
    this.valueModel = newVal;
  }

  /** Use a seperate variable for v-model in the AnxCheckbox component to avoid mutating the parent property directly */
  private valueModel = false;

  /** Assign the value to the variable we use for v-model */
  private beforeMount() {
    this.valueModel = this.value;
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-checkbox {
  margin-bottom: $form-components-spacing;

  label {
    display: ruby-base;
    margin: 0;
    color: $anx-lightest-grey-dark !important;
    font-size: 16px;
  }

  input {
    height: 13px !important;
    width: 13px !important;
    padding: 2px !important;
    border: 1px solid $anx-primary-green !important;
    margin: 0px 10px 0px 0px !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    content: " ";
    outline: none;
    display: inline-block;

    /** IE9+ */
    &[type="checkbox"]::-ms-check {
      border: 1px solid $anx-primary-green !important;
      background: transparent;
      content: " ";
      outline: none;
      color: #fff;
    }

    &:checked {
      color: #fff;
      border-color: $anx-primary-green !important;
      background: $anx-primary-green url(../assets/icons/check-white.svg)
        no-repeat center;
      border: 1px solid;
    }
    /**IE9+  */
    &:checked::-ms-check {
      color: #fff;
      border-color: $anx-primary-green !important;
      background: $anx-primary-green;
      border: 1px solid;
    }

    &:disabled {
      border-color: $anx-second-grey-light !important;
    }

    &.is-invalid {
      border-color: $anx-error !important;

      ~ .text {
        color: $anx-error;
      }
    }

    /**IE 9+ */
    &.is-invalid::-ms-check {
      border-color: $anx-error !important;

      ~ .text {
        color: $anx-error;
      }
    }
  }

  .text {
    display: inline-block;

    /** The full width minus the width of the checkbox itself and the margin of the checkbox */
    width: calc(100% - 23px);
  }

  span.error {
    font-size: 12px;
    color: $anx-error;
    padding: 0;
    white-space: nowrap;
    display: block;
  }
}
</style>
