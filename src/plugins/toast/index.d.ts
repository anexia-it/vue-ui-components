import { PluginObject } from "vue";

// Declaration
declare module "vue/types/vue" {
  interface Vue {
    $anxToast: Record<string, any>;
  }
}

export declare const AnxToastPlugin: PluginObject<{}>;
