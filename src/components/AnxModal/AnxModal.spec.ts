import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import { AnxButton, AnxModal } from "@/components";
import { AnxModalPlugin } from '@/plugins';

describe("AnxModal.vue", () => {
  it("renders and destroys component correctly", () => {
    const wrapper = shallowMount(AnxModal);

    expect(wrapper.get("div.anx-modal").exists()).toBeTruthy();
    wrapper.destroy();
  });

  it("has correct properties", () => {
    const closeButtonAlign = "right",
      closeButtonText = "test close button",
      content = "this is some test content",
      id = "my_test_modal",
      size = "xxl",
      hasCloseButton = true,
      title = "test title of modal";
    const wrapper = shallowMount(AnxModal, {
      propsData: {
        closeButtonAlign,
        closeButtonText,
        id,
        size,
        hasCloseButton,
        title
      },
      slots: {
        default: content
      }
    });

    expect(wrapper.text()).toMatch(content);
    expect(wrapper.get("div.modal-title").text()).toMatch(title);
    expect(wrapper.attributes("id")).toMatch(id);
    expect(
      wrapper.get(".footer-content-" + closeButtonAlign).exists()
    ).toBeTruthy();
    expect(
      wrapper.get(".anx-modal.anx-modal-size-" + size).exists()
    ).toBeTruthy();

    const closeButtonComponent = wrapper.findComponent(AnxButton);
    expect(closeButtonComponent.exists()).toBeTruthy();
    expect(closeButtonComponent.attributes("text")).toMatch(closeButtonText);
  });

  it("renders without buttons", () => {
    const hasCloseButton = null,
      content = "This is a test content";
    const wrapper = shallowMount(AnxModal, {
      slots: {
        default: content
      },
      propsData: { hasCloseButton }
    });

    const closeButtonComponent = wrapper.findComponent(AnxButton);
    expect(closeButtonComponent.exists()).toBeFalsy();
  });

  it("emitts close event", async () => {
    const hasCloseButton = true,
      content = "This is a test content";
    const wrapper = mount(AnxModal, {
      slots: {
        default: content
      },
      propsData: { hasCloseButton }
    });

    const closeButtonComponent = wrapper.findComponent(AnxButton);
    expect(closeButtonComponent.exists()).toBeTruthy();

    await closeButtonComponent.trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("emitts close and confirm event", async () => {
    const hasCloseButton = true,
      confirm = true,
      content = "This is a test content";
    const wrapper = mount(AnxModal, {
      slots: {
        default: content
      },
      propsData: { hasCloseButton, confirm }
    });

    const buttons = wrapper.findAllComponents(AnxButton);

    // Check if events happen in the right order
    await buttons.at(0).trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
    await buttons.at(1).trigger("click");
    expect(wrapper.emitted("confirm")).toBeTruthy();
  });

  it("does not close on click inside the modal", async () => {
    const wrapper = mount(AnxModal);

    // Simulate a click on the modal body, the modal should not close
    await wrapper.get("div.anx-modal-body").trigger("click");
    expect(wrapper.emitted("close")).toBeFalsy();
  });

  it("closes on click outside of modal", async () => {
    const wrapper = mount(AnxModal);

    // Simulate a click outside the modal, the modal should close
    await wrapper.get("div.anx-modal").trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("handles multiple modals correctyl", async () => {
    const wrapper1 = mount(AnxModal);
    const wrapper2 = mount(AnxModal);

    // Wrapper1 is opened before Wrapper2, so no modal should be closed when clicking outside of wrapper1
    await wrapper1.get("div.anx-modal").trigger("click");
    expect(wrapper1.emitted("close")).toBeFalsy();
    expect(wrapper2.emitted("close")).toBeFalsy();

    // When clicking outside the top modal, it should be closed
    await wrapper2.get("div.anx-modal").trigger("click");
    expect(wrapper1.emitted("close")).toBeFalsy();
    expect(wrapper2.emitted("close")).toBeTruthy();

    // After the second wrapper has been destroyed, the underlaying modal should close on click
    wrapper2.destroy();
    await wrapper1.get("div.anx-modal").trigger("click");
    expect(wrapper1.emitted("close")).toBeTruthy();
    wrapper1.destroy();
  });

  it("mounts correctly via AnxModalPlugin", async () => {
    const testMessage = "This is a test"

    // Create a local vue instance and install the AnxModalPlugin
    const localVue = createLocalVue();
    localVue.use(AnxModalPlugin);

     // Create a simple body component, where the modal will be mounted
     const bodyComponent = {
      template: "<body></body>"
    };
    const wrapper = mount(bodyComponent, {
      localVue
    });

    // Check if the show function has been registered
    // @ts-ignore
    expect(wrapper.vm.$anxModal.show).toBeTruthy();

    // @ts-ignore
    const createdModal = wrapper.vm.$anxModal.show(testMessage);

    // Check if the modal component has been returned
    expect(createdModal).toBeTruthy();
  });
});
