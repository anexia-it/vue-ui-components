import { shallowMount } from "@vue/test-utils";
import { AnxButton } from "@/components";

describe("AnxButton.vue", () => {
  it("renders component", () => {
    const text = "This is a test button";
    const wrapper = shallowMount(AnxButton, {
      slots: {
        default: text
      }
    });

    expect(wrapper.text()).toMatch(text);
  });

  it("has correct button type", () => {
    const btnType = "reset";
    const wrapper = shallowMount(AnxButton, {
      propsData: { btnType }
    });

    expect(wrapper.attributes("type")).toBe(btnType);
  });

  it("emitts event on click", async () => {
    const wrapper = shallowMount(AnxButton);
    await wrapper.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("generate css styles", () => {
    const width = "100px",
      color = "red",
      disabledColor = "blue";
    const wrapper = shallowMount(AnxButton, {
      propsData: {
        width,
        color,
        disabledColor
      }
    });

    // @ts-ignore
    const cssProps = wrapper.vm.cssProps;
    expect(cssProps["--button-width"]).toBe(width);
    expect(cssProps["--button-color"]).toBe(color);
    expect(cssProps["--button-color-disabled"]).toBe(disabledColor);
  });
});
