import { shallowMount } from "@vue/test-utils";
import AnxLink from "@/components/AnxLink.vue";

describe("AnxLink.vue", () => {
  it("renders component", () => {
    const wrapper = shallowMount(AnxLink);

    expect(wrapper.get("a.anx-link").exists()).toBe(true);
  });

  it("has correct properties", () => {
    const href = "#test",
      newTab = true,
      text = "Some link text",
      noStyle = true;
    const wrapper = shallowMount(AnxLink, {
      slots: {
        default: text
      },
      propsData: { href, newTab, noStyle }
    });
    const linkComponent = wrapper.get("a.anx-link");

    expect(wrapper.text()).toMatch(text);
    expect(linkComponent.attributes("target")).toMatch("_blank");
    expect(linkComponent.attributes("href")).toMatch(href);
    expect(linkComponent.classes("no-style")).toBe(true);
  });

  it("check for click event", async () => {
    const wrapper = shallowMount(AnxLink);
    const linkComponent = wrapper.get("a.anx-link");

    await linkComponent.trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("checks disabled functionality", async () => {
    const wrapper = shallowMount(AnxLink, {
      propsData: { disabled: true }
    });

    // Enabled link should not be rendered
    const enabledLink = wrapper.find("a.anx-link");
    expect(enabledLink.exists()).toBe(false);

    // Disabled link should be rendered
    const disabledLink = wrapper.get(".anx-link.disabled");
    expect(disabledLink.exists()).toBe(true);

    // No event should be emitted on click
    await disabledLink.trigger("click");
    expect(wrapper.emitted("click")).toBeFalsy();
  });
});
