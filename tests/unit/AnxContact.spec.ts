import { shallowMount } from "@vue/test-utils";
import AnxContact from "@/components/AnxContact.vue";

describe("AnxContact.vue", () => {
  it("renders component", () => {
    const text = "This is a test contact component";
    const wrapper = shallowMount(AnxContact, {
      slots: {
        default: text
      }
    });

    expect(wrapper.text()).toMatch(text);
  });
});
