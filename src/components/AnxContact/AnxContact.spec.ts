import { mount } from "@vue/test-utils";
import { AnxContact } from "@/components";
import flushPromises from "flush-promises";

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

  it("has correct validation", async () => {
    // TODO:
  });

  it("emits submit event with correct data", async () => {
    // This key is used for automated tesing
    // https://developers.google.com/recaptcha/docs/faq#id-like-to-run-automated-tests-with-recaptcha-v2-what-should-i-do
    const recaptchaSiteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
    const firstName = "Max", lastName = "Mustermann", email = "max@mustermann.at", phone = "0123456789", message = "This is a test";

    const wrapper = mount(AnxContact, {
      propsData: {
        showPhone: true,
        showEmail: true
      }
    });

    const firstNameInput = wrapper.get("#first_name");
    const lastNameInput = wrapper.get("#last_name");
    const emailInput = wrapper.get("#email");
    const phoneInput = wrapper.get("#phone");
    const messageInput = wrapper.get("#message");

    // Check if elements exist
    expect(firstNameInput.exists()).toBeTruthy();
    expect(lastNameInput.exists()).toBeTruthy();
    expect(emailInput.exists()).toBeTruthy();
    expect(phoneInput.exists()).toBeTruthy();
    expect(messageInput.exists()).toBeTruthy();

    // Type in values
    await firstNameInput.setValue(firstName);
    await lastNameInput.setValue(lastName);
    await emailInput.setValue(email);
    await phoneInput.setValue(phone);
    await messageInput.setValue(message);

    await wrapper.get("form").trigger("submit");
    await flushPromises();

    expect(wrapper.emitted("submit")).toBeTruthy();
    let submittedData = wrapper.emitted("submit");
    if (submittedData && submittedData[0][0]) {
      submittedData = submittedData[0][0];
      // @ts-ignore
      expect(submittedData.firstName).toMatch(firstName);
      // @ts-ignore
      expect(submittedData.lastName).toMatch(lastName);
      // @ts-ignore
      expect(submittedData.email).toMatch(email);
      // @ts-ignore
      expect(submittedData.phone).toMatch(phone);
      // @ts-ignore
      expect(submittedData.message).toMatch(message);
    }
  });
});
