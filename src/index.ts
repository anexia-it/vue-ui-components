import _Vue from 'vue';
import Components from './components';

const UIPlugin = {
    install(vue: typeof _Vue): void {
        // Register all components, that have been loaded
        for (const name in Components) {
          console.log(name)
          vue.component(name, Components[name])
        }
    },
};

export { Components };
export default UIPlugin;
