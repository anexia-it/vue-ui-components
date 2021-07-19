import { shallowMount } from "@vue/test-utils";
import { AnxLogin } from "@/components";

describe("AnxLogin.vue", () => {
  it("renders component", () => {
    const wrapper = shallowMount(AnxLogin);

    expect(wrapper.get(".anx-login").exists()).toBeTruthy();
  });
});
