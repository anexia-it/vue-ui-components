
import { AnxIconsPlugin } from "./icons";
import Vue from "vue";
import App from "./App.vue";
import VeeValidate from "vee-validate";

Vue.config.productionTip = false;
Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(AnxIconsPlugin);

new Vue({
  render: h => h(App)
}).$mount("#app");
