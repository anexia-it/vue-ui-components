<template>
  <div
    :class="
      `anx-toaster anx-toaster-${_verticalAlign} anx-toaster-${_horizontalAlign}`
    "
    ref="anxToaster"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import AnxToast from "../AnxToast/AnxToast.vue";

/**
 * The *anx-toaster* is the container used for displaying the *anx-toast*
 */
@Component({
  components: {
    AnxToast
  }
})
export default class AnxToaster extends Vue {
  /**
   * The vertical align of the toast
   *
   * @values top, bottom
   */
  @Prop({ default: "top" }) verticalAlign!: string;

  /**
   * The horizontal align of the toast
   *
   * @values left, center, right
   */
  @Prop({ default: "right" }) horizontalAlign!: string;

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

  public VERTICAL_POSITIONS = ["top", "bottom"];
  public HORIZONTAL_POSITIONS = ["left", "right", "center"];

  public numberToasts = 0;

  /** Add a toast to the toaster */
  public addToast(propsData = {}): AnxToast | null {
    const componentClass = Vue.extend(AnxToast);
    const instance = new componentClass({ propsData }) as AnxToast;
    if (this.$refs.anxToaster) {
      // Mount the toast in the toaster
      const toaster = this.$refs.anxToaster as HTMLElement;
      instance.$mount();

      // Check if the toast has to be inserted on the begin or the end
      if (this.verticalAlign === "top") {
        toaster.insertBefore(instance.$el, toaster.firstChild);
      } else {
        toaster.appendChild(instance.$el);
      }

      // When the toast is closed, it should be hidden
      instance.$on("input", (value: boolean) => {
        if (!value) {
          instance.hideAction();
        }
      });

      // After the toast has been hidden, it should be destroyed
      instance.$on("destroy", () => {
        toaster.removeChild(instance.$el);

        // If the toaster does not have any child nodes, it can be destroyed
        if (!toaster.hasChildNodes()) {
          this.destroy();
        }
      });

      return instance;
    }

    return null;
  }

  /** Getter for validated vertical align */
  private get _verticalAlign(): string {
    return this.validateVerticalAlign(this.verticalAlign.toLowerCase());
  }

  /** Validates the vertical align property */
  public validateVerticalAlign(align: string): string {
    if (this.VERTICAL_POSITIONS.includes(align)) {
      return align;
    }

    // Default value
    return this.VERTICAL_POSITIONS[0];
  }

  /** Getter for validated horizontal align */
  private get _horizontalAlign(): string {
    return this.validateHorizontalAlign(this.horizontalAlign.toLowerCase());
  }

  /** Validates the horizontal align property */
  public validateHorizontalAlign(align: string): string {
    if (this.HORIZONTAL_POSITIONS.includes(align)) {
      return align;
    }

    // Default value
    return this.HORIZONTAL_POSITIONS[2];
  }
}
</script>

<style lang="scss" scoped>
.anx-toaster {
  position: fixed;
  z-index: 1100;
  padding: 20px;

  &.anx-toaster-top {
    top: 0;
  }

  &.anx-toaster-bottom {
    bottom: 0;
  }

  &.anx-toaster-left {
    left: 0;
    justify-content: flex-start;
    align-items: flex-start;
  }

  &.anx-toaster-center {
    left: 50%;
    transform: translateX(-50%);
    justify-content: center;
    align-items: center;
  }

  &.anx-toaster-right {
    justify-content: flex-end;
    align-items: flex-end;
    right: 0;
  }
}
</style>
