import { shallowMount } from "@vue/test-utils";
import { AnxFormContainer } from "@/components";

describe("AnxFormContainer.vue", () => {
  it("renders component", () => {
    const content =
      "This is some content that would normally be filled with components";
    const wrapper = shallowMount(AnxFormContainer, {
      slots: {
        default: content
      }
    });

    expect(wrapper.get("div.anx-form-container").exists()).toBe(true);
    expect(wrapper.text()).toMatch(content);
  });
});
