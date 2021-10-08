<template>
  <!-- Checkbox with validation provider -->
  <ValidationProvider
    v-if="validation !== null"
    v-slot="{ errors }"
    :name="name"
    rules="required:true"
  >
    <div class="anx-checkbox">
      <label :for="inputId">
        <!-- triggered on input (tick)
        @event input
        @property {bool} value - The state of the checkbox
        -->
        <input
          :id="inputId"
          :name="name"
          type="checkbox"
          v-model="valueModel"
          :class="errors && errors.length > 0 ? 'is-invalid' : ''"
          @change="$emit('input', valueModel)"
        />
        <div class="text">
          <!-- @slot You can use this slot to change the label for the anx-checkbox -->
          <slot>{{ name }}</slot>
        </div>
      </label>
      <span class="error">{{ errors[0] }}</span>
    </div>
  </ValidationProvider>
  <!-- standard Checkbox-->
  <div v-else class="anx-checkbox">
    <label :for="inputId">
      <input
        :id="inputId"
        :name="name"
        type="checkbox"
        v-model="valueModel"
        @change="$emit('input', valueModel)"
      />
      <div class="text">
        <span>
          <slot>
            {{ name }}
          </slot>
        </span>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationProvider } from "vee-validate";
import { AttributesHelper } from "../../lib/utils/AttributesHelper";

/**
 * The *anx-checkbox* renders a simple checkbox.
 * It works like a default HTML checkbox, but has some features implemented.
 * The layout of the checkbox also differs from a default checkbox.
 */
@Component({
  components: {
    ValidationProvider
  }
})
export default class AnxCheckbox extends Vue {
  /** This is the id for the checkbox */
  @Prop({ default: null }) id!: string | null;
  /** This is the name of the input with type checkbox. This will be used as label for the checkbox */
  @Prop({ default: "" }) name!: string;
  /** If the validation property is set, a ValidationProvider with "required" validation will be added */
  @Prop({ default: null }) validation!: boolean | null;
  /** This is the property, that can be used via v-model. The @input event will automatically be emitted on change */
  @Prop({}) value!: boolean;

  /** The id that is actually used */
  private inputId: string | undefined = "";

  /** Watch, if the value in the parent changes */
  @Watch("value")
  onValueChanged(newVal: boolean) {
    this.valueModel = newVal;
  }

  /** Use a seperate variable for v-model in the AnxCheckbox component to avoid mutating the parent property directly */
  private valueModel = false;

  /**
   * Set the id for the component when created
   */
  private created() {
    this.inputId = AttributesHelper.attributes(this, {
      uniqueId: true,
      uniqueIdPrefix: "anx-input-"
    }).id;
  }

  /** Assign the value to the variable we use for v-model */
  private beforeMount() {
    this.valueModel = this.value;
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.anx-checkbox {
  margin-bottom: $anx-form-components-spacing;

  label {
    display: ruby-base;
    margin: 0;
    color: $anx-dark-grey-color-lightest !important;
    font-size: 16px;
  }

  input {
    height: 13px !important;
    width: 13px !important;
    padding: 2px !important;
    border: 1px solid $anx-secondary-color !important;
    margin: 1px 10px 0px 0px !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    content: " ";
    outline: none;
    display: inline-block;
    vertical-align: top;

    /** IE9+ */
    &[type="checkbox"]::-ms-check {
      border: 1px solid $anx-secondary-color !important;
      background: transparent;
      content: " ";
      outline: none;
      color: #fff;
    }

    &:checked {
      color: #fff;
      border-color: $anx-secondary-color !important;
      background: $anx-secondary-color url(../../assets/icons/check-white.svg)
        no-repeat center;
      border: 1px solid;
    }
    /**IE9+  */
    &:checked::-ms-check {
      color: #fff;
      border-color: $anx-secondary-color !important;
      background: $anx-secondary-color;
      border: 1px solid;
    }

    &:disabled {
      border-color: $anx-hint-grey !important;
    }

    &.is-invalid {
      border-color: $anx-error-color !important;

      ~ .text {
        color: $anx-error-color;
      }
    }

    /**IE 9+ */
    &.is-invalid::-ms-check {
      border-color: $anx-error-color !important;

      ~ .text {
        color: $anx-error-color;
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
    color: $anx-error-color;
    padding: 0;
    white-space: nowrap;
    display: block;
  }
}
</style>
