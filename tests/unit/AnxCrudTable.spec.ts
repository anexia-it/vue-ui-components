import { shallowMount } from "@vue/test-utils";
import { Posts } from "@/lib/models/test/Posts";
import AnxCrudTable from "@/components/AnxCrudTable.vue";
import AnxTable from "@/components/AnxTable.vue";

describe("AnxCrudTable.vue", () => {
  it("renders component", () => {
    const modelClass = Posts;
    const wrapper = shallowMount(AnxCrudTable, {
      propsData: { modelClass }
    });

    const tableComponent = wrapper.findComponent(AnxTable);
    expect(tableComponent.exists()).toBe(true);
  });
});