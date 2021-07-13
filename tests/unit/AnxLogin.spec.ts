import { shallowMount, mount } from "@vue/test-utils";
import AnxLogin from "@/components/AnxLogin.vue";

describe("AnxLogin.vue", () => {
  it("renders component", () => {
    const wrapper = shallowMount(AnxLogin);

    expect(wrapper.get(".anx-login").exists()).toBeTruthy();
  });
});
