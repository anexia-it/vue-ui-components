import { mount } from "@vue/test-utils";
import { AnxToaster } from "@/components";

describe("AnxToast.vue", () => {
  it("mounts ", async () => {
    const wrapper = mount(AnxToaster);

    expect(wrapper.get(".anx-toaster").exists()).toBeTruthy();
  });
});
