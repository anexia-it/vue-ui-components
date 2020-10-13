import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import UIPlugin from "ui/src";

Vue.config.productionTip = false;

Vue.use(UIPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
