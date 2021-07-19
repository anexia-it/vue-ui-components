import { shallowMount } from "@vue/test-utils";
import { AnxList, AnxIcon } from "@/components";

describe("AnxList.vue", () => {
  it("renders component", () => {
    const wrapper = shallowMount(AnxList);

    expect(wrapper.get("ul.anx-list").exists()).toBe(true);
  });

  it("renders a list", () => {
    const items = ["one", "two", "three"];
    const wrapper = shallowMount(AnxList, {
      propsData: { items }
    });

    items.forEach(item => {
      expect(wrapper.text()).toContain(item);
    });
  });

  it("can change icons", () => {
    const icon = "anexia";
    const items = ["test"];
    const wrapper = shallowMount(AnxList, {
      propsData: { icon, items }
    });

    const iconComponent = wrapper.findComponent(AnxIcon);
    expect(iconComponent.exists()).toBe(true);
    expect(iconComponent.attributes("icon")).toMatch(icon);
  });
});
