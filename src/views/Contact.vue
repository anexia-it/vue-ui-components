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
      </anx-content>

      <!-- See here for example on how to use anx-contact. Don't set demo mode in production! -->
      <anx-contact
        :recaptcha-sitekey="recaptchaSitekey"
        :demo-mode="true"
        :invisible-captcha="invisibleCaptcha"
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
import AnxContact from "@/components/AnxContact.vue";
import AnxContent from "@/components/AnxContent.vue";
import AnxCheckbox from "@/components/AnxCheckbox.vue";
import AnxContainer from "@/components/AnxContainer.vue";
import AnxFooter from "@/components/AnxFooter.vue";
import AnxGlobal from "@/components/AnxGlobal.vue";
import AnxParagraph from "@/components/AnxParagraph.vue";
import AnxHeader from "@/components/AnxHeader.vue";

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
  recaptchaSitekey = "6LeOdakaAAAAAJfWBk1IqPphdzCJ8kqm_j97tD79"; // TODO: remove this private token and create one for anexia
  invisibleCaptcha = true;

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
}
</script>
