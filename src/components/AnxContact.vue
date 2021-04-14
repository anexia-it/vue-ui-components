<template>
  <div class="anx-contact">
    <anx-content title="Contact">
      <anx-paragraph v-if="this.$slots.default">
        <slot />
      </anx-paragraph>
      <anx-form>
        <div class="input-inline">
          <anx-input
            name="first name"
            rules="required"
            label="First Name"
            width="45%"
          />
          <anx-input
            name="last name"
            rules="required"
            label="Last Name"
            width="45%"
            class="right"
          />
        </div>
        <anx-input name="email" rules="required|email" label="Email" />
        <anx-textarea />

        <!-- invisible google recaptcha -->
        <vue-recaptcha
          v-if="useRecaptcha && invisibleCaptcha"
          :sitekey="recaptchaSitekey"
          :loadRecaptchaScript="true"
          @verify="verifyCaptcha"
          @error="errorCaptcha"
        >
          <anx-button width="100%">
            Send
          </anx-button>
        </vue-recaptcha>

        <!-- google recaptcha component -->
        <vue-recaptcha
          v-else-if="useRecaptcha"
          :sitekey="recaptchaSitekey"
          :loadRecaptchaScript="true"
          @verify="verifyCaptcha"
          @error="errorCaptcha"
        /><!-- TODO: add margin bottom to button -->

        <!-- submit button -->
        <anx-button
          v-if="!useRecaptcha || !invisibleCaptcha"
          width="100%"
          :disabled="!isButtonEnabled"
        >
          Send
        </anx-button>
      </anx-form>
    </anx-content>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AnxButton from "./AnxButton.vue";
import AnxContent from "./AnxContent.vue";
import AnxForm from "./AnxForm.vue";
import AnxInput from "./AnxInput.vue";
import AnxParagraph from "./AnxParagraph.vue";
import AnxTextarea from "./AnxTextarea.vue";
import VueRecaptcha from "vue-recaptcha";

@Component({
  components: {
    AnxButton,
    AnxContent,
    AnxForm,
    AnxInput,
    AnxParagraph,
    AnxTextarea,
    VueRecaptcha
  }
})
export default class AnxContact extends Vue {
  /** The key for the google recaptcha V2. Will only be rendered, if porvided */
  @Prop({ default: null }) recaptchaSitekey!: string | null;

  /** implement an invisible captcha */
  @Prop({ default: true }) invisibleCaptcha!: boolean;

  /** Anx-Contact in demo-mode. Shows information on how to use and does not send an actual request */
  @Prop({ default: false }) demoMode!: boolean; // TODO: implement demo mode: don't send api request when demo mode acitvated

  private mounted() {
    if (this.demoMode) {
      console.error(
        "You have activated the demo-mode for anx-contact. Disable it in production!"
      );
    }
  }

  /** Checks if the recaptcha should be used */
  private useRecaptcha() {
    return this.recaptchaSitekey === null ? false : true;
  }

  /** Returns if the button should be enabled or not */
  private get isButtonEnabled() {
    // TODO: check for errors in google recaptcha and check if the button should be enabled
    return false;
  }

  private verifyCaptcha(res: any) {
    // TODO: implement logic
    console.log("verify captcha", res);
  }

  private errorCaptcha() {
    // TODO: implement logic
    console.error("captcha error");
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.anx-contact {
  .input-inline {
    .anx-input {
      display: inline-grid;

      &.right {
        float: right;
      }
    }
  }
}
</style>
