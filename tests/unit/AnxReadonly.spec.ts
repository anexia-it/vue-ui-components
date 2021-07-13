import { shallowMount } from "@vue/test-utils";
import AnxReadonly from "@/components/AnxReadonly.vue";

// Mocking the createRange function
global.document.createRange = () => ({
  setStart: jest.fn,
  setEnd: jest.fn,
  // @ts-ignore
  commonAncestorContainer: {
    nodeName: "BODY",
    ownerDocument: document,
    baseURI: ""
  },
  selectNode: jest.fn
});

// Mocking the execCommand function
// @ts-ignore
global.document.execCommand = jest.fn;

// Mocking the getSelection function
global.window.getSelection = () => ({
  // @ts-ignore
  anchorNode: jest.fn,
  removeAllRanges: jest.fn,
  addRange: jest.fn
});

describe("AnxReadonly.vue", () => {
  it("renders component", () => {
    const name = "test_read_only";
    const message = "This is a test";
    const bold = true;
    const wrapper = shallowMount(AnxReadonly, {
      slots: {
        default: message
      },
      propsData: { name, bold }
    });

    expect(wrapper.attributes("id")).toMatch(name);
    expect(wrapper.text()).toMatch(message);
    expect(wrapper.get(".bold").exists()).toBeTruthy();
  });

  it("does not copy text if disabled", async () => {
    const message = "Text to be copied";
    const wrapper = shallowMount(AnxReadonly, {
      slots: {
        default: message
      }
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted("copied")).toBeFalsy();
  });

  it("copies text on click if defined", async () => {
    const message = "Text to be copied";
    const wrapper = shallowMount(AnxReadonly, {
      slots: {
        default: message
      },
      propsData: {
        copyOnClick: true
      }
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted("copied")).toBeTruthy();
  });

  it("copies text when called via function", () => {
    const message = "Text to be copied";
    const wrapper = shallowMount(AnxReadonly, {
      slots: {
        default: message
      },
      propsData: {
        copyOnClick: true
      }
    });

    // @ts-ignore
    wrapper.vm.copy();

    expect(wrapper.emitted("copied")).toBeTruthy();
  });

  it("does not copy if browser does not support copy", async () => {
    // This function will cause an error, because selectNode is not defined
    global.document.createRange = () => ({
      setStart: jest.fn,
      setEnd: jest.fn,
      //@ts-ignore
      commonAncestorContainer: {
        nodeName: "BODY",
        ownerDocument: document
      }
    });

    const message = "Text to be copied";
    const wrapper = shallowMount(AnxReadonly, {
      slots: {
        default: message
      },
      propsData: {
        copyOnClick: true
      }
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted("copied")).toBeFalsy();
  });
});
