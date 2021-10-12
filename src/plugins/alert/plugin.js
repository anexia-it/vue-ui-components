import Api from "./api.js";

export const AnxAlertPlugin = {
  install: (Vue, options = {}) => {
    const methods = Api(Vue, options);
    Vue.prototype.$anxAlert = methods;
    Vue.$anxAlert = methods;
  }
};
