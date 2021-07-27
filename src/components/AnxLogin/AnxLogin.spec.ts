import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { AnxAlert, AnxLogin } from "@/components";
import { AnxIconsPlugin } from "@/plugins";
import Vue from "vue";
import VeeValidate from "vee-validate";
import flushPromises from "flush-promises";

beforeEach(() => {
  // For testing we have to install the AnxIconsPlugin manually
  Vue.use(AnxIconsPlugin);
});

describe("AnxLogin.vue", () => {
  it("renders component", () => {
    const wrapper = mount(AnxLogin);

    expect(wrapper.get(".anx-login").exists()).toBeTruthy();
  });

  it("displays login error on error messsage change", async () => {
    const loginError = "This is a test error";

    const wrapper = shallowMount(AnxLogin);

    // Initially, there should not be an error
    let errorAlert = wrapper.findComponent(AnxAlert);
    expect(errorAlert.exists()).toBeFalsy();

    // After changing the error, it should be displayed
    await wrapper.setProps({ loginError });
    errorAlert = wrapper.findComponent(AnxAlert);
    expect(errorAlert.exists()).toBeTruthy();
    expect(errorAlert.attributes("type")).toMatch("error");
    expect(errorAlert.text()).toMatch(loginError);

    // When unseting the loginError, the error alert should not be displayed anymore
    await wrapper.setProps({ loginError: null });
    errorAlert = wrapper.findComponent(AnxAlert);
    expect(errorAlert.exists()).toBeFalsy();
  });

  it("does not emit login event when no data is entered", async () => {
    // Use localVue to inject VeeValidate
    const localVue = createLocalVue();
    localVue.use(VeeValidate);

    const wrapper = mount(AnxLogin, {
      localVue
    });

    const loginButton = wrapper.get(".login-button");
    expect(loginButton.exists()).toBeTruthy();

    // Try to login without credentials
    await loginButton.trigger("click");
    await wrapper.get("form").trigger("submit");
    await flushPromises();

    // No login event should have been emitted
    expect(wrapper.emitted("login")).toBeFalsy();

    // The validation error should be shown
    expect(wrapper.get("#username-input").classes("is-invalid")).toBeTruthy();
    expect(wrapper.get("#password-input").classes("is-invalid")).toBeTruthy();
  });

  it("emits login event with data when submitted", async () => {
    // Credentials
    const username = "testuser",
      password = "admin";

    // Use localVue to inject VeeValidate
    const localVue = createLocalVue();
    localVue.use(VeeValidate);

    const wrapper = mount(AnxLogin, {
      propsData: {
        rememberMe: true
      },
      localVue
    });

    const loginButton = wrapper.get(".login-button");
    const usernameInput = wrapper.get("#username-input");
    const passwordInput = wrapper.get("#password-input");
    const rememberMeCheckbox = wrapper.get("#remember-me-checkbox");
    expect(loginButton.exists()).toBeTruthy();
    expect(usernameInput.exists()).toBeTruthy();
    expect(passwordInput.exists()).toBeTruthy();
    expect(rememberMeCheckbox.exists()).toBeTruthy();

    // Enter crednetials
    await usernameInput.setValue(username);
    await passwordInput.setValue(password);
    await rememberMeCheckbox.setChecked();

    // Submit the form
    await loginButton.trigger("click");
    await wrapper.get("form").trigger("submit");

    // Note: AnxForm uses asynchronoues checkValidation function, so we have to flushPromieses before we can go on.
    // Otherwise, the event won't be detected as emitted
    await flushPromises();

    // The login event should have been emitted with the correct data
    const loginEvent = wrapper.emitted().login;
    expect(loginEvent).toBeTruthy();
    if (loginEvent) {
      expect(loginEvent[0][0]).toEqual({
        username,
        password,
        rememberMe: true
      });
    }

    // The validation error should be shown
    expect(usernameInput.classes("is-invalid")).toBeFalsy();
    expect(passwordInput.classes("is-invalid")).toBeFalsy();
  });

  it("generates default remember me text if enabled", async () => {
    const wrapper = mount(AnxLogin, {
      propsData: {
        rememberMe: true
      }
    });

    const rememberMeCheckbox = wrapper.get(".anx-checkbox");
    expect(rememberMeCheckbox.exists()).toBeTruthy();
    expect(rememberMeCheckbox.text()).toMatch("Remember me");
  });

  it("uses custom remeber me text if defined", async () => {
    const rememberMeText = "This is some test remember me text";

    const wrapper = mount(AnxLogin, {
      propsData: {
        rememberMe: rememberMeText
      }
    });

    const rememberMeCheckbox = wrapper.get(".anx-checkbox");
    expect(rememberMeCheckbox.exists()).toBeTruthy();
    expect(rememberMeCheckbox.text()).toMatch(rememberMeText);
  });
});
