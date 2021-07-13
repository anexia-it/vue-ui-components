import { shallowMount } from "@vue/test-utils";
import AnxParagraph from "@/components/AnxParagraph.vue";
import AnxTitle from "@/components/AnxTitle.vue";

describe("AnxParagraph.vue", () => {
  it("renders component", () => {
    const wrapper = shallowMount(AnxParagraph);

    expect(wrapper.get("p.anx-paragraph").exists()).toBeTruthy();
  });

  it("renders a different html tag", () => {
    const wrapper = shallowMount(AnxParagraph, {
      propsData: { element: "div" }
    });

    expect(wrapper.get("div.anx-paragraph").exists()).toBeTruthy();
  });

  it("can display a title correctly", () => {
    const content = "This is the content of the paragraph";
    const title = "This is the title";
    const size = "h2";
    const wrapper = shallowMount(AnxParagraph, {
      slots: {
        default: content
      },
      propsData: { title, size }
    });

    const titleComponent = wrapper.findComponent(AnxTitle);
    expect(titleComponent.exists()).toBeTruthy();
    expect(titleComponent.text()).toMatch(title);
    expect(titleComponent.attributes("size")).toMatch(size);

    expect(wrapper.text()).toMatch(content);
  });

  it("applies style and classes correctly", () => {
    const hint = true;
    const inverse = true;
    const wrapper = shallowMount(AnxParagraph, {
      propsData: { hint, inverse }
    });

    expect(wrapper.classes("hint")).toBeTruthy();
    expect(wrapper.classes("inversed-colors")).toBeTruthy();
  });
});
