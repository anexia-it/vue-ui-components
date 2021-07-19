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
});
