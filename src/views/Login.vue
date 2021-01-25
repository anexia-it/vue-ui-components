<template>
  <anx-global id="app">
    <anx-login
      :logo="require('../assets/img/anexia-logo.svg')"
      customer-logo="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.jpg"
      :footer-text="[
        'Log-in to your ANX application',
        'Lorem Ipsum Platzhalter Text',
        'Text lorem ipsum.'
      ]"
      :login-error="loginError"
      @login="login"
    />

    <anx-modal
      v-if="modal"
      title="Login attempt"
      @close="modal = false"
      :has-close-button="false"
    >
      <anx-paragraph>
        <strong>Username: </strong> {{ username }}<br />
        <strong>Password: </strong> {{ password }}<br />

        <br /><span>Is the data correct?</span><br />

        <anx-button @click="dataCorrect">Correct</anx-button><br /><br />
        <anx-button @click="dataIncorrect">Incorrect</anx-button>
      </anx-paragraph>
    </anx-modal>
  </anx-global>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AnxButton from "@/components/AnxButton.vue";
import AnxLogin from "@/components/AnxLogin.vue";
import AnxGlobal from "@/components/AnxGlobal.vue";
import AnxModal from "@/components/AnxModal.vue";
import AnxParagraph from "@/components/AnxParagraph.vue";

@Component({
  components: {
    AnxButton,
    AnxGlobal,
    AnxLogin,
    AnxModal,
    AnxParagraph
  }
})
export default class Login extends Vue {
  /** The modal to show after login */
  private modal = false;

  /** The user credentials */
  private username!: string;
  private password!: string;

  /** This is the error that will be displayed when login fails */
  private loginError = "";

  /** This function will be called when the login event is emitted */
  private login(data: { username: string; password: string }) {
    this.username = data.username;
    this.password = data.password;
    this.modal = true;
  }

  /** This function simulates a positive response from the api regarding the credentials */
  private dataCorrect() {
    alert("Now you would be redirected to your users page");
    location.reload();
  }

  /** This function simulates a negative response from the api regarding the credentials */
  private dataIncorrect() {
    this.modal = false;
    this.loginError = "Wrong user credentials";
  }
}
</script>
