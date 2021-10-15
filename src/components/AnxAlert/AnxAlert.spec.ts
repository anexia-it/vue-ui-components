import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { AnxAlert } from "@/components";
import { AnxAlertPlugin } from "@/plugins";

describe("AnxAlert.vue", () => {
  it("renders component", () => {
    const name = "test_alert";
    const message = "This is a test alert";
    const wrapper = shallowMount(AnxAlert, {
      slots: {
        default: message
      },
      propsData: { name }
    });

    expect(wrapper.attributes("id")).toMatch(name);
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

  it("mounts correctly via AnxAlertPlugin", async () => {
    const testMessage = "Alert Plugin Test"

    // Create a local vue instance and install the AnxModalPlugin
    const localVue = createLocalVue();
    localVue.use(AnxAlertPlugin);

     // Create a simple body component, where the modal will be mounted
     const bodyComponent = {
      template: "<body></body>"
    };
    const wrapper = mount(bodyComponent, {
      localVue
    });

    // Check if the show function has been registered
    // @ts-ignore
    expect(wrapper.vm.$anxAlert.show).toBeTruthy();

    // @ts-ignore
    const createdAlert = wrapper.vm.$anxAlert.show(testMessage);
    // Check if the modal component has been returned
    expect(createdAlert).toBeTruthy();
  });
});
