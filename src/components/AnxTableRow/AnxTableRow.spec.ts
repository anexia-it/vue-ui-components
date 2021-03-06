import { shallowMount } from "@vue/test-utils";
import { AnxTableRow } from "@/components";

describe("AnxTableRow.vue", () => {
  it("renders component", () => {
    const wrapper = shallowMount(AnxTableRow);

    expect(wrapper.get("tr.anx-table-row").exists()).toBeTruthy();
  });
});
