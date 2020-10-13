<template>
  <div id="app">
    <anx-global>
      <anx-header id="nav" :menus="menus">
        <template v-slot:menu>
          <router-link to="/" class="anx-link anx-link-header"
            >Home</router-link
          >
          <router-link to="/about">About</router-link>
          <!-- //TODO: design passt net -->
        </template>
      </anx-header>
      <anx-container>
        <router-view />
      </anx-container>
    </anx-global>

    <test> </test>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  private menus: Array<object> = [
    { menu: "Home", link: "/" },
    { menu: "About", link: "/about" }
  ];
}
</script>

<style src="ui/lib/ui.css"></style>
<style>
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
