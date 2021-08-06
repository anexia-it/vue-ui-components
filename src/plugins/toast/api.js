import AnxToast from "../../components/AnxToast/AnxToast.vue";

const Api = (Vue, globalOptions = {}) => {
  return {
    /**
     * Show a default toast
     */
    show(message, options = {}) {
      const localOptions = { message, ...options };
      const componentClass = Vue.extend(AnxToast);

      // Create the instance of the toast and set the value to true
      const instance = new componentClass({
        propsData: {
          ...globalOptions,
          ...localOptions,
          value: true
        }
      });

      // When the modal is closed, it should be hidden
      instance.$on("input", value => {
        if (!value) {
          instance.hideAction();
        }
      });

      // Mount the component in the body
      const component = instance.$mount();
      document.body.appendChild(component.$el);

      return component;
    },
    /**
     * Show a success toast
     * This is just a wrapper around the show function
     *
     * @param {string} message The message to show
     * @param {Object} options The options for the toast
     */
    success(message, options = {}) {
      return this.show(message, { ...options, type: "success" });
    },
    /**
     * Show a error toast
     * This is just a wrapper around the show function
     *
     * @param {string} message The message to show
     * @param {Object} options The options for the toast
     */
    error(message, options = {}) {
      return this.show(message, { ...options, type: "error" });
    },
    /**
     * Show a warning toast
     * This is just a wrapper around the show function
     *
     * @param {string} message The message to show
     * @param {Object} options The options for the toast
     */
    warning(message, options = {}) {
      return this.show(message, { ...options, type: "warning" });
    }
  };
};

export default Api;
