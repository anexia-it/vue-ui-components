import { shallowMount } from "@vue/test-utils";
import AnxFooter from "@/components/AnxFooter.vue";
import AnxIcon from "@/components/AnxIcon.vue";
import AnxLink from "@/components/AnxLink.vue";
import AnxHrLine from "@/components/AnxHrLine.vue";

describe("AnxFooter.vue", () => {
  it("renders component", () => {
    const wrapper = shallowMount(AnxFooter);

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
      propsData: { companyName, copyrightDateFrom, icon, links, marginTop, showCopyrightDate, width }
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
  })
});
