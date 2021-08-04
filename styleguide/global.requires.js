import Vue from "vue";
import {
  AnxIconsPlugin,
  AnxIconsNames,
  AnxToastPlugin,
  AnxVariablesPlugin
} from "../src/plugins";
import VueI18n from "vue-i18n";
import Router from "./router.js";

/** Register the AnxIconsPlugin (this registers all icons as components) */
Vue.use(AnxIconsPlugin);
Vue.use(AnxToastPlugin);
Vue.use(AnxVariablesPlugin);
Vue.use(Router);
Vue.use(VueI18n);

export { AnxIconsNames };
