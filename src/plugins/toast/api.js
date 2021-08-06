import AnxToaster from "../../components/AnxToaster/AnxToaster.vue";

const Api = (Vue, globalOptions = {}) => {
  // This are all the toasters
  const toasters = {
    top: {
      left: null,
      center: null,
      right: null
    },
    bottom: {
      left: null,
      center: null,
      right: null
    }
  };

  function getToaster(propsData) {
    const componentClass = Vue.extend(AnxToaster);
    const instance = new componentClass({ propsData });
    instance.$mount();

    // Check if the instance has already been created or has to be created
    if (toasters[instance._verticalAlign][instance._horizontalAlign]) {
      return toasters[instance._verticalAlign][instance._horizontalAlign];
    } else {
      document.body.appendChild(instance.$el);

      // Remove the element if it has to be destroyed
      instance.$on("destroy", () => {
        toasters[instance._verticalAlign][instance._horizontalAlign] = null;
        try {
          document.body.removeChild(instance.$el);
        } catch (ex) {
          // Dont't handle this exception
        }
      });

      toasters[instance._verticalAlign][instance._horizontalAlign] = instance;
      return instance;
    }
  }

  return {
    /**
     * Show a default toast
     */
    show(message, options = {}) {
      const localOptions = { message, ...options };
      const propsData = {
        ...globalOptions,
        ...localOptions
      };

      const toaster = getToaster(propsData);

      const toast = toaster.addToast({ ...propsData, value: true });

      return toast;
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
