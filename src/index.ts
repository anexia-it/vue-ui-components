import _Vue from "vue";
import Components from "./components";
import { AnxIconsPlugin, AnxIconsNames, AnxToastPlugin } from "./plugins";
import { AbstractModel } from "./lib/models/AbstractModel";

// Default export is the UI Plugin
const UIPlugin = {
  install(Vue: typeof _Vue): void {
    /** Register all components, that have been loaded*/
    for (const name in Components) {
      Vue.component(name, (Components as any)[name]);
    }

    /** Register the AnxIconsPlugin (this registers all icons as components) */
    Vue.use(AnxIconsPlugin);

    /** Register the AnxToastPlugin */
    Vue.use(AnxToastPlugin);
  }
};
export default UIPlugin;

// Export all components as named exports
export * from "./components";

// Export plugins and ohter helpful tools
export {
  Components,
  AnxIconsNames,
  AnxIconsPlugin,
  AnxToastPlugin,
  AbstractModel
};
