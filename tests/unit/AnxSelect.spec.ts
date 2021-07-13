import { mount } from "@vue/test-utils";
import AnxSelect from "@/components/AnxSelect.vue";

describe("AnxSelect.vue", () => {
  it("renders component", () => {
    const options = [
      { value: 0, text: "0" },
      { value: 1, text: "1" }
    ];
    const wrapper = mount(AnxSelect, {
      propsData: { options }
    });

    expect(wrapper.get("div.anx-select").exists()).toBeTruthy();
  });
});
