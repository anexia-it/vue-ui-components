import Vue from "vue";
import App from "./App.vue";

import VueI18n from "vue-i18n";
import i18n from "./i18n";

import VeeValidate from "vee-validate";


Vue.config.productionTip = false;
Vue.config.productionTip = false;

Vue.use(VueI18n);
Vue.use(VeeValidate);


new Vue({
  i18n,
  render: h => h(App)
}).$mount("#app");
