import { createLocalVue, shallowMount } from "@vue/test-utils";
import { AnxLink } from "@/components";
import VueRouter from "vue-router";

const Url = require("url-parse");

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

  it("emitts click event", async () => {
    const wrapper = shallowMount(AnxLink);
    const linkComponent = wrapper.get("a.anx-link");

    await linkComponent.trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("has disabled functionality", async () => {
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

  it("opens internal url in same tab with vue router defined", async () => {
    // Setting up VueRouter
    const router = new VueRouter();

    // Mocking the VueRouter push function that should be used
    router.push = jest.fn();

    // Properties for AnxLink
    const href = "/test";

    // Create the wrapper
    const wrapper = createWrapperWithVueRouter({ href }, router);

    // Check if the link has been rendered
    const link = wrapper.get("a.anx-link");
    expect(link.exists()).toBeTruthy();

    // Click the link
    await link.trigger("click");
    await wrapper.vm.$nextTick();

    // Check if the url is correct and the router has pushed the user to the location
    expect(router.push).toHaveBeenCalledWith(href);
  });

  it("opens internal url in new tab with vue router defined", async () => {
    // Mocking the window.open function that will be used
    window.open = jest.fn();

    // Setting up VueRouter
    const router = new VueRouter();

    // Properties for AnxLink
    const href = "/test", newTab = true;

    // Create the wrapper
    const wrapper = createWrapperWithVueRouter({ href, newTab }, router);

    // Check if the link has been rendered
    const link = wrapper.get("a.anx-link");
    expect(link.exists()).toBeTruthy();

    // Click the link
    await link.trigger("click");
    await wrapper.vm.$nextTick();

    // Check if the url is correct and a new tab has been opened
    const expectedUrl = new Url(router.resolve(href).href).href;
    expect(window.open).toHaveBeenCalledWith(expectedUrl);
  });

  it("opens route with name in same tab when vue router is defined", async () => {
    // Setting up VueRouter
    const router = new VueRouter();

    // Mocking the VueRouter push function that should be used
    router.push = jest.fn();

    // Properties for AnxLink
    const routeName = "Test";

    // Create the wrapper
    const wrapper = createWrapperWithVueRouter({ routeName }, router);

    // Check if the link has been rendered
    const link = wrapper.get("a.anx-link");
    expect(link.exists()).toBeTruthy();

    // Click the link
    await link.trigger("click");
    await wrapper.vm.$nextTick();

    // Check if the url is correct and the router has pushed the user to the location
    expect(router.push).toHaveBeenCalledWith({ name: routeName });
  });

  it("opens route with name in new tab when vue router is defined", async () => {
    // Mocking the window.open function that will be used
    window.open = jest.fn();

    // Setting up routes
    const routes = [
      {
        name: 'Test',
        path: '/test'
      },
      {
        name: 'Home',
        path: '/'
      }
    ]

    // Setting up VueRouter
    const router = new VueRouter({ routes });

    // Properties for AnxLink
    const routeName = routes[0].name, newTab = true;

    // Create the wrapper
    const wrapper = createWrapperWithVueRouter({ routeName, newTab }, router)

    // Check if the link has been rendered
    const link = wrapper.get("a.anx-link");
    expect(link.exists()).toBeTruthy();

    // Click the link
    await link.trigger("click");
    await wrapper.vm.$nextTick();

    // Check if the url is correct and the router has pushed the user to the location
    const expectedUrl = new Url(router.resolve({ name: routes[0].name }).href).href;
    expect(window.open).toHaveBeenCalledWith(expectedUrl);
  });

  it("doesn't push when route name is current url", async () => {
    // Mocking the window.open function
    window.open = jest.fn();

    // Setting up routes
    const routes = [
      {
        name: 'Test',
        path: '/test'
      },
      {
        name: 'Home', // This is the default route
        path: '/'
      }
    ]

    // Setting up VueRouter
    const router = new VueRouter({ routes });

    // Mocking the VueRouter push function that should be used
    router.push = jest.fn();

    // Properties for AnxLink
    const routeName = routes[1].name;

    // Create the wrapper
    const wrapper = createWrapperWithVueRouter({ routeName }, router)

    // Check if the link has been rendered
    const link = wrapper.get("a.anx-link");
    expect(link.exists()).toBeTruthy();

    // Click the link
    await link.trigger("click");
    await wrapper.vm.$nextTick();

    // Neither push nor window.open should have been called
    expect(router.push).toHaveBeenCalledTimes(0);
    expect(window.open).toHaveBeenCalledTimes(0);
  });

  it("doesn't open url with same route as current window in current window when router is defined", async () => {
    // Mocking the window.open function
    window.open = jest.fn();

    // Setting up VueRouter
    const router = new VueRouter();

    // Mocking the VueRouter push function that should be used
    router.push = jest.fn();

    // Properties for AnxLink
    const href = window.location.href;

    // Create the wrapper
    const wrapper = createWrapperWithVueRouter({ href }, router)

    // Check if the link has been rendered
    const link = wrapper.get("a.anx-link");
    expect(link.exists()).toBeTruthy();

    // Click the link
    await link.trigger("click");
    await wrapper.vm.$nextTick();

    // Neither push nor window.open should have been called
    expect(router.push).toHaveBeenCalledTimes(0);
    expect(window.open).toHaveBeenCalledTimes(0);
  });

  it("opens url in new tab if href matches the current href when vue router is defined", async () => {
    // Mocking the window.open function
    window.open = jest.fn();

    // Setting up VueRouter
    const router = new VueRouter();

    // Mocking the VueRouter push function that should be used
    router.push = jest.fn();

    // Properties for AnxLink
    const href = window.location.href, newTab = true;

    // Create the wrapper
    const wrapper = createWrapperWithVueRouter({ href, newTab }, router)

    // Check if the link has been rendered
    const link = wrapper.get("a.anx-link");
    expect(link.exists()).toBeTruthy();

    // Click the link
    await link.trigger("click");
    await wrapper.vm.$nextTick();

    // Neither push nor window.open should have been called
    const expectedUrl = new Url(window.location.href).href;
    expect(window.open).toHaveBeenCalledWith(expectedUrl)
  });

  it("opens url in same tab if href includes hostname and is internal url when vue router is defined", async () => {
    // Setting up VueRouter
    const router = new VueRouter();

    // Mocking the VueRouter push function that should be used
    router.push = jest.fn();

    // Properties for AnxLink
    const href = new Url('/test').href

    // Create the wrapper
    const wrapper = createWrapperWithVueRouter({ href }, router)

    // Check if the link has been rendered
    const link = wrapper.get("a.anx-link");
    expect(link.exists()).toBeTruthy();

    // Click the link
    await link.trigger("click");
    await wrapper.vm.$nextTick();

    // Neither push nor window.open should have been called
    expect(router.push).toHaveBeenCalledWith('/test')
  });
});

function createWrapperWithVueRouter(propsData: {}, router: VueRouter | null = null) {
  // Setting up VueRouter in local vue
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  if (router === null) {
    router = new VueRouter();
  }

  // Create the AnxLink
  const wrapper = shallowMount(AnxLink, {
    propsData,
    localVue,
    router
  });

  return wrapper;
}
