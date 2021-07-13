import { mount } from "@vue/test-utils";
import AnxTextarea from "@/components/AnxTextarea.vue";

describe("AnxTextarea.vue", () => {
  it("renders component", () => {
    const wrapper = mount(AnxTextarea);

    expect(wrapper.get("div.anx-textarea").exists()).toBeTruthy();
  });
});
