import { shallowMount } from "@vue/test-utils";
import AnxForm from "@/components/AnxForm.vue";
import AnxButton from "@/components/AnxButton.vue";
import { isExportDeclaration } from "typescript";

describe("AnxForm.vue", () => {
  it("renders component", () => {
    const wrapper = shallowMount(AnxForm);

    expect(wrapper.get("form.anx-form").exists()).toBe(true);
  });

  it("has correct properties", () => {
    const content = "This is the content of the form that is normally filled with some input components";
    const name = "test-form";
    const submitButton = { text: "Test button", width: "100px" };
    const wrapper = shallowMount(AnxForm, {
      slots: {
        default: content
      },
      propsData: { name, submitButton }
    });

    const buttonComponent = wrapper.findComponent(AnxButton);
    console.log(buttonComponent.attributes());
    expect(buttonComponent.exists()).toBe(true);
    expect(buttonComponent.attributes('text')).toMatch(submitButton.text);
    expect(buttonComponent.attributes('width')).toMatch(submitButton.width);
  })
});
