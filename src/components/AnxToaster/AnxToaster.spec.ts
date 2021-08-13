import { mount } from "@vue/test-utils";
import { AnxToaster } from "@/components";

describe("AnxToast.vue", () => {
  it("mounts ", async () => {
    const wrapper = mount(AnxToaster);

    expect(wrapper.get(".anx-toaster").exists()).toBeTruthy();
  });

  it("validates valid positions", () => {
    const horizontalAlign = "center", verticalAlign = "bottom";

    const wrapper = mount(AnxToaster);

    // @ts-ignore
    expect(wrapper.vm.validateVerticalAlign(verticalAlign)).toMatch(verticalAlign);
    // @ts-ignore
    expect(wrapper.vm.validateHorizontalAlign(horizontalAlign)).toMatch(horizontalAlign);
  });

  it("validates invalid positions", () => {
    const horizontalAlign = "invalid_position", verticalAlign = "vertical_position";

    const wrapper = mount(AnxToaster);

    // @ts-ignore
    expect(wrapper.vm.validateVerticalAlign(verticalAlign)).toMatch("top");
    // @ts-ignore
    expect(wrapper.vm.validateHorizontalAlign(horizontalAlign)).toMatch("right");
  });

  it("adds toast via addToast method", () => {
    const message = "This is a test message";

    const wrapper = mount(AnxToaster);

    // @ts-ignore
    wrapper.vm.addToast({ message });

    const toast = wrapper.get(".anx-toast");
    expect(toast.exists()).toBeTruthy();
    expect(toast.text()).toMatch(message);
  });

  it("emits destroy event when all toasts are closed", async () => {
    const message = "This is a test message", animations = false;
    const wrapper = mount(AnxToaster);

    // Add two toasts toast
    // @ts-ignore
    wrapper.vm.addToast({ message, animations });
    // @ts-ignore
    wrapper.vm.addToast({ message, animations });
    let toast = wrapper.get(".anx-toast");
    expect(toast.exists()).toBeTruthy();

    // Close the first toast by clicking
    await toast.trigger('click');

    // Closing one toast, the toaster should not emit the destroy event
    expect(wrapper.emitted("destroy")).toBeFalsy();

    // Close the second toast by clicking
    toast = wrapper.get(".anx-toast");
    expect(toast.exists()).toBeTruthy();
    await toast.trigger('click');

    // After closing the second toast, the toaster should emit the destroy event
    expect(wrapper.emitted("destroy")).toBeTruthy();
  });

  it("appends toast on beginning when align top", () => {
    // TODO:
  });

  it("appends toast at the end when align is bottom", () => {
    // TODO:
  });
});
