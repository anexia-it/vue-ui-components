import AnxAlert from "../../components/AnxAlert/AnxAlert.vue";

const Api = (Vue, globalOptions = {}) => {
  // This is alert stuff
  const alert = {
    text: null,
    target: null
  };

  function getAlert(propsData, target) {
    const componentClass = Vue.extend(AnxAlert);
    const instance = new componentClass({ propsData });
    instance.$mount();

    if (alert[instance]) {
      return alert[instance];
    } else {
      if (target !== undefined) {
        document.querySelector(target).appendChild(instance.$el);
      } else {
        document.body.appendChild(instance.$el);
      }
    }

    // Remove instance
    instance.$on("destroy", () => {
      alert[instance] = null;
      try {
        document.body.removeChild(instance.$el);
      } catch (ex) {
        // Dont't handle this exception
      }
    });

    alert[instance] = instance;
    return instance;
  }
  return {
    show(text, target, options = {}) {
      const localOptions = { text, target, ...options };
      const propsData = {
        ...globalOptions,
        ...localOptions
      };

      const alert = getAlert(propsData, target);

      alert.showAction({ propsData });

      return alert;
    }
  };
};

export default Api;
