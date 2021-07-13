import { shallowMount, mount } from "@vue/test-utils";
import AnxLink from "@/components/AnxLink.vue";
import AnxLanguageSwitcher from "@/components/AnxLanguageSwitcher.vue";
import VueI18n from "vue-i18n";
import Vue from "vue";

beforeAll(() => {
  Vue.use(VueI18n);
})

describe("AnxLanguageSwitcher.vue", () => {
  it("renders component", () => {
    // For this example we create a simple i18n instance
    const i18n = new VueI18n({
      locale: "en"
    });
    const wrapper = shallowMount(AnxLanguageSwitcher, {
      propsData: { i18n }
    });

    expect(wrapper.get("div.anx-language-switcher").exists()).toBe(true);
  });

  it("handles language change", async () => {
    // For this example we create a simple i18n instance
    const i18n = new VueI18n({
      locale: "en"
    });
    const wrapper = mount(AnxLanguageSwitcher, {
      propsData: { i18n }
    });
    
    // Locale is set to en and should be en without user interaction
    expect(i18n.locale).toMatch("en");

    // Change the locale to de
    const links = wrapper.findAllComponents(AnxLink)
    let germanLink = links.at(0);
    for (let i = 1; i < links.length; i++) {
      if (links.at(i).text() == "DE") {
        germanLink = links.at(i);
        break;
      }
    }
    await germanLink.trigger('click');
    
    expect(wrapper.emitted('localeChange')).toBeTruthy();
    expect(i18n.locale).toMatch('de');
  });
});
