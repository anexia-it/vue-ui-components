import Vue from 'vue'
import Components from './components'
import { AnxIconsPlugin, AnxIconsNames, AnxToastPlugin, AnxVariablesPlugin } from './plugins'

declare module '@anexia/vue-ui-components';

declare const UIPlugin: {
    install(_Vue: typeof Vue, options?: {}): void;
}

// Exporting all the components
export * from './components'

// Exporting plugins separately
export { AnxIconsNames, AnxIconsPlugin, AnxToastPlugin, AnxVariablesPlugin, Components }

// Default export is the UIPlugin shipping with all plugins
export default UIPlugin
