import { shallowMount } from "@vue/test-utils";
import AnxTableContainer from "@/components/AnxTableContainer.vue";

describe("AnxTableContainer.vue", () => {
  it("renders component", () => {
    const content = "This is a test content";
    const wrapper = shallowMount(AnxTableContainer, {
      slots: {
        default: content
      }
    });

    const tableContainerComponent = wrapper.get("div.anx-table-container");
    expect(tableContainerComponent.exists()).toBeTruthy();
    expect(tableContainerComponent.text()).toMatch(content);
  });

  it("is scrollable if defined", () => {
    const wrapper = shallowMount(AnxTableContainer, {
      propsData: { scrollable: true }
    });

    expect(wrapper.get("div.anx-table-container").exists()).toBeTruthy();
    expect(wrapper.get("div.anx-table-container-scrollable").exists()).toBeTruthy();
  });
});
