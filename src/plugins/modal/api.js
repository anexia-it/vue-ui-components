import AnxModal from "../../components/AnxModal/AnxModal.vue";

const Api = (Vue, globalOptions = {}) => {
  const modal = {
    title: String,
    content: String
  };

  function getModal(propsData) {
    const componentClass = Vue.extend(AnxModal);
    const instance = new componentClass({ propsData });
    instance.$mount();

    if (modal[instance]) {
      return modal[instance];
    } else {
      document.body.appendChild(instance.$el);

      instance.$on("close", () => {
        modal[instance] = null;
        try {
          document.body.removeChild(instance.$el);
        } catch (ex) {
          // Dont't handle this exception
        }
      });
    }
    modal[instance] = instance;
    return instance;
  }

  return {
    show(title, content, options = {}) {
      const localOptions = {
        title,
        content,
        ...options
      };
      const propsData = {
        ...globalOptions,
        ...localOptions
      };
      const modal = getModal(propsData);
      return modal;
    }
  };
};

export default Api;
