import VueI18n from "vue-i18n";
import router from "./router";

const i18n = new VueI18n({
  locale: "en"
});

/**
 * This is the wrapper for all previews
 * A router instance is provided, so that anx link works properly
 */
export default previewComponent => {
  // https://vuejs.org/v2/guide/render-function.html
  return {
    i18n,
    router,
    render(createElement) {
      return createElement("div", [createElement(previewComponent)]);
    }
  };
};
