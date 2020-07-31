import _Vue from 'vue';
import Components from './components';

const UIPlugin = {
    install(vue: typeof _Vue): void {
        // Register all components, that have been loaded
        for (const name in Components) {
          vue.component(name, (Components as any)[name])
        }
    },
};

export { Components };
export default UIPlugin;
