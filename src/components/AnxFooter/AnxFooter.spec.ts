import { shallowMount, mount } from "@vue/test-utils";
import { AnxFooter, AnxIcon, AnxLink, AnxHrLine } from "@/components";
import Vue from "vue";
import { AnxIconsPlugin } from "@/plugins";

beforeEach(() => {
  // For testing we have to install the AnxIconsPlugin manually
  Vue.use(AnxIconsPlugin);
});

describe("AnxFooter.vue", () => {
  it("renders component", () => {
    const wrapper = mount(AnxFooter);

    expect(wrapper.get("div.anx-footer").exists()).toBe(true);
  });

  it("has correct properties", () => {
    const companyName = "test company";
    const copyrightDateFrom = Math.floor(Math.random() * 1000);
    const icon = "anexia";
    const links = [{ link: "#test", text: "test" }];
    const marginTop = "10px";
    const showCopyrightDate = true;
    const width = "100px";
    const wrapper = shallowMount(AnxFooter, {
      propsData: {
        companyName,
        copyrightDateFrom,
        icon,
        links,
        marginTop,
        showCopyrightDate,
        width
      }
    });

    const footerText = wrapper.get("div.anx-footer-text");
    expect(footerText.text()).toContain(copyrightDateFrom);
    expect(footerText.text()).toContain(companyName);

    const iconComponent = wrapper.findComponent(AnxIcon);
    expect(iconComponent.exists()).toBe(true);
    expect(iconComponent.attributes("icon")).toMatch(icon);

    const linkComponent = wrapper.findComponent(AnxLink);
    expect(linkComponent.exists()).toBe(true);
    expect(linkComponent.attributes("href")).toMatch(links[0].link);
    expect(linkComponent.text()).toMatch(links[0].text);

    const hrLineComponent = wrapper.findComponent(AnxHrLine);
    expect(hrLineComponent.exists()).toBe(true);
    expect(hrLineComponent.attributes("margintop")).toMatch(marginTop);
  });

  it("fixes on body bottom when page is large", () => {
    // Simulate a large window
    // @ts-ignore
    window.innerHeight = 1000;

    const wrapper = mount(AnxFooter, {
      attachTo: document.body,
      propsData: {
        id: "anx-footer"
      }
    });

    const footer = wrapper.get("#anx-footer");
    expect(footer.exists()).toBeTruthy();
    expect(footer.classes("bottom")).toBeTruthy();

    wrapper.destroy();
  });

  it("does not fix on body bottom when page is small", () => {
    // Simulate a small
    // @ts-ignore
    window.innerHeight = 0;

    const wrapper = mount(AnxFooter, {
      attachTo: document.body,
      propsData: {
        id: "anx-footer"
      }
    });

    const footer = wrapper.get("#anx-footer");
    expect(footer.exists()).toBeTruthy();
    expect(footer.classes("bottom")).toBeFalsy();

    wrapper.destroy();
  });
});
