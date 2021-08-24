import { shallowMount } from "@vue/test-utils";
import { AnxHeader, AnxIcon, AnxLink } from "@/components";

describe("AnxHeader.vue", () => {
  it("renders component", () => {
    const wrapper = shallowMount(AnxHeader);

    expect(wrapper.get("div.anx-header").exists()).toBe(true);
  });

  it("has correct properties", () => {
    const icon = "anexia";
    const iconSize = "50px";
    const iconUrl = "#test";
    const menus = [
      { menu: "test1", link: "#test1" },
      { menu: "test2", link: "#test2" }
    ];
    const width = "100px";
    const wrapper = shallowMount(AnxHeader, {
      propsData: { icon, iconSize, iconUrl, menus, width }
    });

    const iconComponent = wrapper.findComponent(AnxIcon);
    expect(iconComponent.exists()).toBe(true);
    expect(iconComponent.attributes("icon")).toMatch(icon);
    expect(iconComponent.attributes("width")).toMatch(iconSize);
    expect(iconComponent.attributes("height")).toMatch(iconSize);

    const linkComponents = wrapper.findAllComponents(AnxLink);
    // This is the icon url
    expect(linkComponents.at(0).exists()).toBe(true);
    expect(linkComponents.at(0).attributes("href")).toMatch(iconUrl);
    // This is the url for the first menu
    expect(linkComponents.at(1).exists()).toBe(true);
    expect(linkComponents.at(1).attributes("href")).toMatch(menus[0].link);
    expect(linkComponents.at(1).attributes("text")).toMatch(menus[0].menu);
    // This is the link for the second menu
    expect(linkComponents.at(2).exists()).toBe(true);
    expect(linkComponents.at(2).attributes("href")).toMatch(menus[1].link);
    expect(linkComponents.at(2).attributes("text")).toMatch(menus[1].menu);
  });
});
