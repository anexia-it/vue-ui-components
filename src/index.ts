import _Vue from "vue";
import AnxHeader from "./components/AnxHeader.vue";

export function UIPlugin(Vue: typeof _Vue) {
  Vue.component("AnxHeader", AnxHeader);
}
