import _Vue from "vue";
import AnxHeader from "./components/AnxHeader.vue";
import VueI18n from "vue-i18n";

export function UIPlugin(Vue: typeof _Vue, i18nConsumer?: VueI18n) {
  function seti18n(i18n: VueI18n) {
    const deConsumer: object = i18n.getLocaleMessage("de");
    const enConsumer: object = i18n.getLocaleMessage("en");

    const dePlugin = require("./locales/de.json");
    const enPlugin = require("./locales/en.json");

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
  }

  if (Vue.prototype.hasOwnProperty.call("$i18n")) {
    if (!i18nConsumer) {
      console.warn(
        "Vue i18n is loaded but uiplugin got no i18n object at initialization. UiPlugin i18n won't work! Please add i18n to your Vue.use statement as a parameter!"
      );
      return;
    }
    seti18n(i18nConsumer);
  }
  Vue.component("AnxHeader", AnxHeader);
}
