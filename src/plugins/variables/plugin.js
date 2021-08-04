import Api from "./api.js";

export const AnxVariablesPlugin = {
  install: (Vue, options = {}) => {
    const methods = Api(Vue, options);
    Vue.prototype.$anxVariables = methods;
    Vue.$anxVariables = methods;
    methods.init(options);
  }
};
