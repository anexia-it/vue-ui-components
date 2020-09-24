<template>
  <div id="modal" :class="`modal anx-modal anx-modal-size-${size}`">
    <div :class="'modal-dialog modal-dialog-scrollable'">
      <div class="modal-content anx-modal-content">
        <div class="modal-header  anx-modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="$emit('close')"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="h2 modal-title heading">
            {{ title }}
          </div>
          <div class="small-line h2">
            &mdash;
          </div>
        </div>
        <div class="modal-body  anx-modal-body">
          <slot />
        </div>
        <div v-if="confirm !== null" class="modal-footer anx-modal-footer">
          <slot name="modal-footer">
            <anx-button :text="closeButtonText" @click="$emit('close')" />
            <div class="space"></div>
            <anx-button :text="confirmButtonText" @click="$emit('confirm')" />
          </slot>
        </div>
        <div
          v-else
          :class="
            `modal-footer anx-modal-footer footer-content-${closeButtonAlign}`
          "
        >
          <slot name="modal-footer">
            <anx-button
              :text="closeButtonText"
<<<<<<< HEAD
              v-if="hasCloseButton !== null"
              @submit="$emit('close')"
=======
              v-if="hasCloseButton"
              @click="$emit('close')"
>>>>>>> a3e948f... fix: button click event
            />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxButton from "./AnxButton.vue";
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

  /** This is the align for the close button [left, center, right]. Note: This will only work, if the modal is not confirmable */
  @Prop({ default: "center" }) closeButtonAlign!: string;

  /** Show confirmation modal. A 'close' or a 'confirm' event will be emited, depending on the user input */
  @Prop({ default: null }) confirm!: boolean | null;

  /** If the confirm option is true, this is the text for the confirm button */
  @Prop({ default: "Confirm" }) confirmButtonText!: string;

  /** The size of the model [s, m, l, xl, xxl] */
  @Prop({ default: "m" }) size!: string;
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

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
    background-color: $anx-primary-blue;
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
      padding: 0 2rem;
      margin: 0;
      font-size: 34px;
      line-height: 42px;
      font-family: MetaWebPro-Thin;
    }

    .small-line {
      font-size: 20px;
    }

    span {
      color: white;
      font-size: 34px;
      line-height: 42px;
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
