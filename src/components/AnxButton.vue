<template>
  <button
    :type="btnType"
    :class="{
      'anx-button': true,
      inline: inline !== null,
      'btn-outline': outline !== null
    }"
    :style="cssProps"
    @click="$emit(eventName)"
  >
    <!-- @slot Use this slot for the button text -->
    <slot>
      {{ text }}
    </slot>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import design from "../assets/scss/_variables.scss";

@Component({})
export default class AnxButton extends Vue {
  /** This is the type of the button */
  @Prop({ default: "submit" }) btnType!: string;
  /** The type of the button (default, outline) */
  @Prop({ default: null }) outline!: boolean | null;
  /** This is the text of the button. This can also be set using the slot */
  @Prop({ default: "button" }) text!: string;
  /** This is the width of the button */
  @Prop({ default: null }) width!: string | null;
  /** With this property, the button can be set to inline */
  @Prop({ default: null }) inline!: boolean | null;
  /** This is the name of the event, that will be emitted on click */
  @Prop({ default: "click" }) eventName!: string;
  /** Set the color of the button (property will be directly passed into css, so use e.g. HEX code) */
  @Prop({ default: null }) color!: string | null;
  /** This is the color for a disabled button */
  @Prop({ default: null }) disabledColor!: string | null;

  get cssProps() {
    return {
      "--button-width": this.width !== null ? this.width : "auto",
      "--button-color":
        this.color !== null ? this.color : design.defaultButtonColor,
      "--button-color-disabled":
        this.disabledColor !== null
          ? this.disabledColor
          : design.defaultButtonColorDisabled
    };
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

button {
  width: var(--button-width);
  min-height: 2.5em; //40px
  height: auto;
  border: none;
  font-size: 16px;
  vertical-align: middle;
  outline: 0 none;
  padding-top: 10px;
  padding-bottom: 10px;
  text-decoration: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: $anx-font-family;
}

/* anx-button - super cool animation button */
/***/
.anx-button {
  z-index: 100;
  position: relative;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  font-weight: none;
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
  transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  text-align: center;
  background-color: var(--button-color);
  border: 1px solid var(--button-color);
  &:disabled {
    background-color: var(--button-color-disabled) !important;
    border: 1px solid var(--button-color-disabled) !important;
  }
  padding-left: 2em;
  padding-right: 2em;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:before,
  &:after {
    content: "";
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transition: opacity 0.3s, -webkit-transform 0.3s;
    transition: transform 0.3s, opacity 0.3s;
    transition: transform 0.3s, opacity 0.3s, -webkit-transform 0.3s;
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  }

  &:before {
    //border: 1px solid $anx-primary-green;
    opacity: 0;
    -webkit-transform: scale3d(1.2, 1.2, 1);
    transform: scale3d(1.2, 1.2, 1);
  }

  &:visited {
    color: var(--button-color);
    text-decoration: none;
  }

  &:not(:disabled) {
    cursor: pointer;

    &:hover {
      color: var(--button-color);
      background-color: $anx-primary-white;
      text-decoration: none;

      &:before {
        opacity: 1;
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }

      &:after {
        opacity: 0;
        -webkit-transform: scale3d(0.8, 0.8, 1);
        transform: scale3d(0.8, 0.8, 1);
      }
    }
  }
}

/*btn-outline animated button*/
.btn-outline {
  color: var(--button-color) !important;
  border: 1px solid var(--button-color) !important;
  background-color: $anx-primary-white;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:before {
    border: none !important;
  }

  &:visited {
    color: white;
    text-decoration: none;
  }

  &:hover {
    background-color: var(--button-color) !important;
    color: white !important;
    text-decoration: none;
  }
}

.inline {
  margin-right: 30px;
}
</style>
