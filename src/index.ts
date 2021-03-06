import _Vue from "vue";
import Components from "./components";
import { AbstractModel } from "./lib/models/AbstractModel";
import {
  AnxIconsPlugin,
  AnxIconsNames,
  AnxToastPlugin,
  AnxVariablesPlugin
} from "./plugins";

// Default export is the UI Plugin
const UIPlugin = {
  install(Vue: typeof _Vue, options = {}): void {
    /** Register all components, that have been loaded*/
    for (const name in Components) {
      Vue.component(name, (Components as any)[name]);
    }

    /** Register the AnxIconsPlugin (this registers all icons as components) */
    Vue.use(AnxIconsPlugin, options);

    /** Register the AnxToastPlugin */
    Vue.use(AnxToastPlugin, options);

    /** Register the AnxVariablesPlugin */
    Vue.use(AnxVariablesPlugin, options);
  }
};
export default UIPlugin;

// Export all components as named exports
export * from "./components";

// Export plugins and ohter helpful tools
export {
  Components,
  AbstractModel,
  AnxIconsNames,
  AnxIconsPlugin,
  AnxToastPlugin,
  AnxVariablesPlugin
};
