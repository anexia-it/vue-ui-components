<template>
  <div class="anx-checkbox">
    <label :for="name">
      <input
        :id="name"
        type="checkbox"
        :value="name"
        v-model="checked"
        @change="$emit('change', [checked, name])"
      />
      <div class="text">{{ name }}</div>
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class AnxCheckbox extends Vue {
  @Prop() name!: string;

  private checked = false;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.anx-checkbox {
  font-family: MetaWebPro, Helvetica Neue, Helvetica, Arial, sans-serif;
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
      background: $anx-primary-green url(../assets/check-white.svg) no-repeat
        center;
      border: 1px solid;
    }

    &:disabled {
      border-color: $anx-second-grey-light !important;
    }
  }

  .text {
    display: inline-block;
  }
}
</style>
