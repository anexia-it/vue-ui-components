import Vue from "vue";
import { AnxIconsPlugin, AnxIconsNames } from "../src/icons";
import VueI18n from "vue-i18n";

/** Register the AnxIconsPlugin (this registers all icons as components) */
Vue.use(AnxIconsPlugin);

Vue.use(VueI18n);

export { AnxIconsNames };
