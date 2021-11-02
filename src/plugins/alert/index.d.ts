import { PluginObject, Component as VueComponent } from "vue";

// Declaration
declare module "vue/types/vue" {
    interface Vue {
      $anxAlert: {
        show: (text: string, target?: string  , options?: {}) => VueComponent;
      };
    }
  }
  
  export declare const AnxAlertPlugin: PluginObject<{}>;
  