<template>
  <ValidationProvider
    v-if="validation"
    :name="labelText"
    :rules="'included:' + cleanOptions"
    v-slot="{ errors }"
  >
    <div
      class="anx-select"
      :class="{ is_invalid: error.length > 0 || errors.length > 0 }"
      :style="cssProps"
    >
      <label :for="id + '1'"> {{ labelText }}</label>
      <select
        class="select-original"
        :id="id + '1'"
        :name="id"
        v-model="selected"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}</option
        >
      </select>
      <div class="anx-select-div" @click="show = !show">
        {{ selectedText }}
      </div>
      <ul class="anx-select-options" :class="{ show: show }">
        <li
          v-for="option in options"
          :key="option.value"
          :rel="option.value"
          :class="{ active: selected === option.value }"
          @click="select(option)"
        >
          {{ option.text }}
        </li>
      </ul>
      <span v-if="error.length > 0" class="error">{{ error[0] }}</span>
      <span v-else class="error">{{ errors[0] }}</span>
    </div>
  </ValidationProvider>
  <div v-else class="anx-select" :style="cssProps">
    <label :for="id + '1'"> {{ labelText }}</label>
    <select
      class="select-original"
      :id="id + '1'"
      :name="id"
      v-model="selected"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}</option
      >
    </select>
    <div class="anx-select-div" @click="show = !show">
      {{ selectedText }}
    </div>
    <ul class="anx-select-options" :class="{ show: show }">
      <li
        v-for="option in options"
        :key="option.value"
        :rel="option.value"
        :class="{ active: selected === option.value }"
        @click="select(option)"
      >
        {{ option.text }}
      </li>
    </ul>
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
export default class AnxSelect extends Vue {
  @Prop({ default: "anx-select-choice" }) id!: string;
  @Prop({ default: "Auswahl treffen" }) labelText!: string;
  @Prop({
    default: function() {
      return [
        { value: "default", text: "Auswahl treffen" },
        { value: "Auswahl 1", text: "Auswahl 1" },
        { value: "Auswahl 2", text: "Auswahl 2" },
        { value: "Auswahl 3", text: "Auswahl 3" },
        { value: "Auswahl 4", text: "Auswahl 4" }
      ];
    }
  })
  options!: Array<{ value: string; text: string }>;
  @Prop({ default: "100%" }) width!: string;
  @Prop({ default: false }) validation!: boolean;

  public cleanOptions: Array<string> = [];
  private selected = this.options[0].value;
  private selectedText = this.options[0].text;
  private show = false;
  private error: string[] = [];

  get cssProps() {
    return {
      width: this.width
    };
  }
  @Watch("selected", { immediate: false })
  async onSelectedChanged(val: string) {
    if (val && this.validation) {
      await this.verify(val);
    }
  }

  private async verify(value: string) {
    const { errors } = await this.$validator.verify(
      value,
      "included:" + this.cleanOptions,
      {
        name: this.labelText
      }
    );
    this.error = errors;
  }

  public mounted() {
    this.options.forEach(option => {
      if (option.value != "default") this.cleanOptions.push(option.value);
    });
    this.error = [];
  }

  public select(option: { value: string; text: string }) {
    this.selected = option.value;
    this.selectedText = option.text;
    this.show = false;
    this.$emit("input", this.selected);
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.show {
  display: block !important;
}

.anx-select {
  font-family: MetaWebPro, Helvetica Neue, Helvetica, Arial, sans-serif;
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: var(--select-width);
  color: $anx-lightest-grey-dark;
  height: 25px;
  margin-bottom: $form-components-spacing;
  font-size: 16px;

  &.is_invalid {
    label {
      color: $anx-error;
    }
    .anx-select-div {
      color: $anx-error;
      &:after {
        background-image: url(../assets/arrow-red-bottom.svg);
      }
    }
  }

  span.error {
    display: block !important;
    opacity: 1;
    font-size: 12px;
    color: $anx-error;
    padding: 0;
    white-space: nowrap;
    top: 12px;
    position: relative;
  }
}

.anx-select .select-original {
  display: none;
  visibility: hidden;
  opacity: 0;
}

.anx-select .anx-select-div {
  color: $anx-primary-green;
  border-bottom: 1px solid $anx-second-grey-light;
  position: absolute;
  top: 0;
  right: 0;
  bottom: -2px;
  left: 0;
  background-color: transparent;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  text-align: right;
  padding: 0 18px;
  width: var(--select-width);
}
.anx-select .anx-select-div:after {
  background-position: 0 0;
  background-image: url(../assets/arrow-green-bottom.svg);
  width: 12px;
  height: 11px;
  content: "";
  background-repeat: no-repeat;
  position: absolute;
  right: 0;
  top: 4px;
}
.anx-select .anx-select-div:hover {
  background-color: transparent;
}
.anx-select .anx-select-options {
  display: none;
  position: absolute;
  top: 108%;
  right: 0;
  left: 0;
  z-index: 999;
  margin: 0 0 0 0;
  padding: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid $anx-second-grey-light;
  border-top: none;
  width: var(--select-width);
}
.anx-select .anx-select-options li {
  text-align: right;
  padding-right: 18px;
  padding-top: 5px;
  margin: 0;
  -moz-transition: all 0.15s ease-in;
  -o-transition: all 0.15s ease-in;
  -webkit-transition: all 0.15s ease-in;
  transition: all 0.15s ease-in;
  position: relative;
  height: 25px;
}
.anx-select .anx-select-options li.active:before {
  content: "";
  width: 16px;
  height: 16px;
  min-width: 16px;
  background-image: url(../assets/check-green.svg);
  background-repeat: no-repeat;
  position: absolute;
  top: 5px;
  margin-left: -20px;
  background-position: 50%;
}
.anx-select .anx-select-options li:hover {
  color: #fff;
  background: $anx-primary-green;
}
</style>
