import _Vue from "vue";

import AnxHeader from "./components/AnxHeader.vue";
import AnxFooter from "./components/AnxFooter.vue";
import AnxGlobal from "./components/AnxGlobal.vue";
import AnxContainer from "./components/AnxContainer.vue";
import AnxContent from "./components/AnxContent.vue";
import AnxAlert from "./components/AnxAlert.vue";
import AnxParagraph from "./components/AnxParagraph.vue";
import AnxCard from "./components/AnxCard.vue";
import AnxInput from "./components/AnxInput.vue";
import AnxButton from "./components/AnxButton.vue";
import AnxReadOnly from "./components/AnxReadOnly.vue";
import AnxTable from "./components/AnxTable.vue";
import AnxTableRow from "./components/AnxTableRow.vue";
import AnxModal from "./components/AnxModal.vue";
import AnxForm from "./components/AnxForm.vue";
import AnxCheckbox from "./components/AnxCheckbox.vue";
import AnxSelect from "./components/AnxSelect.vue";
import AnxTextarea from "./components/AnxTextarea.vue";
import AnxLink from "./components/AnxLink.vue";

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
  } else {
    Vue.prototype.$i18n = false;
  }

  Vue.component("AnxHeader", AnxHeader);
  Vue.component("AnxFooter", AnxFooter);
  Vue.component("AnxContainer", AnxContainer);
  Vue.component("AnxContent", AnxContent);
  Vue.component("AnxAlert", AnxAlert);
  Vue.component("AnxGlobal", AnxGlobal);
  Vue.component("AnxParagraph", AnxParagraph);
  Vue.component("AnxCard", AnxCard);
  Vue.component("AnxInput", AnxInput);
  Vue.component("AnxReadOnly", AnxReadOnly);
  Vue.component("AnxButton", AnxButton);
  Vue.component("AnxTable", AnxTable);
  Vue.component("AnxTableRow", AnxTableRow);
  Vue.component("AnxModal", AnxModal);
  Vue.component("AnxForm", AnxForm);
  Vue.component("AnxCheckbox", AnxCheckbox);
  Vue.component("AnxSelect", AnxSelect);
  Vue.component("AnxTextarea", AnxTextarea);
  Vue.component("AnxLink", AnxLink);
}
