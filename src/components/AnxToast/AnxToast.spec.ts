import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { AnxToast } from "@/components";
import { AnxToastPlugin } from "@/plugins";

describe("AnxToast.vue", () => {
  it("mounts correctly via v-model", async () => {
    const wrapper = mount(AnxToast);

    // If mounted without v-model, the toast should not be rendered
    const toastComponent = wrapper.find(".anx-toast");
    expect(toastComponent.exists()).toBeFalsy();

    // Set the v-model value to true, the toast should render
    await wrapper.setProps({ value: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.get(".anx-toast").exists()).toBeTruthy();
  });

  it("mounts correctly with properties", () => {
    const message = "This is a test message",
      type = "warning",
      horizontalAlign = "center";

    const wrapper = mount(AnxToast, {
      propsData: {
        animations: false,
        autoClose: false,
        backgroundColor: "#ffffff",
        color: "#000000",
        disableCloseOnClick: true,
        horizontalAlign,
        message,
        type,
        value: true
      }
    });

    const toast = wrapper.get(".anx-toast");
    expect(toast.exists()).toBeTruthy();
    expect(toast.attributes("style")).toContain(
      "background-color: rgb(255, 255, 255)"
    );
    expect(toast.attributes("style")).toContain("color: rgb(0, 0, 0)");
    expect(wrapper.classes("anx-toast-" + horizontalAlign)).toBeTruthy();
    expect(toast.classes("anx-toast-" + type)).toBeTruthy();
    expect(toast.text()).toMatch(message);
  });

  it("mounts correctly via AnxToastPlugin", async () => {
    const testMessage = "This is a test message";

    // Create a local vue instance and install the AnxToastPlugin
    const localVue = createLocalVue();
    localVue.use(AnxToastPlugin);

    // Create a simple body component, where the toast will be mounted
    const bodyComponent = {
      template: "<body></body>"
    };
    const wrapper = mount(bodyComponent, {
      localVue
    });

    // Check if the show function has been registered
    // @ts-ignore
    expect(wrapper.vm.$anxToast.show).toBeTruthy();

    // @ts-ignore
    const createdToast = wrapper.vm.$anxToast.show(testMessage);

    // Check if the toast component has been returned
    expect(createdToast).toBeTruthy();
  });

  it("sets notification text via slot", () => {
    const testMessage = "This is a test message";
    const wrapper = shallowMount(AnxToast, {
      slots: {
        default: testMessage
      },
      propsData: { value: true }
    });

    expect(wrapper.get(".anx-toast").exists()).toBeTruthy();
    expect(wrapper.text()).toMatch(testMessage);
  });

  it("closes on click if enabled", async () => {
    const wrapper = shallowMount(AnxToast, {
      propsData: { value: true }
    });

    // Toast should exist before closing
    expect(wrapper.get(".anx-toast").exists()).toBeTruthy();

    // Closing the notification by clicking
    await wrapper.get(".anx-toast").trigger("click");

    // Check if the dismiss event has been emitted
    expect(wrapper.emitted("dismiss")).toBeTruthy();
  });

  it("closes automatically", async () => {
    // Use fake timers
    jest.useFakeTimers();

    const wrapper = shallowMount(AnxToast, {
      propsData: { value: true, autoClose: true, autoCloseTimeout: 5000 }
    });

    // Toast should exist before closing
    expect(wrapper.get(".anx-toast").exists()).toBeTruthy();

    // Advance timers by 6 seconds
    jest.advanceTimersByTime(6000);

    // Check if the dismiss event has been emitted
    expect(wrapper.emitted("dismiss")).toBeTruthy();
  });

  it("closes on v-model value changed", async () => {
    const wrapper = shallowMount(AnxToast, {
      propsData: { value: true, autoClose: false, animations: false }
    });

    // Toast should exist before closing
    expect(wrapper.get(".anx-toast").exists()).toBeTruthy();

    // Set value to false
    wrapper.setProps({ value: false });
    await wrapper.vm.$nextTick();

    // Check if the dismiss event has been emitted
    expect(wrapper.find(".anx-toast").exists()).toBeFalsy();
  });

  it("has working animations", async () => {
    // Use fake timers
    jest.useFakeTimers();

    const wrapper = mount(AnxToast, {
      propsData: { value: true, autoClose: false, animations: true }
    });

    // Should fade in correctly
    const toast = wrapper.get(".anx-toast");
    expect(toast.exists()).toBeTruthy();
    expect(toast.classes("fade-in")).toBeTruthy();
    jest.advanceTimersByTime(1000);

    // Should fade out when closing
    wrapper.setProps({ value: false });
    await wrapper.vm.$nextTick();
    expect(toast.classes("fade-out")).toBeTruthy();
    jest.advanceTimersByTime(1000);
    expect(wrapper.find(".axn-toast").exists()).toBeFalsy();
  });

  it("cancel auto close timeout when closing before timeout", async () => {
    window.clearTimeout = jest.fn();

    const wrapper = mount(AnxToast, {
      propsData: {
        value: true,
        autoClose: true,
        autoCloseTimeout: 5000,
        animations: true
      }
    });

    // Toast should exist before closing
    expect(wrapper.get(".anx-toast").exists()).toBeTruthy();

    // Set value to false
    wrapper.setProps({ value: false });
    await wrapper.vm.$nextTick();

    expect(window.clearTimeout).toHaveBeenCalled();
  });
});
