<template>
  <div
    :id="name"
    :class="
      'anx-alert ' +
        `anx-alert-${type} ` +
        (visibility ? 'visible ' : 'hidden ') +
        (fadeIn ? 'fade-in ' : '') +
        (fadeOut ? 'fade-out ' : '')
    "
  >
    <div class="message">
      <span>
        <!-- @slot This is used for the displayed message -->
        <slot>{{ text }}</slot>
      </span>
    </div>
    <div class="dismiss" @click="input(!visibility)">&times;</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator";

/**
 * The *anx-alert* is used to delivery important messages to the user.
 * Currently the two types **error** and **success** are supported.
 */
@Component({})
export default class AnxAlert extends Vue {
  /** This is the name of the alert and will be used as id too */
  @Prop({ default: "anx-alert" }) name!: string;

  /**
   * This is the state of the alert is is usually passed via *v-model*
   * @model
   */
  @Prop({ default: false }) value!: boolean;

  /** Defines if animations like fade-in and fade-out should be used */
  @Prop({ default: true }) animations!: boolean;

  /**
   * This is the type of the alert
   * @values error, warning, success
   */
  @Prop({ default: "error" }) type!: string;

  /** If this option is set, the alert will be closed automatically after the timeout */
  @Prop({ default: null }) autoClose!: boolean | null;

  /** This is the timeout for the auto close logic */
  @Prop({ default: 5000 }) autoCloseTimeout!: number;

  /** This is the text of the alert. This can be used instead of the slot */
  @Prop({ default: "" }) text!: string;

  /** Watcher for show changes */
  @Watch("value")
  onShowChanged(val: boolean) {
    if (val) {
      this.showAction();
    } else {
      this.hideAction();
    }
  }

  /** Emit the dismiss event */
  @Emit("input")
  input(val: boolean) {
    return val;
  }

  /** Variables for anx-alert */
  visibility = false;
  fadeOut = false;
  fadeIn = false;

  /** Set visibility when mounting */
  private created() {
    this.visibility = this.value;

    /** If the Alert is visible by default, the show action has to be called at the beginning */
    if (this.value) {
      this.showAction();
    }
  }

  /** Show the alert */
  private showAction() {
    if (this.animations) {
      this.fadeIn = true;
      if (typeof window !== "undefined") {
        window.setTimeout(() => {
          this.fadeIn = false;
          this.visibility = true;
        }, 1000);
      }
    } else {
      this.visibility = true;
    }

    /** Check if the alert should be auto closed and set a timeout */
    if (this.autoClose !== null) {
      if (typeof window !== "undefined") {
        window.setTimeout(() => {
          this.input(false);
        }, this.autoCloseTimeout);
      }
    }
  }

  /** Hide the alert */
  private hideAction() {
    if (this.animations) {
      this.fadeOut = true;
      window.setTimeout(() => {
        this.fadeOut = false;
        this.visibility = false;
      }, 1000);
    } else {
      this.visibility = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.anx-alert {
  margin-bottom: $anx-form-components-spacing;
  display: none;
  opacity: 0;

  &.fade-out {
    opacity: 0 !important;
    transition: opacity 0.5s ease-in-out;
    -webkit-transition: opacity 0.5s ease-in-out;
    -moz-transition: opacity 0.5s ease-in-out;
    -ms-transition: opacity 0.5s ease-in-out;
    -o-transition: opacity 0.5s ease-in-out;
  }

  &.fade-in {
    opacity: 1 !important;
    transition: opacity 0.5s ease-in-out;
    -webkit-transition: opacity 0.5s ease-in-out;
    -moz-transition: opacity 0.5s ease-in-out;
    -ms-transition: opacity 0.5s ease-in-out;
    -o-transition: opacity 0.5s ease-in-out;
  }

  &.visible {
    opacity: 1;
    display: flex;
  }

  &.hidden {
    opacity: 0;
  }

  &.hidden:not(.fade-in) {
    display: none;
  }

  .message {
    padding: 16px;
    line-height: 1.5em;
  }

  .dismiss {
    line-height: 12px;
    font-size: 24px;
    height: 12px;
    width: 12px;
    align-self: center;
    margin: auto;
    margin-right: 16px;
  }

  .dismiss:hover {
    cursor: pointer;
  }

  &.anx-alert-error {
    border: 1px solid $anx-error-color;
    background-color: $anx-error-color-light;
    color: $anx-error-color;
  }

  &.anx-alert-success {
    border: 1px solid $anx-success-color;
    background-color: $anx-success-color-light;
    color: $anx-success-color;
  }

  &.anx-alert-warning {
    border: 1px solid $anx-warning-color;
    background-color: $anx-warning-color-light;
    color: $anx-warning-color;
  }
}
</style>
