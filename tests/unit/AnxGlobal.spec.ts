import { shallowMount } from "@vue/test-utils";
import AnxGlobal from "@/components/AnxGlobal.vue";

describe("AnxGlobal.vue", () => {
  it("renders component", () => {
    const content = "This is some content for the default slot";
    const wrapper = shallowMount(AnxGlobal, {
      slots: {
        default: content
      }
    });

    expect(wrapper.get("div.anx-global").exists()).toBe(true);
    expect(wrapper.text()).toMatch(content);
  });
});
