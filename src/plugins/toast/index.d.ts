import { PluginObject, Component as VueComponent } from "vue";

// Declaration
declare module "vue/types/vue" {
  interface Vue {
    $anxToast: {
      show: (message: string, options?: {}) => VueComponent
      success: (message: string, options?: {}) => VueComponent
      warning: (message: string, options?: {}) => VueComponent
      error: (message: string, options?: {}) => VueComponent
    };
  }
}

export declare const AnxToastPlugin: PluginObject<{}>;
