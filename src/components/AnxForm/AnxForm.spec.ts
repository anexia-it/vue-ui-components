import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { AnxForm, AnxButton, AnxInput } from "@/components";
import VeeValidate from "vee-validate";

describe("AnxForm.vue", () => {
  it("renders component", () => {
    const wrapper = mount(AnxForm);

    expect(wrapper.get("form.anx-form").exists()).toBe(true);
  });

  it("has correct properties", () => {
    const content =
      "This is the content of the form that is normally filled with some input components";
    const name = "test-form";
    const submitButton = { text: "Test button", width: "100px" };
    const wrapper = shallowMount(AnxForm, {
      slots: {
        default: content
      },
      propsData: { name, submitButton }
    });

    const buttonComponent = wrapper.findComponent(AnxButton);

    expect(buttonComponent.exists()).toBe(true);
    expect(buttonComponent.attributes("text")).toMatch(submitButton.text);
    expect(buttonComponent.attributes("width")).toMatch(submitButton.width);
  });

  it("emmits event on submit", async () => {
    // Install vee validate in local vue
    const localVue = createLocalVue();
    localVue.use(VeeValidate);

    const wrapper = mount(AnxForm, { localVue });

    await wrapper.get("form").trigger("submit.prevent")
    await wrapper.vm.$nextTick();
    
    expect(wrapper.emitted("submit"));
  });

  it("has validation function", async () => {
    // Install vee validate in local vue
    const localVue = createLocalVue();
    localVue.use(VeeValidate);

    const wrapper = mount(AnxForm, {
      localVue
    })

    // @ts-ignore
    expect(await wrapper.vm.isValid()).toBeTruthy();
  });
});
