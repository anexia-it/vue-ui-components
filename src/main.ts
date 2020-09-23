import { AnxIconsPlugin } from "./icons";
import Vue from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import VeeValidate from "vee-validate";
import router from "./router";

Vue.config.productionTip = false;
Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(AnxIconsPlugin);

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount("#app");
