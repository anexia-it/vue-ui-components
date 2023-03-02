import { shallowMount, mount } from "@vue/test-utils";
import { AnxAlert } from "@/components";

describe("AnxAlert.vue", () => {
  it("renders component", () => {
    const id = "test_alert";
    const message = "This is a test alert";
    const wrapper = shallowMount(AnxAlert, {
      slots: {
        default: message
      },
      propsData: { id }
    });

    expect(wrapper.attributes("id")).toMatch(id);
    expect(wrapper.text()).toMatch(message);
  });

  it("closes on click", async () => {
    const wrapper = mount(AnxAlert, {
      propsData: {
        value: true,
        animations: false
      }
    });

    expect(wrapper.classes()).toContain("visible");

    const closeButton = wrapper.get(".dismiss");
    expect(closeButton.exists()).toBeTruthy();

    await closeButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("input")).toBeTruthy();
  });

  it("handles property value change", async () => {
    const wrapper = mount(AnxAlert, {
      propsData: {
        value: true,
        animations: false
      }
    });

    expect(wrapper.classes()).toContain("visible");

    // Closing by chaning the property value
    wrapper.setProps({ value: false });
    await wrapper.vm.$nextTick();
    expect(wrapper.classes()).toContain("hidden");

    // Setting to true again, should show the alert
    wrapper.setProps({ value: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.classes()).toContain("visible");
  });

  it("automatically closes", () => {
    jest.useFakeTimers();

    const wrapper = mount(AnxAlert, {
      propsData: {
        value: true,
        animations: false,
        autoClose: true,
        autoCloseTimeout: 10000
      }
    });

    expect(wrapper.classes()).toContain("visible");

    jest.advanceTimersByTime(6000);
    expect(wrapper.emitted("input")).toBeFalsy();
    jest.advanceTimersByTime(5000);
    expect(wrapper.emitted("input")).toBeTruthy();
  });

  it("has animations", async () => {
    jest.useFakeTimers();

    const wrapper = mount(AnxAlert, {
      propsData: {
        value: true,
        animations: true
      }
    });

    expect(wrapper.classes()).toContain("visible");

    // Closing by changing the property value
    wrapper.setProps({ value: false });
    await wrapper.vm.$nextTick();
    // Should still be visible
    jest.advanceTimersByTime(10);
    expect(wrapper.classes()).toContain("visible");

    // But should be hidden after animation is finished
    jest.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();
    expect(wrapper.classes()).toContain("hidden");
  });
});
