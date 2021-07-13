import { shallowMount } from "@vue/test-utils";
import AnxTableCol from "@/components/AnxTableCol.vue";

describe("AnxTableCol.vue", () => {
  it("renders component and has correct properties", () => {
    const content = "This is the content";
    const align = "right";
    const wrapper = shallowMount(AnxTableCol, {
      slots: {
        default: content
      },
      propsData: { align }
    });

    const tableColComponent = wrapper.get("td.anx-table-col");
    expect(tableColComponent.exists()).toBeTruthy();
    expect(tableColComponent.classes("text-" + align)).toBeTruthy();
    expect(tableColComponent.text()).toMatch(content);
  });
});
