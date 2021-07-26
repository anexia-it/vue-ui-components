import { mount, shallowMount, NameSelector, createLocalVue } from "@vue/test-utils";
import { AnxTextarea } from "@/components";
import VeeValidate, { ValidationProvider } from "vee-validate";
import Vue from "vue";

describe("AnxTextarea.vue", () => {
  it("renders component", () => {
    const wrapper = mount(AnxTextarea);

    expect(wrapper.get("div.anx-textarea").exists()).toBeTruthy();
  });

  it("has correct properties", () => {
    const autocomplete = "test",
      dataVvAs = "field_name_i18n",
      id = "my_input_test",
      inline = null,
      label = "This is some label",
      name = "input_name",
      readonly = null,
      rules = null,
      width = "100px";
    const wrapper = shallowMount(AnxTextarea, {
      propsData: {
        autocomplete,
        dataVvAs,
        id,
        inline,
        label,
        name,
        readonly,
        rules,
        width
      }
    });

    const validationProviderComponent = wrapper.findComponent(
      ValidationProvider as NameSelector
    );
    expect(validationProviderComponent.exists()).toBe(true);
    expect(validationProviderComponent.attributes("name")).toBe(dataVvAs);

    expect(wrapper.get(".anx-textarea > textarea").attributes("id")).toMatch(id);
    expect(wrapper.get(".anx-textarea > textarea").attributes("name")).toMatch(name);
    expect(
      wrapper.get(".anx-textarea > textarea").attributes("autocomplete")
    ).toMatch(autocomplete);
    expect(wrapper.get("label").text()).toMatch(label);
  });

  it("handles input correctly", async () => {
    const text = "Some input test text";
    const wrapper = shallowMount(AnxTextarea);
    const inputField = wrapper.get(".anx-textarea > textarea");

    // @ts-ignore
    expect(inputField.element.value).toMatch("");
    expect(wrapper.get(".anx-textarea > textarea").classes("active")).toBe(false);

    await inputField.setValue(text);

    // @ts-ignore
    expect(inputField.element.value).toMatch(text);
    expect(wrapper.get(".anx-textarea > textarea").classes("active")).toBe(true);
  });

  it("handles user click", async () => {
    const wrapper = shallowMount(AnxTextarea);
    expect(wrapper.get(".anx-textarea > textarea").classes("active")).toBe(false);

    await wrapper.get(".anx-textarea > textarea").trigger("click");

    expect(wrapper.get(".anx-textarea > textarea").classes("active")).toBe(true);
  });

  it("has correct validation and handles blur event", async () => {
    const rules = "email";
    const invalidText = "someinvalidemail";
    const validText = "somevalid@email.com";
    // We need mount here for validation to work
    const wrapper = mount(AnxTextarea, {
      propsData: { rules }
    });
    const inputField = wrapper.get(".anx-textarea > textarea");

    // Should be valid without any user interaction
    expect(inputField.classes("is-invalid")).toBe(false);

    // Change to invalid text
    await inputField.setValue(invalidText);
    await inputField.trigger("change");
    await inputField.trigger("blur");
    await Vue.nextTick();

    // Should be invalid with invalid user input
    expect(inputField.classes("is-invalid")).toBe(true);

    // Change to valid text
    await inputField.setValue(validText);
    await inputField.trigger("change");
    await inputField.trigger("blur");
    await Vue.nextTick();

    // Should be valid now
    expect(inputField.classes("is-invalid")).toBe(false);
  });

  it("handles value change", async () => {
    const value = "This is a test";
    const wrapper = mount(AnxTextarea);

    const textarea = wrapper.get(".anx-textarea > textarea");
    expect(textarea.classes("active")).toBe(false);
    // @ts-ignore
    expect(textarea.element.value).toMatch("");

    wrapper.setProps({ value });
    await wrapper.vm.$nextTick();

    expect(textarea.classes("active")).toBe(true);
    // @ts-ignore
    expect(textarea.element.value).toMatch(value);
  });

  it("show initially set value", async () => {
    const value = "This is a test";
    const wrapper = mount(AnxTextarea, {
      propsData: {
        value
      }
    });

    await wrapper.vm.$nextTick();

    // @ts-ignore
    expect(wrapper.get(".anx-textarea > textarea").element.value).toMatch(value);

    wrapper.setProps({ value: null });
    await wrapper.vm.$nextTick();

    // @ts-ignore
    expect(wrapper.get(".anx-textarea > textarea").element.value).toMatch("");
  });

  it("sets correct validation rule", () => {
    const wrapper = shallowMount(AnxTextarea, {
      propsData: {
        validation: true
      }
    });

    const validationProvierdComponent = wrapper.find('validationprovider-stub');
    expect(validationProvierdComponent.exists()).toBeTruthy();
    expect(validationProvierdComponent.attributes("rules")).toMatch("required");
  })
});
