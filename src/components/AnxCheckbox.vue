<template>
  <!-- Checkbox with validation provider -->
  <ValidationProvider
    v-if="validation"
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
          :value="name"
          v-model="checked"
          :class="errors && errors.length > 0 ? 'is-invalid' : ''"
          @change="$emit('input', { checked, name })"
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
        :value="name"
        v-model="checked"
        @change="$emit('input', { checked, name })"
      />
      <div class="text">{{ name }}</div>
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ValidationProvider } from "vee-validate";

@Component({
  components: {
    ValidationProvider
  }
})
export default class AnxCheckbox extends Vue {
  /**with this property, a checkbox can be set */
  /**Props
   * name: the name of the input with type checkbox and the label text
   */
  @Prop() name!: string;
  /**validation: is it set (true) then there are a default validation provider (check is_set/required) */
  @Prop({ default: false }) validation!: boolean;

  private checked = false;
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
    border-color: $anx-primary-green !important;
    border: 1px solid;
    margin: 0px 10px 0px 0px !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    content: " ";
    outline: none;

    &[type="checkbox"]::-ms-check {
      display: none;
      border-color: $anx-primary-green !important;
      background: transparent;
    }

    &:checked {
      color: #fff;
      border-color: $anx-primary-green !important;
      background: $anx-primary-green url(../assets/icons/check-white.svg)
        no-repeat center;
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
  }

  .text {
    display: inline-block;
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
