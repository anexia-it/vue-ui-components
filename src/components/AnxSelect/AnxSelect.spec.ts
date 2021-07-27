import { createLocalVue, mount } from "@vue/test-utils";
import { AnxParagraph, AnxSelect } from "@/components";
import VeeValidate from "vee-validate";

describe("AnxSelect.vue", () => {
  it("renders component", () => {
    const options = [
      { value: 0, text: "0" },
      { value: 1, text: "1" }
    ];
    const wrapper = mount(AnxSelect, {
      propsData: { options }
    });

    expect(wrapper.get("div.anx-select").exists()).toBeTruthy();
  });

  it("shows and hides options on click", async () => {
    const options = [
      { value: 0, text: "0" },
      { value: 1, text: "1" }
    ];
    const wrapper = mount(AnxSelect, {
      propsData: { options }
    });

    const selectDiv = wrapper.get("div.anx-select");
    const selectOptions = wrapper.get(".anx-select-options");
    expect(selectDiv.exists()).toBeTruthy();
    expect(selectOptions.exists()).toBeTruthy();

    expect(selectOptions.classes("show")).toBeFalsy();

    // Show options on first click
    await selectDiv.trigger("click");
    await wrapper.vm.$nextTick();
    expect(selectOptions.classes("show")).toBeTruthy();

    // Hide on second click
    await selectDiv.trigger("click");
    await wrapper.vm.$nextTick();
    expect(selectOptions.classes("show")).toBeFalsy();
  });

  it("closes on click outside of select", async () => {
    const options = [
      { value: 0, text: "0" },
      { value: 1, text: "1" }
    ];
    const wrapper = mount(AnxSelect, {
      propsData: { options },
      attachTo: document.body // Attach to document to test event listeners
    });

    // Mounting some second element and attach it to the DOM to trigger click outside of the select
    const paragraphWrapper = mount(AnxParagraph, {
      slots: {
        default: "This is a test"
      },
      attachTo: document.body
    });

    const selectDiv = wrapper.get("div.anx-select");
    const selectOptions = wrapper.get(".anx-select-options");
    expect(selectDiv.exists()).toBeTruthy();
    expect(selectOptions.exists()).toBeTruthy();
    expect(selectOptions.classes("show")).toBeFalsy();

    // Show options on first click
    await selectDiv.trigger("click");
    await wrapper.vm.$nextTick();
    expect(selectOptions.classes("show")).toBeTruthy();

    // Click outside of the select
    await paragraphWrapper.trigger("click");
    await wrapper.vm.$nextTick();
    expect(selectOptions.classes("show")).toBeFalsy();

    // We have to destroy the elements because we attached them to the DOM
    wrapper.destroy();
    paragraphWrapper.destroy();
  });

  it("emits event on selection change", async () => {
    const options = [
      { value: "null", text: "Select something" },
      { value: "first", text: "first" },
      { value: "second", text: "second" }
    ];
    const wrapper = mount(AnxSelect, {
      propsData: { options }
    });

    const selectDiv = wrapper.get("div.anx-select");
    const selectOptions = wrapper.get(".anx-select-options");
    expect(selectDiv.exists()).toBeTruthy();
    expect(selectOptions.exists()).toBeTruthy();

    expect(selectOptions.classes("show")).toBeFalsy();

    // Show options
    await selectDiv.trigger("click");
    await wrapper.vm.$nextTick();
    expect(selectOptions.classes("show")).toBeTruthy();

    // Get the clickable options
    const clickableOptions = wrapper.get(".anx-select-options").findAll("li");
    expect(clickableOptions.exists()).toBeTruthy();
    expect(clickableOptions.at(0).classes("active")).toBeTruthy();
    expect(clickableOptions.length).toBe(options.length);

    // Select the second option
    await clickableOptions.at(1).trigger("click");
    await wrapper.vm.$nextTick();
    expect(clickableOptions.at(1).classes("active")).toBeTruthy();

    // Check if the correct options has been emitted
    const emittedEvent = wrapper.emitted().input;
    expect(emittedEvent).toBeTruthy();
    if (emittedEvent) {
      expect(emittedEvent[0]).toEqual([options[1].value]);
    }

    // Options should be hidden now
    expect(selectOptions.classes("show")).toBeFalsy();
  });

  it("has validation", async () => {
    const localVue = createLocalVue();
    localVue.use(VeeValidate);

    const options = [
      { value: "null", text: "Select something" },
      { value: "first", text: "first" },
      { value: "second", text: "second" }
    ];
    const wrapper = mount(AnxSelect, {
      propsData: { 
        options,
        validation: true
      },
      localVue
    });

    const selectDiv = wrapper.get("div.anx-select");
    const selectOptions = wrapper.get(".anx-select-options");
    expect(selectDiv.exists()).toBeTruthy();
    expect(selectOptions.exists()).toBeTruthy();

    expect(selectOptions.classes("show")).toBeFalsy();

    // Show options
    await selectDiv.trigger("click");
    await wrapper.vm.$nextTick();
    expect(selectOptions.classes("show")).toBeTruthy();

    // Get the clickable options
    const clickableOptions = wrapper.get(".anx-select-options").findAll("li");
    expect(clickableOptions.exists()).toBeTruthy();
    expect(clickableOptions.at(0).classes("active")).toBeTruthy();
    expect(clickableOptions.length).toBe(options.length);

    // Select the second option
    await clickableOptions.at(1).trigger("click");
    await wrapper.vm.$nextTick();
    expect(clickableOptions.at(1).classes("active")).toBeTruthy();
    expect(selectOptions.classes("show")).toBeFalsy();

    // There should no validation error be shown
    let error = wrapper.find(".anx-select-error");
    expect(error.exists()).toBeFalsy();
    expect(selectDiv.classes("is_invalid")).toBeFalsy();

    // Show options and click the first (invalid) option
    await selectDiv.trigger("click");
    await wrapper.vm.$nextTick();
    expect(selectOptions.classes("show")).toBeTruthy();
    await clickableOptions.at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(selectOptions.classes("show")).toBeFalsy();

    // Now there should be an error because the validation rule is required
    error = wrapper.find(".anx-select-error");
    expect(error.exists()).toBeTruthy();
    expect(selectDiv.classes("is_invalid")).toBeTruthy();
  });

  it("handles resize", () => {
    jest.useFakeTimers();

    const options = [
      { value: 0, text: "0" },
      { value: 1, text: "1" }
    ];
    const wrapper = mount(AnxSelect, {
      propsData: { options }
    });

    jest.advanceTimersByTime(1000);
    expect(wrapper.get("div.anx-select").exists()).toBeTruthy();
  })
});
