const Api = (Vue, globalOptions = {}) => {
  return {
    /**
     * Sets all variables to the default variables
     */
    init() {
      // TODO: set color via globalOptions
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
      if (document) {
        document.documentElement.style.setProperty(key, value);
        return true;
      } else {
        console.error("Unable to set variable via AnxVariablesPlugin!");
        return false;
      }
    },
    /**
     * Resets a variable to the default value
     */
    resetVariable(key) {
      document.documentElement.style.removeProperty(key);
    }
  };
};

export default Api;
