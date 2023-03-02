import _Vue from "vue";
import Components from "./components";
import { AbstractModel } from "./lib/models/AbstractModel";
import {
  AnxAlertPlugin,
  AnxIconsPlugin,
  AnxIconsNames,
  AnxToastPlugin,
  AnxModalPlugin,
  AnxVariablesPlugin
} from "./plugins";

// Default export is the UI Plugin
const UIPlugin = {
  install(Vue: typeof _Vue, options = {}): void {
    /** Register all components, that have been loaded*/
    for (const name in Components) {
      Vue.component(name, (Components as any)[name]);
    }
    /** Register AnxAlertPlugin */
    Vue.use(AnxAlertPlugin, options);

    /** Register the AnxIconsPlugin (this registers all icons as components) */
    Vue.use(AnxIconsPlugin, options);

    /** Register the AnxToastPlugin */
    Vue.use(AnxToastPlugin, options);

    /** Register the AnxModalPlugin */
    Vue.use(AnxModalPlugin, options);

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
  AnxAlertPlugin,
  AbstractModel,
  AnxIconsNames,
  AnxIconsPlugin,
  AnxToastPlugin,
  AnxModalPlugin,
  AnxVariablesPlugin
};
