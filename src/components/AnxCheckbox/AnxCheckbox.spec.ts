import { shallowMount } from "@vue/test-utils";
import { AnxCheckbox } from "@/components";

describe("AnxCheckbox.vue", () => {
  it("renders component", () => {
    const name = "test_checkbox";
    const text = "This is a test checkbox";
    const wrapper = shallowMount(AnxCheckbox, {
      slots: {
        default: text
      },
      propsData: { name }
    });
    expect(wrapper.get("input").attributes("id")).toMatch(name);
    expect(wrapper.text()).toMatch(text);
  });
});
