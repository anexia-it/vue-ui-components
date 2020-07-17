import Vue from "vue";
import App from "./App.vue";
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false;
Vue.use(VueI18n)

import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VeeValidate from "vee-validate";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.use(VeeValidate);

new Vue({
  render: h => h(App)
}).$mount("#app");
