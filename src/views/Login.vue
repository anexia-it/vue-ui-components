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
    />
  </anx-global>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AnxLogin from "@/components/AnxLogin.vue";
import AnxGlobal from "@/components/AnxGlobal.vue";

@Component({
  components: {
    AnxGlobal,
    AnxLogin
  }
})
export default class Login extends Vue {}
</script>
