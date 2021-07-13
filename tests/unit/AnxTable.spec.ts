import { shallowMount } from "@vue/test-utils";
import AnxTable from "@/components/AnxTable.vue";

describe("AnxTable.vue", () => {
  it("renders component", () => {
    const wrapper = shallowMount(AnxTable);

    expect(wrapper.get("table.anx-table").exists()).toBeTruthy();
  });
});
