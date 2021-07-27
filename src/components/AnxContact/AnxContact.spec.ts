import { mount } from "@vue/test-utils";
import { AnxContact } from "@/components";

describe("AnxContact.vue", () => {
  it("renders component", () => {
    const text = "This is a test contact component";
    const wrapper = mount(AnxContact, {
      slots: {
        default: text
      }
    });

    expect(wrapper.text()).toMatch(text);
  });

  it("displays error message on change", async () => {
    jest.useFakeTimers();

    const error = "This is a test";
    const wrapper = mount(AnxContact);

    const errorAlert = wrapper.get(".anx-alert-error");
    expect(errorAlert.exists()).toBeTruthy();
    expect(errorAlert.classes("hidden")).toBeTruthy();

    // Change the error message
    wrapper.setProps({ error });
    await wrapper.vm.$nextTick();
    // Use fake timers to bypass alert animation
    jest.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();

    expect(errorAlert.text()).toContain(error);
    expect(errorAlert.classes("hidden")).toBeFalsy();
  });

  it("displays success message on change", async () => {
    jest.useFakeTimers();

    const success = "This is a test";
    const wrapper = mount(AnxContact);

    const errorAlert = wrapper.get(".anx-alert-success");
    expect(errorAlert.exists()).toBeTruthy();
    expect(errorAlert.classes("hidden")).toBeTruthy();

    // Change the error message
    wrapper.setProps({ success });
    await wrapper.vm.$nextTick();
    // Use fake timers to bypass alert animation
    jest.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();

    expect(errorAlert.text()).toContain(success);
    expect(errorAlert.classes("hidden")).toBeFalsy();
  });
});
