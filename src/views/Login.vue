<template>
  <anx-global id="app">
    <anx-login
      logo="https://anexia.com/fileadmin/anexia-www-3/images/anexia.svg"
      customer-logo="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.jpg"
      :footer-text="[
        'Log-in to your ANX application',
        'Lorem Ipsum Platzhalter Text',
        'Text lorem ipsum.'
      ]"
      :login-error="loginError"
      @login="login"
      remember-me="Remember me"
      :remember-me-default="true"
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
        <strong>Remember Me: </strong>
        {{ rememberMe ? "Checked" : "Not checked" }}<br />

        <br /><span>Is the data correct?</span><br />

        <anx-button @click="dataCorrect">Correct</anx-button><br /><br />
        <anx-button @click="dataIncorrect">Incorrect</anx-button>
      </anx-paragraph>
    </anx-modal>
  </anx-global>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  AnxButton,
  AnxLogin,
  AnxGlobal,
  AnxModal,
  AnxParagraph
} from "@/components";

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
  private rememberMe!: boolean;

  /** This is the error that will be displayed when login fails */
  private loginError = "";

  /** This function will be called when the login event is emitted */
  private login(data: {
    username: string;
    password: string;
    rememberMe: boolean;
  }) {
    this.username = data.username;
    this.password = data.password;
    this.rememberMe = data.rememberMe;
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
