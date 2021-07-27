import Vue from "vue";
import { AnxIconsPlugin, AnxIconsNames, AnxToastPlugin } from "../src/plugins";
import VueI18n from "vue-i18n";
import Router from "./router.js";
import VeeValidate from "vee-validate";

/** Register the AnxIconsPlugin (this registers all icons as components) */
Vue.use(AnxIconsPlugin);
Vue.use(AnxToastPlugin);
Vue.use(Router);
Vue.use(VueI18n);
Vue.use(VeeValidate);

export { AnxIconsNames };
