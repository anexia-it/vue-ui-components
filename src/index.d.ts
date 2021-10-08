import Vue from "vue";
import Components from "./components";
import { AbstractModel } from "./lib";
import {
  AnxIconsPlugin,
  AnxIconsNames,
  AnxToastPlugin,
  AnxVariablesPlugin,
  AnxModalPlugin
} from "./plugins";

declare module "@anexia/vue-ui-components";

declare const UIPlugin: {
  install(_Vue: typeof Vue, options?: {}): void;
};

// Exporting all the components
export * from "./components";

// Exporting plugins separately
export {
  AbstractModel,
  AnxIconsNames,
  AnxIconsPlugin,
  AnxToastPlugin,
  AnxVariablesPlugin,
  AnxModalPlugin,
  Components
};

// Default export is the UIPlugin shipping with all plugins
export default UIPlugin;
