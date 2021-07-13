import { shallowMount } from "@vue/test-utils";
import AnxCard from "@/components/AnxCard.vue";
import AnxParagraph from "@/components/AnxParagraph.vue";
import AnxLink from "@/components/AnxLink.vue";
import AnxIcon from "@/components/AnxIcon.vue";

describe("AnxCard.vue", () => {
  it("renders component", () => {
    const wrapper = shallowMount(AnxCard);

    expect(wrapper.get("div.anx-card").exists()).toBe(true);
  });

  it("has correct properties", () => {
    const link = "https://anexia.com";
    const linkText = "test_link";
    const title = "This is a test title";
    const icon = "anexia";
    const text = "This is a test text";
    const wrapper = shallowMount(AnxCard, {
      slots: {
        default: text
      },
      propsData: { link, linkText, title, icon }
    });

    const paragraphComponent = wrapper.findComponent(AnxParagraph);
    expect(paragraphComponent.exists()).toBe(true);
    expect(paragraphComponent.attributes("title")).toMatch(title);
    expect(paragraphComponent.text()).toMatch(text);

    const linkComponent = wrapper.findComponent(AnxLink);
    expect(linkComponent.exists()).toBe(true);
    expect(linkComponent.attributes("href")).toMatch(link);
    expect(linkComponent.text()).toMatch(linkText);

    const iconComponent = wrapper.findComponent(AnxIcon);
    expect(iconComponent.exists()).toBe(true);
    expect(iconComponent.attributes("icon")).toMatch(icon);
  });
});
