<template>
  <anx-global id="app">
    <anx-login
      :logo="require('../assets/img/anexia-logo.svg')"
      customer-logo="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.jpg"
      :submit-button="{ width: '150px' }"
      :footer-text="[
        'Log-in to your ANX application',
        'Lorem Ipsum Platzhalter Text',
        'Text lorem ipsum.'
      ]"
      @login="login"
    />

    <anx-modal v-if="modal" title="Login attempt" @close="modal = false">
      <anx-paragraph>
        <strong>Username: </strong> {{ username }}<br />
        <strong>Password: </strong> {{ password }}
      </anx-paragraph>
    </anx-modal>
  </anx-global>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AnxLogin from "@/components/AnxLogin.vue";
import AnxGlobal from "@/components/AnxGlobal.vue";
import AnxModal from "@/components/AnxModal.vue";

@Component({
  components: {
    AnxGlobal,
    AnxLogin,
    AnxModal
  }
})
export default class Login extends Vue {
  /** The modal to show after login */
  private modal = false;

  /** The user credentials */
  private username!: string;
  private password!: string;

  /** This function will be called when the login event is emitted */
  private login(data: { username: string; password: string }) {
    console.log(data);
    this.username = data.username;
    this.password = data.password;
    this.modal = true;
  }
}
</script>
