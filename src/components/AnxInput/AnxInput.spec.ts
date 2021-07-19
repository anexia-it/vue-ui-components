import { NameSelector, shallowMount, mount } from "@vue/test-utils";
import { AnxInput } from "@/components";
import { ValidationProvider } from "vee-validate";
import Vue from "vue";

describe("AnxInput.vue", () => {
  it("renders component", () => {
    const wrapper = shallowMount(AnxInput);

    expect(wrapper.get(".anx-input > input").exists()).toBe(true);
  });

  it("has correct properties", () => {
    const assistiveText = "Some assistive text",
      autocomplete = "test",
      dataVvAs = "field_name_i18n",
      id = "my_input_test",
      inline = null,
      label = "This is some label",
      name = "input_name",
      readonly = null,
      rules = null,
      type = "password",
      width = "100px";
    const wrapper = shallowMount(AnxInput, {
      propsData: {
        assistiveText,
        autocomplete,
        dataVvAs,
        id,
        inline,
        label,
        name,
        readonly,
        rules,
        type,
        width
      }
    });

    const validationProviderComponent = wrapper.findComponent(
      ValidationProvider as NameSelector
    );
    expect(validationProviderComponent.exists()).toBe(true);
    expect(validationProviderComponent.attributes("name")).toBe(dataVvAs);

    expect(wrapper.get(".anx-input > input").attributes("id")).toMatch(id);
    expect(wrapper.get(".anx-input > input").attributes("name")).toMatch(name);
    expect(
      wrapper.get(".anx-input > input").attributes("autocomplete")
    ).toMatch(autocomplete);
    expect(wrapper.get(".anx-input > input").attributes("type")).toMatch(type);
    expect(wrapper.get("label").text()).toMatch(label);
    expect(wrapper.get(".anx-input-hint").text()).toMatch(assistiveText);
  });

  it("handles input correctly", async () => {
    const text = "Some input test text";
    const wrapper = shallowMount(AnxInput);
    const inputField = wrapper.get(".anx-input > input");

    // @ts-ignore
    expect(inputField.element.value).toMatch("");
    expect(wrapper.get(".anx-input").classes("active")).toBe(false);

    await inputField.setValue(text);

    // @ts-ignore
    expect(inputField.element.value).toMatch(text);
    expect(wrapper.get(".anx-input").classes("active")).toBe(true);
  });

  it("handles user click", async () => {
    const wrapper = shallowMount(AnxInput);
    expect(wrapper.get(".anx-input").classes("active")).toBe(false);

    await wrapper.get(".anx-input > input").trigger("click");

    expect(wrapper.get(".anx-input").classes("active")).toBe(true);
  });

  it("has correct validation and handles blur event", async () => {
    const rules = "email";
    const invalidText = "someinvalidemail";
    const validText = "somevalid@email.com";
    // We need mount here for validation to work
    const wrapper = mount(AnxInput, {
      propsData: { rules }
    });
    const inputField = wrapper.get(".anx-input > input");

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
});
