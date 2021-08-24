<template>
  <div
    :id="_id"
    :class="`modal anx-modal anx-modal-size-${size}`"
    @click="checkForClosing"
    ref="anxModalOutsideContainer"
  >
    <div :id="`${_id}-dialog`" :class="'modal-dialog modal-dialog-scrollable'">
      <div class="modal-content anx-modal-content">
        <div class="modal-header  anx-modal-header">
          <button
            id="close-button-x"
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="$emit('close')"
          >
            <div class="close-symbol"></div>
          </button>
          <div class="h2 modal-title heading" v-text="title" />
          <div class="small-line h2">
            &mdash;
          </div>
        </div>
        <div class="modal-body  anx-modal-body">
          <!-- @slot Use this slot for your content -->
          <slot />
        </div>
        <div
          v-if="confirm !== null"
          :class="
            `modal-footer anx-modal-footer footer-content-${closeButtonAlign}`
          "
        >
          <!--
            This event will be emitted when the users closes the modal

            @event close
          -->
          <anx-button
            id="close-button"
            :text="closeButtonText"
            @click="$emit('close')"
            outline
          />
          <div class="space"></div>
          <!--
            This event will be emitted when the confirms the modal
            Note: This event will only be emitted in combination with the **confirm** property

            @event confirm
          -->
          <anx-button
            id="confirm-button"
            :text="confirmButtonText"
            @click="$emit('confirm')"
          />
          <!-- @slot Use this slot to add something to the footer -->
          <slot name="modal-footer" />
        </div>
        <div
          v-else
          :class="
            `modal-footer anx-modal-footer footer-content-${closeButtonAlign}`
          "
        >
          <anx-button
            id="close-button"
            :text="closeButtonText"
            v-if="hasCloseButton !== null"
            @click="$emit('close')"
          />
          <slot name="modal-footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxButton from "../AnxButton/AnxButton.vue";

/**
 * This component is used for generating dynamic modals.
 * Modals are dialogs that can be used to display information for users.
 */
@Component({
  components: {
    AnxButton
  }
})
export default class AnxModal extends Vue {
  /** This is the title of the modal */
  @Prop({ default: "Enter a title for the modal" }) title!: string;

  /** Defines whether the modal has a close button or not */
  @Prop({ default: null }) hasCloseButton!: boolean | null;

  /** This is the text for the close button */
  @Prop({ default: "Close" }) closeButtonText!: string;

  /**
   * This is the align for the close button. Note: This will only work, if the modal is not confirmable
   *
   * @values left, center, right
   */
  @Prop({ default: "center" }) closeButtonAlign!: string;

  /** Show confirmation modal. A 'close' or a 'confirm' event will be emited, depending on the user input */
  @Prop({ default: null }) confirm!: boolean | null;

  /** If the confirm option is true, this is the text for the confirm button */
  @Prop({ default: "Confirm" }) confirmButtonText!: string;

  /** The id for the modal, will be set to a unique value when null */
  @Prop({ default: null }) id!: string | null;

  /**
   * The size of the model
   *
   * @values s, m, l, xl, xxl
   */
  @Prop({ default: "m" }) size!: string;

  /** This is the number of currently opened modals */
  private static numberModalsOpened = 0;

  /** This is the layer of our modal (neccessary for displaying modals inside of modals) */
  private modalLayer = 0;

  /** Add event listeners for click event on mount */
  private mounted() {
    /** Increase the number of opened modals and store the current layer of our modal*/
    this.modalLayer = ++AnxModal.numberModalsOpened;

    this.updateStyles();
  }

  /** Check if the id is set otherwise create a unique id */
  private get _id() {
    if (this.id !== null) {
      return this.id;
    }

    return "anx-modal-" + AnxModal.numberModalsOpened;
  }

  /** Decrease the number of opened modals */
  private beforeDestroy() {
    if (AnxModal.numberModalsOpened > 0) AnxModal.numberModalsOpened--;

    this.updateStyles();
  }

  /** Check if the modal should be closed by the click */
  private checkForClosing(e: MouseEvent) {
    /** Check if the click was outside the modal */
    if (e.target == this.$refs["anxModalOutsideContainer"]) {
      /** Only close the modal if the current modal is in front */
      if (this.modalLayer == AnxModal.numberModalsOpened) {
        this.$emit("close");
      }
    }
  }

  /**
   * If a modal is opened, the styles of the body have to be updated
   * so that the background does not scroll
   */
  private updateStyles() {
    const body = document.body;

    // Check if there are any modals opened and add or remove the class for scrolling to the body
    if (AnxModal.numberModalsOpened > 0) {
      body.classList.add("anx-modal-is-open");
    } else {
      body.classList.remove("anx-modal-is-open");
    }
    return;
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.anx-button {
  position: relative !important;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
}
.anx-modal {
  .modal-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media screen and (max-width: 500px) {
      padding: 0 15px;
      width: 100% !important;
    }
  }

  &.anx-modal-size-s {
    .modal-dialog {
      width: 400px;
    }
  }

  &.anx-modal-size-m {
    .modal-dialog {
      width: 500px;
    }
  }

  &.anx-modal-size-l {
    .modal-dialog {
      width: 600px;
    }
  }

  &.anx-modal-size-xl {
    .modal-dialog {
      width: 800px;
    }
  }

  &.anx-modal-size-xxl {
    .modal-dialog {
      width: 1000px;
    }
  }

  .anx-modal-content {
    background-color: $anx-primary-white;
    position: relative;
    border-radius: 0px;
    border: none !important;
    .anx-modal-header {
      border-radius: 0px;
      color: $anx-primary-white;
    }
    .anx-modal-body {
      border-radius: 0px;
    }
    .anx-modal-footer {
      border-radius: 0px;

      /**
       * Show buttons below each other on mobile
       */
      @media (max-width: $screen-xs) {
        display: block;

        .space {
          display: none !important;
        }

        .anx-button {
          width: 100%;
          display: block;
          margin: 0 0 20px 0 !important;

          &:last-child {
            margin-bottom: 0px !important;
          }
        }
      }

      .button {
        margin-right: 0px !important;

        &.center {
          margin: auto !important;
        }
      }
    }
  }
}

.modal {
  display: inline;
  background: $anx-black-transparet;

  .modal-header {
    background-color: $anx-primary-color;
    padding: 25px 40px 15px 40px;
    height: 94px;
    border-bottom: 0px;
    display: block;
    text-align: left;

    @media screen and (max-width: 500px) {
      padding: 30px 33px 10px 20px;
    }

    .modal-title {
      text-transform: uppercase;
      font-size: 20px;
    }

    button {
      background-color: transparent;
      border: none;
      position: absolute;
      color: #fff;
      text-shadow: none;
      opacity: 1;
      font-weight: ligther;
      max-width: 1px;
      font-size: medium;
      right: 0;
      top: 0;
    }

    .close {
      cursor: pointer;
      margin: 15px 15px 0 0;
      font-size: 12px;
      line-height: 12px;
      font-weight: 200;
      outline: 0 !important;
    }

    .small-line {
      font-size: 20px;
    }

    .close-symbol {
      width: 12px;
      height: 12px;

      &:before,
      &:after {
        content: "";
        position: absolute;
        width: 16.97px;
        height: 1px;
        background-color: white;
        left: -2.5px;
        top: 6px;
      }

      &:before {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        transform: rotate(45deg);
      }

      &:after {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
    }
  }

  .modal-body {
    margin: 40px;
    padding: 0 !important;
    text-align: center;

    @media screen and (max-width: 500px) {
      margin: 2.5rem 1.25rem 2.5rem 1.25rem; // 40px 20px 40px 20px
    }
  }

  .modal-footer {
    border: none;
    padding: 0 2.5rem 2.5rem 2.5rem;
    display: flex;

    &.footer-content-left {
      justify-content: flex-start;
    }

    &.footer-content-center {
      justify-content: center;
    }

    &.footer-content-right {
      justify-content: flex-end;
    }

    @media screen and (max-width: 500px) {
      padding: 0 1.25rem 2.5rem 1.25rem; // 0px 20px 40px 20px

      button {
        margin: auto;
      }

      div {
        width: 100%;
        padding-bottom: 2.2rem; //35.2px + Überstand beim Div
      }
    }

    button {
      position: inherit;
    }

    &.close-button-left {
      color: red;
    }
  }
}
.space {
  width: 30px;
}
</style>

<!-- This style has to be non-scoped, because it will be applied to the body -->
<style lang="scss">
.anx-modal-is-open {
  overflow: hidden;
}
</style>
