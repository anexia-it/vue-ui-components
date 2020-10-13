<template>
  <anx-content class="about">
    <anx-paragraph title="About"
      >This is an about page<br /><br />
      <anx-alert v-model="alert" type="success">It works!</anx-alert>
      <anx-button @click="routerPush" width="100%"
        >$this.router push("/")</anx-button
      >
    </anx-paragraph>
    <anx-paragraph title="Vuex" size="h2">
      <anx-readonly>f</anx-readonly>
      <anx-button inline width="200px" style="margin-right: 0px" @click="plus"
        >+</anx-button
      >
      <anx-button
        inline
        width="200px"
        style="margin-right: 0px; margin-left: 20px"
        @click="minus"
        >-</anx-button
      >

      <button @click="routerPush">push</button>
    </anx-paragraph>
  </anx-content>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class About extends Vue {
  private alert = true;

  private routerPush() {
    console.log("push home");
    this.$router.push("/");
  }

  private plus() {
    console.log("plus");
  }

  private minus() {
    console.log("minus");
  }
}
</script>
