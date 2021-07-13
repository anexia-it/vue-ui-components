import { shallowMount } from "@vue/test-utils";
import AnxContainer from "@/components/AnxContainer.vue";

describe("AnxContainer.vue", () => {
  it("renders component and has correct properties", () => {
    const width = "100px";
    const text = "This is a test text";
    const wrapper = shallowMount(AnxContainer, {
      slots: {
        default: text
      },
      propsData: { width }
    });
    
    expect(wrapper.get(".anx-container").attributes("width")).toMatch(width);
    expect(wrapper.text()).toMatch(text);
  });
});
