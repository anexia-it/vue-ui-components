const Api = (Vue, globalOptions = {}) => {
  return {
    /**
     * Sets all variables to the default variables
     */
    init(options) {
      // Check if there are any variables set in globalOptions
      if ("variables" in globalOptions) {
        for (const [key, value] of Object.entries(globalOptions.variables)) {
          this.setVariable(key, value);
        }
      }

      // Check if there are any variables set in options
      if ("variables" in options) {
        for (const [key, value] of Object.entries(options.variables)) {
          this.setVariable(key, value);
        }
      }
    },
    /**
     * Sets a variable
     *
     * @param {*} key       The key of the variable
     * @param {*} value     The value of the variable
     * @returns true        On success
     * @returns false       On error
     */
    setVariable(key, value) {
      try {
        if (document) {
          document.documentElement.style.setProperty(key, value);
          return true;
        } else {
          throw true;
        }
      } catch (ex) {
        return false;
      }
    },
    /**
     * Resets a variable to the default value
     */
    resetVariable(key) {
      try {
        document.documentElement.style.removeProperty(key);
      } catch (ex) {
        return false;
      }
    }
  };
};

export default Api;
