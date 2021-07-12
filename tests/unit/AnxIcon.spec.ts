import { shallowMount } from "@vue/test-utils";
import AnxIcon from "@/components/AnxIcon.vue";

describe("AnxIcon.vue", () => {
  it("renders component", () => {
    const wrapper = shallowMount(AnxIcon);

    expect(wrapper.get("div.anx-icon").exists()).toBe(true);
  });

  it("has correct properties", () => {
    const height = "10px", width = "20px";
    const icon = "information", title = "This is a test title";
    const margin = "25px";
    const wrapper = shallowMount(AnxIcon, {
      propsData: { height, width, icon, margin }
    });

    expect(wrapper.get("div.anx-icon").attributes("aria-label")).toMatch(title);
    expect(wrapper.get("anx-icon-" + icon).exists()).toBe(true);
  })
});
