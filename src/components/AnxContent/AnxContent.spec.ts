import { shallowMount } from "@vue/test-utils";
import { AnxContent } from "@/components";

describe("AnxContent.vue", () => {
  it("renders component", () => {
    const text = "This is a test text";
    const wrapper = shallowMount(AnxContent, {
      slots: {
        default: text
      }
    });

    expect(wrapper.text()).toMatch(text);
  });
});
