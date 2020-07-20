import Vue from "vue";
import App from "./App.vue";
//import BootstrapVue from "bootstrap-vue";
import VueI18n from "vue-i18n";
import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap-vue/dist/bootstrap-vue.css";
import VeeValidate from "vee-validate";

Vue.use(VueI18n)
//Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.use(VeeValidate);

new Vue({
  render: h => h(App)
}).$mount("#app");
