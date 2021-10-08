import Api from "./api.js";

export const AnxModalPlugin = {
  install: (Vue, options = {}) => {
    const methods = Api(Vue, options);
    Vue.prototype.$anxModal = methods;
    Vue.$anxModal = methods;
  }
};
