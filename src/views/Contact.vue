<template>
  <anx-global id="app">
    <anx-header
      :menus="items"
      :i18n="$i18n"
      :icon-url="null"
      @localeChange="localeChange($event)"
    >
      <template v-slot:icon>
        <img
          alt="anx-header-logo"
          v-bind:src="require('../assets/img/anexia-logo.svg')"
        />
      </template>
    </anx-header>
    <div class="space"></div>

    <anx-container>
      <anx-content title="Settings">
        <anx-paragraph>
          <anx-checkbox
            name="Invisible captcha"
            v-model="invisibleCaptcha"
            @input="setItem('invisibleCapctha', $event ? '1' : '0', true)"
          />
        </anx-paragraph>

        <anx-paragraph title="Usage information">
          The contact form does not automatically send the request to the LLS.
          This is not possible, because if we are sending the request from the
          frontend, the google recaptcha will not be validated and could easily
          be <strong>bypassed</strong>. So if the form has been filled and is
          valid, the <i>anx-contact</i> component will emit the
          <strong>@submit</strong> event. The request is passed as property and
          should be handled by you.<br /><br />
          The request already includes the recaptcha. The whole request should
          be sent to your backend. In your backend, the recaptcha should be
          verified. Then the request to the LLS should be sent in your backend.
          <br /><br />
          Don't forget to add the tracking script to your vue project. This is
          needed in order to receive a WTS session id. The contact form
          component
          <strong>does not include the tracking script</strong>!
        </anx-paragraph>
      </anx-content>

      <!-- See here for example on how to use anx-contact. Don't set demo mode in production! -->
      <anx-contact
        :recaptcha-sitekey="recaptchaSitekey"
        :invisible-captcha="invisibleCaptcha"
        :error="error"
        :success="success"
        :enabled="contactEnabled"
        :show-email="true"
        :show-phone="true"
        @submit="submitted"
      >
        This is an example for the <strong>anx-contact</strong> component. You
        can modify several properties of this component. See
        <i>components/AnxContact.vue</i> for more information on the different
        properties. VueRecaptcha is also supported and will only be initialised
        if a site key is provided.
      </anx-contact>
    </anx-container>

    <anx-footer
      :links="[
        { text: 'Impressum', link: '#' },
        { text: 'AGB', link: '#' }
      ]"
    >
      <template v-slot:icon>
        <img
          class="anx-logo-footer"
          alt="anx-logo-footer"
          v-bind:src="require('../assets/img/anexia-logo.svg')"
          width="56px"
          height="23px"
        />
      </template>
    </anx-footer>
  </anx-global>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  AnxContact,
  AnxContent,
  AnxCheckbox,
  AnxContainer,
  AnxFooter,
  AnxGlobal,
  AnxParagraph,
  AnxHeader
} from "@/components";

@Component({
  components: {
    AnxContact,
    AnxContent,
    AnxCheckbox,
    AnxContainer,
    AnxFooter,
    AnxGlobal,
    AnxParagraph,
    AnxHeader
  }
})
export default class Contact extends Vue {
  recaptchaSitekey = "6Ld9pr4aAAAAAMenlr2xionxPM1sHQ-OgFaa2n2V";
  invisibleCaptcha = true;
  error = "";
  success = "";
  contactEnabled = true;

  public items: Array<object> = [
    { menu: "Kitchensink", link: "/kitchensink" },
    { menu: "Login", link: "/login" },
    { menu: "Crud", link: "/crud" },
    { menu: "Contact", link: "/contact" }
  ];

  private beforeMount() {
    this.initLocalStorage();
  }

  private reloadPage() {
    location.reload();
  }

  private initLocalStorage() {
    this.invisibleCaptcha =
      window.localStorage.getItem("invisibleCapctha") === "1" ? true : false;
  }

  private setItem(name: string, value: string, reload = false) {
    window.localStorage.setItem(name, value);

    if (reload) {
      this.reloadPage();
    }
  }

  /** Contact form has been submitted */
  private submitted(request: {}) {
    console.log(request); // This is the request from the anx-contact component

    // You should now send this to your backend and validate the recaptcha token

    // We assume that there is an error and show an alert
    const serverResponse = { success: true };
    if (serverResponse.success === false) {
      this.error = "Something went wrong!";
    } else {
      this.success =
        "We have received your request and will conact you as soon as possible";
      this.contactEnabled = false;
    }
  }
}
</script>
