import { shallowMount } from "@vue/test-utils";
import { AnxCheckbox } from "@/components";

describe("AnxCheckbox.vue", () => {
  it("renders component", () => {
    const name = "test_checkbox";
    const text = "This is a test checkbox";
    const wrapper = shallowMount(AnxCheckbox, {
      slots: {
        default: text
      },
      propsData: { name }
    });
    expect(wrapper.get("input").attributes("id")).toMatch(name);
    expect(wrapper.text()).toMatch(text);
  });

  it("emitts event on click", async () => {
    const wrapper = shallowMount(AnxCheckbox);
    const input = wrapper.get("input");
    expect(input.exists()).toBeTruthy();
    await input.trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("input")).toBeTruthy();
  });

  it("changes state on property change", async () => {
    const wrapper = shallowMount(AnxCheckbox, {
      propsData: {
        value: false
      }
    });
    
    // @ts-ignore
    expect(wrapper.get("input").element.checked).toBeFalsy();

    // Check checkbox
    wrapper.setProps({ value: true });
    await wrapper.vm.$nextTick();
    // @ts-ignore
    expect(wrapper.get("input").element.checked).toBeTruthy();
    
    // Uncheck checkbox
    wrapper.setProps({ value: false });
    await wrapper.vm.$nextTick();
    // @ts-ignore
    expect(wrapper.get("input").element.checked).toBeFalsy();
  })
});
