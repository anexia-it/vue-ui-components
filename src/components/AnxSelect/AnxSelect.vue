<template>
  <ValidationProvider
    :name="label"
    :rules="cValidationRules"
    v-slot="{ errors }"
    tag="div"
  >
    <div
      @click="show = !show"
      :class="{
        'anx-select': true,
        'dynamic-height': dynamicHeight,
        is_invalid: error.length > 0 || errors.length > 0
      }"
      :style="cssProps"
      ref="anxSelect"
    >
      <label :for="id" @click.prevent> {{ label }}</label>
      <select :id="id" :name="id" v-model="selected">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}</option
        >
      </select>
      <div class="anx-select-div">
        {{ selectedText }}
      </div>
      <ul class="anx-select-options" :class="{ show: show }">
        <li
          v-for="option in options"
          :key="option.value"
          :rel="option.value"
          :class="{ active: selected === option.value }"
          @click.stop="select(option)"
        >
          {{ option.text }}
        </li>
      </ul>
    </div>
    <div v-if="error.length > 0 || errors.length > 0" class="anx-select-error">
      <span v-if="error.length > 0" class="error">{{ error[0] }}</span>
      <span v-else class="error">{{ errors[0] }}</span>
    </div>
  </ValidationProvider>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ValidationProvider } from "vee-validate";

/**
 * This component is an advanced version of the HTML select tag that matches our style guidelines
 */
@Component({
  components: {
    ValidationProvider
  }
})
export default class AnxSelect extends Vue {
  /** This is the id of the select field */
  @Prop({ default: "anx-select" }) id!: string;
  /** This is the label that will be displayed as description for the select input field */
  @Prop({ default: "" }) label!: string;
  /** This is the index that should be selected */
  @Prop({ default: 0 }) selectedIndex!: number;
  /**
   * This are the options for the select input field.
   * The properry should be an array of objcets with the following two properties: <br>
   * **value**: the value of the options and the value who will be passed to the parent<br>
   * **text**: the text who will be show in the application as label/text<br>
   * You can add a default/optional placeholder like "please choose one option" with {value: null, text: "please choose one option"}
   * The value for a placeholder must be "null" (important for the validation)
   */
  @Prop({ required: true }) options!: Array<{ value: string; text: string }>;
  /** The width for the select field */
  @Prop({ default: "100%" }) width!: string;
  /**
   * If this property is set, a default required validation will be applied
   * @deprecated Use **validationRules** instead to define the rules directly
   */
  @Prop({ default: null }) validation!: boolean | null;
  /** The rules for the validation */
  @Prop({ default: null }) validationRules!: string | null;

  /**
   * Check if a validation rule is provided and return this validation rule
   * If validation parameter is provided, return the default validation rule
   * Otherwise return an empty string
   */
  private get cValidationRules() {
    if (this.validationRules !== null) return this.validationRules;

    if (this.validation !== null) return "excluded:null";

    return "";
  }

  private selected = this.options[this.selectedIndex].value;
  private selectedText = this.options[this.selectedIndex].text;
  private show = false;
  private error: string[] = [];
  private dynamicHeight = false;

  get cssProps() {
    return {
      "--select-width": this.width
    };
  }

  /**
   * Watch the selected variable. When selected is changed, the new value will be verify.
   * option "immediate:true" means, it will be execute before mounted
   * (this is important, for the validation observer)
   */
  @Watch("selected", { immediate: false })
  async onSelectedChanged(val: string) {
    if (val && this.validation !== null) {
      await this.verify(val);
    }

    window.setTimeout(this.handleResize, 100);
  }

  /**
   * Verfiy the selected value and generate the error-message for the custom select.
   */
  private async verify(value: string) {
    const { errors } = await this.$validator.verify(
      value,
      this.cValidationRules,
      {
        name: this.label
      }
    );
    this.error = errors;
  }

  /**
   * Reset the error, because after mount it shouldn't show the error message
   */
  public mounted() {
    this.error = [];

    this.closeOnClickOutsideElement();
    window.setTimeout(this.handleResize, 100);
  }

  // Interface for ref
  $refs!: {
    anxSelect: HTMLFormElement;
  };

  /** Adapt the multiline select to the design */
  public handleResize() {
    this.dynamicHeight = this.$refs.anxSelect.clientHeight >= 38;
  }

  /** Close the select dialoag when the users clicks outside of the anx-select */
  private closeOnClickOutsideElement() {
    /** Add click event listener to the whole document */
    document.body.addEventListener("click", event => {
      /** This is the element, the user clicked */
      const clickedElement = event.target as Node;

      /** Check if the user clicked outside of the anx-select and close it */
      if (clickedElement) {
        if (!this.isElementOrChild(this.$el, clickedElement)) {
          this.closeDialoag();
        }
      }
    });
  }

  /** Handle a click outside the modal */
  private closeDialoag() {
    this.show = false;
  }

  /** Check if child matches elem or child is a child of elem */
  private isElementOrChild(elem: Node, child: Node) {
    return child === elem || elem.contains(child);
  }

  /**
   * Set the variable with the selcted option and emit the input-event
   */
  public select(option: { value: string; text: string }) {
    this.selected = option.value;
    this.selectedText = option.text;
    this.show = false;

    /** This emits the input event with the selected user input */
    this.$emit("input", this.selected);
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.show {
  display: block !important;
}

.anx-select {
  font-family: $anx-font-family;
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: var(--select-width);
  color: $anx-lightest-grey-dark;
  min-height: 25px;
  height: auto;
  margin-bottom: $form-components-spacing;
  margin-top: 23px; /*real margin 53px, because all form-components has 30px margin-bottom*/
  font-size: 16px;
  border-bottom: 1px solid $anx-second-grey-light;

  &.dynamic-height {
    .anx-select-div {
      margin-top: 15px;
    }
  }

  label {
    white-space: nowrap;
    width: auto;
    cursor: pointer;
  }

  select {
    display: none;
    visibility: hidden;
    opacity: 0;
  }

  .anx-select-div {
    float: right;
    color: $anx-primary-green;
    position: relative;
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

    &:after {
      background-position: 0 0;
      background-image: url(../../assets/icons/arrow-green-bottom.svg);
      width: 12px;
      height: 11px;
      content: "";
      background-repeat: no-repeat;
      position: absolute;
      right: 0;
      top: 4px;
    }

    &:hover {
      background-color: transparent;
    }
  }

  .anx-select-options {
    display: none;
    position: absolute;
    top: calc(100% + 2px);
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

    li {
      text-align: right;
      padding: 4px 18px 0px 18px;
      margin: 0;
      -moz-transition: all 0.15s ease-in;
      -o-transition: all 0.15s ease-in;
      -webkit-transition: all 0.15s ease-in;
      transition: all 0.15s ease-in;
      position: relative;
      min-height: 25px;
      height: auto;

      &:hover {
        color: #fff;
        background: $anx-primary-green;
      }

      &.active {
        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
          /* IE10+ CSS styles go here */
          color: $anx-primary-green;

          &:before {
            display: none;
          }
        }
        &:before {
          content: "";
          width: 16px;
          height: 16px;
          min-width: 16px;
          background-image: url(../../assets/icons/check-green.svg);
          background-repeat: no-repeat;
          position: absolute;
          top: 4px;
          margin-left: -20px;
          background-position: 50%;
        }

        &:hover {
          &:before {
            background-image: url(../../assets/icons/check-white.svg) !important;
          }
        }
      }
    }
  }

  &.is_invalid {
    margin-bottom: 0px;

    label {
      color: $anx-error;
    }
    .anx-select-div {
      color: $anx-error;
      &:after {
        background-image: url(../../assets/icons/arrow-red-bottom.svg);
      }
    }
  }
}

.anx-select-error {
  margin-bottom: $form-components-spacing;

  span {
    font-size: 12px;
    color: $anx-error;
    padding: 0;
    white-space: nowrap;
  }
}
</style>
