import _Vue from "vue";
import Components from "./components";
import { AnxIconsPlugin, AnxIconsNames } from "./icons";

const UIPlugin = {
  install(Vue: typeof _Vue): void {
    /** Register all components, that have been loaded*/
    for (const name in Components) {
      Vue.component(name, (Components as any)[name]);
    }
  }
};

export { Components, AnxIconsNames, AnxIconsPlugin };
export default UIPlugin;
