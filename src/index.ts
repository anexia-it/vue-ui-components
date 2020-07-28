import _Vue from "vue";

import AnxHeader from "./components/AnxHeader.vue";
import AnxGlobal from "./components/AnxGlobal.vue";
import AnxContainer from "./components/AnxContainer.vue";
import AnxContent from "./components/AnxContent.vue";
import AnxTitle from "./components/AnxTitle.vue";
import AnxButton from "./components/AnxButton.vue";

import VueI18n from "vue-i18n";

import dePlugin from "./locales/de.json";
import enPlugin from "./locales/en.json";

export function UIPlugin(Vue: typeof _Vue, i18nConsumer?: VueI18n) {
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
  }

  if (Object.hasOwnProperty.call(Vue.prototype, "$i18n")) {
    if (!i18nConsumer) {
      console.warn(
        "Vue i18n is loaded but uiplugin got no i18n object at initialization. UiPlugin i18n won't work! Please add i18n to your Vue.use statement as a parameter!"
      );
      return;
    }
    seti18n(i18nConsumer);
  }
  Vue.component("AnxHeader", AnxHeader);
  Vue.component("AnxGlobal", AnxGlobal);
  Vue.component("AnxContainer", AnxContainer);
  Vue.component("AnxContent", AnxContent);
  Vue.component("AnxTitle", AnxTitle);
  Vue.component("AnxButton", AnxButton);
}
