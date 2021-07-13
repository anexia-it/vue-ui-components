import { shallowMount } from "@vue/test-utils";
import AnxButton from "@/components/AnxButton.vue";

describe("AnxButton.vue", () => {
  it("renders component", () => {
    const text = "This is a test button";
    const wrapper = shallowMount(AnxButton, {
      slots: {
        default: text
      }
    });

    expect(wrapper.text()).toMatch(text);
  });

  it("has correct button type", () => {
    const btnType = "reset";
    const wrapper = shallowMount(AnxButton, {
      propsData: { btnType }
    });

    expect(wrapper.attributes('type')).toBe(btnType);
  });
});
