import { shallowMount } from "@vue/test-utils";
import { AnxTitle } from "@/components";

describe("AnxTitle.vue", () => {
  it("renders component", () => {
    const wrapper = shallowMount(AnxTitle);

    expect(wrapper.get("h1.anx-title").exists()).toBeTruthy();
  });

  it("renders different sizes", () => {
    const wrapper2 = shallowMount(AnxTitle, { propsData: { size: "h2" } });
    expect(wrapper2.get("h2.anx-title").exists()).toBeTruthy();

    const wrapper3 = shallowMount(AnxTitle, { propsData: { size: "h3" } });
    expect(wrapper3.get("h3.anx-title").exists()).toBeTruthy();
  });

  it("has correct properties", () => {
    const text = "Some test title",
      margin = "50px",
      noline = true;
    const wrapper = shallowMount(AnxTitle, {
      slots: {
        default: text
      },
      propsData: { margin, noline }
    });

    expect(wrapper.text()).toMatch(text);
    expect(wrapper.classes("no-line")).toBeTruthy();
  });
});
