<template>
  <div
    v-if="visibility || fadeIn"
    :class="`anx-toast-container anx-toast-${horizontalAlign}`"
  >
    <div
      :class="[
        {
          'anx-toast': true,
          show: visibility,
          'fade-in': fadeIn,
          'fade-out': fadeOut
        },
        `anx-toast-${type}`
      ]"
      :style="cssProps"
      @click="handleClick"
    >
      <!-- @slot use this slot to display a message -->
      <slot>
        {{ message }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator";

/**
 * The *anx-toast* is used to create push notifications for your users
 */
@Component({})
export default class AnxToast extends Vue {
  /** Use animations and transition effects when toast is opened or closed */
  @Prop({ default: true }) animations!: boolean;

  /** Close the toast automatically after the defined autoCloseTimeout */
  @Prop({ default: true }) autoClose!: boolean;

  /** The timeout for automatically closing the toast */
  @Prop({ default: 2500 }) autoCloseTimeout!: number;

  /** This is the message in the toast. This will be overwritten by the default slot if used */
  @Prop({ default: "" }) message!: string;

  /**
   * The horizontal align of the toast
   *
   * @values left, center, right
   */
  @Prop({ default: "right" }) horizontalAlign!: string;

  /**
   * This is the type of the toast (this only affetcs the design)
   *
   * @values error, warning, success
   */
  @Prop({ default: "success" }) type!: string;

  /** This is the value for the toast that can be accessed via *v-model* */
  @Prop({ default: null }) value!: boolean | null;

  /** By default, the toast will be closed when a user clicks on it. By setting this property, the toast won't be closed when the user clicks on it */
  @Prop({ default: null }) disableCloseOnClick!: boolean | null;

  /**
   * This is the background color for the toast. (Will be directly passed into CSS)
   * *Note*: This will ovverride the **type** property and default styling settings
   */
  @Prop({ default: null }) backgroundColor!: string | null;

  /**
   * This is the text color for the toast. (Will be directly passed into CSS)
   * *Note*: This will ovverride the **type** property and default styling settings
   */
  @Prop({ default: null }) color!: string | null;

  /** Check for value changes and adapt the visibility of the toast */
  @Watch("value")
  onValueChanged() {
    // If the toast is closed, the auto close timeout has to be canceled
    if (!this.value) {
      this.cancelTimeout(this.timeouts.autoClose);
      this.timeouts.autoClose = null;
    }

    // Update the visibility
    this.updateVisibility();
  }

  /**
   * Emitts the input event
   *
   * @prop val: the new value
   * @prop byUser: value changed by user or automatically
   * @event input
   */
  @Emit("input")
  input(val: boolean, byUser?: boolean) {
    if (!val) this.dismiss(byUser ? byUser : false);
    return val;
  }

  /**
   * Emit the dismiss event
   *
   * @prop byUser: states if the user closed the toast or it has been automatically closed
   * @event dismiss
   */
  @Emit("dismiss")
  dismiss(byUser: boolean) {
    return byUser;
  }

  /**
   * Emit the destroy event.
   * This indicates that the toast can be removed from the DOM
   *
   * @event destroy
   */
  @Emit("destroy")
  destroy() {
    return true;
  }

  /** Helper variables */
  private fadeIn = false;
  private fadeOut = false;
  private visibility = false;

  /** This are the ids of the defined timeouts */
  private timeouts: {
    showAnimation: number | null;
    hideAnimation: number | null;
    autoClose: number | null;
  } = {
    showAnimation: null,
    hideAnimation: null,
    autoClose: null
  };

  /** Update visibility on creat */
  private created() {
    this.updateVisibility();
    this.visibility = this.value === null ? false : this.value;
  }

  /** Checks if the toast should be shown or not depending on the value */
  private updateVisibility() {
    if (this.value) {
      this.showAction();
    } else {
      this.hideAction();
    }
  }

  /** Show the toast */
  public showAction() {
    if (this.animations) {
      this.fadeIn = true;
      if (typeof window !== "undefined") {
        this.timeouts.showAnimation = window.setTimeout(() => {
          this.fadeIn = false;
          this.visibility = true;
        }, 500);
      }
    } else {
      this.visibility = true;
    }

    /** Check if the alert should be auto closed and set a timeout */
    if (this.autoClose) {
      if (typeof window !== "undefined") {
        this.timeouts.autoClose = window.setTimeout(() => {
          this.input(false, false);
        }, this.autoCloseTimeout);
      }
    }
  }

  /** Hide the toast */
  public hideAction() {
    if (this.animations) {
      this.fadeOut = true;
      this.timeouts.hideAnimation = window.setTimeout(() => {
        this.fadeOut = false;
        this.visibility = false;
        this.destroy();
      }, 480);
    } else {
      this.visibility = false;
      this.destroy();
    }
  }

  /** Cancel all timeouts for the toast */
  private cancelTimeout(timeout: number | null) {
    if (typeof window !== "undefined" && timeout !== null) {
      window.clearTimeout(timeout as number);
    }
  }

  /** Handle the user click and check if the toast should be closed */
  private handleClick() {
    if (this.disableCloseOnClick === null) {
      this.input(false, true);
    }
  }

  /** This are some style that are directly injected as css into the component */
  get cssProps() {
    const style: { "background-color"?: string; color?: string } = {};

    if (this.backgroundColor !== null) {
      style["background-color"] = this.backgroundColor + " !important";
    }

    if (this.color !== null) {
      style["color"] = this.color + " !important";
    }

    return style;
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.anx-toast-container {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  z-index: 1100;
  margin-bottom: 20px;

  &.anx-toast-container:last-of-type {
    margin-bottom: 0px;
  }

  &.anx-toast-left {
    justify-content: flex-start;
    align-items: flex-start;
  }

  &.anx-toast-center {
    justify-content: center;
    align-items: center;
  }

  &.anx-toast-right {
    justify-content: flex-end;
    align-items: flex-end;
  }

  .anx-toast {
    visibility: hidden;
    display: block;
    min-width: 250px;
    background-color: #333;
    text-align: center;
    padding: 15px;
    max-width: 500px;
    box-shadow: 0 0.125rem 0.625rem rgb(50 50 50 / 50%);
    position: relative;
    cursor: pointer;

    &.anx-toast-success {
      background-color: $anx-success-color;
      color: $anx-primary-white;
    }

    &.anx-toast-warning {
      background-color: $anx-warning-color;
      color: $anx-primary-white;
    }

    &.anx-toast-error {
      background-color: $anx-error-color;
      color: $anx-primary-white;
    }

    &.show {
      visibility: visible;
    }

    &.fade-in {
      visibility: visible;
      -webkit-animation: fadein 0.5s;
      animation: fadein 0.5s;
    }

    &.fade-out {
      -webkit-animation: fadeout 0.5s;
      animation: fadeout 0.5s;
    }

    @-webkit-keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @-webkit-keyframes fadeout {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    @keyframes fadeout {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  }
}
</style>
