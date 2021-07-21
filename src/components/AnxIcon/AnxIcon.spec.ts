import { mount } from "@vue/test-utils";
import { AnxIconsPlugin } from "@/plugins";
import { AnxIcon } from "@/components";
import Vue from "vue";

beforeEach(() => {
  // For testing we have to install the AnxIconsPlugin manually
  Vue.use(AnxIconsPlugin);
});

describe("AnxIcon.vue", () => {
  it("renders component", async () => {
    // We have to use mount here
    const wrapper = await mount(AnxIcon);

    expect(wrapper.get("div.anx-icon").exists()).toBe(true);
  });

  it("has correct properties and renders different icon", () => {
    const height = "10px",
      width = "20px";
    const icon = "information",
      title = "This is a test title";
    const margin = "25px";
    const wrapper = mount(AnxIcon, {
      propsData: { height, width, icon, margin, title }
    });

    const iconComponent = wrapper.get(".anx-icon-" + icon);
    expect(iconComponent.exists()).toBe(true);
    expect(iconComponent.attributes("style")).toContain("width: " + width);
    expect(iconComponent.attributes("style")).toContain("height: " + height);
    expect(iconComponent.attributes("style")).toContain("margin: " + margin);
    expect(iconComponent.text()).toContain(title);
  });
});
