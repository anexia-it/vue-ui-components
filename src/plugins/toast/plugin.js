import Api from "./api.js";

export const AnxToastPlugin = {
  install: (Vue, options = {}) => {
    const methods = Api(Vue, options);
    Vue.prototype.$anxToast = methods;
    Vue.$anxToast = methods;
  }
};
