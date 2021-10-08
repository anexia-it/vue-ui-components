import { PluginObject, Component as VueComponent } from "vue";

// Declaration
declare module "vue/types/vue" {
  interface Vue {
    $anxModal: {
      show: (
          title: string, 
          content: string,
          options?: {}) => VueComponent;
    };
  }
}

export declare const AnxModalPlugin: PluginObject<{}>;
