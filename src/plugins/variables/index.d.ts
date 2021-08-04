import { PluginObject } from "vue";

// Declaration
declare module "vue/types/vue" {
  interface Vue {
    $anxVariables: Record<string, any>;
  }
}

export declare const AnxVariablesPlugin: PluginObject<{}>;
