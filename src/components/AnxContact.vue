<template>
  <div class="anx-contact">
    <anx-content :title="title">
      <anx-paragraph v-if="this.$slots.default">
        <slot />
      </anx-paragraph>
      <anx-form @submit="submit">
        <div class="input-inline">
          <anx-input
            v-model="request.firstName"
            name="first name"
            rules="required"
            label="First Name"
            width="45%"
          />
          <anx-input
            v-model="request.lastName"
            name="last name"
            rules="required"
            label="Last Name"
            width="45%"
            class="right"
          />
        </div>
        <anx-input
          v-if="showEmail"
          v-model="request.email"
          name="email"
          rules="required|email"
          label="Email"
        />
        <anx-input
          v-if="showPhone"
          v-model="request.phone"
          name="phone"
          rules="required"
          label="Phone"
        />

        <anx-textarea
          v-model="request.message"
          name="message"
          label="Message"
        />

        <!-- google recaptcha component -->
        <div class="recaptcha-wrapper">
          <vue-recaptcha
            v-if="useRecaptcha && !invisibleCaptcha"
            :sitekey="recaptchaSitekey"
            :loadRecaptchaScript="true"
            size="100%"
            @verify="verifyCaptcha"
            @error="errorCaptcha"
            @expired="expiredCaptcha"
          />
        </div>

        <!-- Alert for error messages -->
        <anx-alert v-model="showError_">{{ error }}</anx-alert>

        <!-- Internal recaptcha error -->
        <anx-alert v-model="internalRecaptchaError">Recaptcha error</anx-alert>

        <!-- invisible google recaptcha -->
        <vue-recaptcha
          v-if="useRecaptcha && invisibleCaptcha"
          :sitekey="recaptchaSitekey"
          :loadRecaptchaScript="true"
          @verify="verifyCaptcha"
          @error="errorCaptcha"
          @expired="expiredCaptcha"
        >
          <anx-button width="100%">
            Send
          </anx-button>
        </vue-recaptcha>

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
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import AnxAlert from "./AnxAlert.vue";
import AnxButton from "./AnxButton.vue";
import AnxContent from "./AnxContent.vue";
import AnxForm from "./AnxForm.vue";
import AnxInput from "./AnxInput.vue";
import AnxParagraph from "./AnxParagraph.vue";
import AnxTextarea from "./AnxTextarea.vue";
import VueRecaptcha from "vue-recaptcha";

@Component({
  components: {
    AnxAlert,
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

  /** The title to be displayed on top */
  @Prop({ default: "Contact" }) title!: string;

  /** Display a field to enter the phone */
  @Prop({ default: false }) showPhone!: boolean;

  /** Display a field to enter the email */
  @Prop({ default: true }) showEmail!: boolean;

  /** The error to display. Will automatically be displayed if it changes or the showError() method is called */
  @Prop({ default: null }) error!: string;

  /** Display the alert if the error message has changed */
  @Watch("error")
  onErrorChanged() {
    this.showError();
  }

  /** This is returned on submit via @sumbit event */
  private request: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    message: string | null;
    captchaToken: string | null;
  } = {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    message: null,
    captchaToken: null
  };

  /** Show the error alert */
  private showError_ = false;

  /** Is true if the recaptcha has an error (alert will be shown) */
  private internalRecaptchaError = false;

  /** Show the error */
  public showError() {
    this.showError_ = true;
  }

  /** Checks if the recaptcha should be used */
  private useRecaptcha() {
    return this.recaptchaSitekey === null ? false : true;
  }

  /** Returns if the button should be enabled or not */
  private get isButtonEnabled(): boolean {
    return this.request.captchaToken ? true : false;
  }

  /** Is called if the captcha has been verified. The captcha token is passed */
  private verifyCaptcha(res: string) {
    if (res) {
      this.request.captchaToken = res;
    }
  }

  /** Is called if the captcha has an error */
  private errorCaptcha() {
    this.request.captchaToken = null;
    this.internalRecaptchaError = true;
  }

  /** Is called if the token has expired */
  private expiredCaptcha() {
    this.request.captchaToken = null;
  }

  /** Emit the submit event and add the request data */
  private submit() {
    this.$emit("submit", this.request);
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

  .recaptcha-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: $form-components-spacing;
  }
}
</style>
