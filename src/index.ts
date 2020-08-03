import _Vue from 'vue';
import Components from './components';

import VueI18n from "vue-i18n";
import dePlugin from "./locales/de.json";
import enPlugin from "./locales/en.json";


const UIPlugin = {
    install(Vue: typeof _Vue): void {
        // Register all components, that have been loaded
        for (const name in Components) {
          Vue.component(name, (Components as any)[name])
        }

        // TODO: implement i18n for nuxt and vue
        /*if (Object.hasOwnProperty.call(Vue.prototype.$nuxt, "_i18n")) {
          seti18n(Vue.prototype.$nuxt._i18n);
        } else {
          Vue.prototype.$nuxt._i18n = false;
        }

        function seti18n(i18n: VueI18n) {
          const deConsumer = i18n.getLocaleMessage("de");
          const enConsumer = i18n.getLocaleMessage("en");

          const de = {
            ...deConsumer,
            ...dePlugin
          };

          const en = {
            ...enConsumer,
            ...enPlugin
          };

          i18n.setLocaleMessage("de", de);
          i18n.setLocaleMessage("en", en);
        }*/
    },
};

export { Components };
export default UIPlugin;
