import { shallowMount } from "@vue/test-utils";
import AnxAlert from "@/components/AnxAlert.vue";

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
});
