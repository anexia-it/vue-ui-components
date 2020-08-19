<template>
  <div id="modal" class="modal anx-modal">
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
        <div v-if="confirm" class="modal-footer  anx-modal-footer">
          <anx-button
            :text="this.$i18n.t('uiplugin.modal.confirmButton')"
            @submit="$emit('confirm')"
          />
          <div class="space"></div>
          <anx-button
            :text="this.$i18n.t('uiplugin.modal.cancelButton')"
            @submit="$emit('close')"
          />
        </div>
        <div v-else class="modal-footer  anx-modal-footer">
          <anx-button
            :text="closeButtonText"
            v-if="hasCloseButton"
            @submit="$emit('close')"
          />
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
  @Prop({ default: "TITLE" }) title!: string;

  @Prop({ default: true }) hasCloseButton!: boolean;

  @Prop({ default: "Close" }) closeButtonText!: string;

  @Prop({ default: false }) confirm!: boolean;
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
    background-color: $anx-primary-white;
    width: 500px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 178px;
  }
  .anx-modal-content {
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
    justify-content: center;
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
  }
}
.space {
  width: 30px;
}
</style>
