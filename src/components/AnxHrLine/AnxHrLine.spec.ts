import { shallowMount } from "@vue/test-utils";
import { AnxHrLine } from "@/components";

describe("AnxHrLine.vue", () => {
  it("renders component and has correct attributes", () => {
    const color = "red";
    const margin = "100px",
      marginTop = "20px",
      marginBottom = "10px";
    const wrapper = shallowMount(AnxHrLine, {
      propsData: { color, margin, marginTop, marginBottom }
    });

    expect(wrapper.get("hr.anx-hr-line").exists()).toBe(true);
  });
});
