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
        <slot />
      </span>
    </div>
    <div class="dismiss" @click="dismiss">&times;</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator";

@Component({})
export default class AnxAlert extends Vue {
  /** This is the id of the alert */
  @Prop({ default: "anx-alert" }) name!: string;

  /** Set this to false to show the alert by default */
  @Prop({ default: true }) show!: boolean;

  /** Define if animations like fade-in and fade-out should be used */
  @Prop({ default: true }) animations!: boolean;

  /** This is the type of the error. Possible is error, success, danger */
  @Prop({ default: "error" }) type!: string; // TODO: implement other type like success

  /** Watcher for show changes */
  @Watch("show")
  onShowChanged(val: boolean) {
    if (val) {
      this.showAction();
    } else {
      this.hideAction();
    }
  }

  /** Emit the dismiss event */
  @Emit("dismiss")
  dismiss() {
    return true;
  }

  /** Variables for anx-alert */
  visibility = true;
  fadeOut = false;
  fadeIn = false;

  /** Set visibility when mounting */
  private mounted() {
    this.visibility = this.show;
  }

  /** Show the alert */
  private showAction() {
    console.log("show action");
    if (this.animations) {
      this.fadeIn = true;
      window.setTimeout(() => {
        this.fadeIn = false;
        this.visibility = true;
      }, 1000);
    } else {
      this.visibility = true;
    }
  }

  /** Hide the alert */
  private hideAction() {
    console.log("hide action");
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
@import "@/assets/scss/_variables.scss";

.anx-alert {
  display: flex;
  opacity: 1;

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

  &.hidden {
    opacity: 0;
  }

  &.hidden:not(.fade-in) {
    display: none;
  }

  .message {
    padding: 16px;
    line-height: 16px;
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
    border: 1px solid $anx-error;
    background-color: $anx-error-light;
    color: $anx-error;
  }

  &.anx-alert-success {
    border: 1px solid $anx-primary-green;
    background-color: $anx-primary-green-light;
    color: $anx-primary-green;
  }
}
</style>
