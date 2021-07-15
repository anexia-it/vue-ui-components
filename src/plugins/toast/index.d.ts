import { PluginObject } from "vue"

// Declaration
declare module 'vue/types/vue' {
    interface Vue {
        $anxToast: Object
    }
}

export declare const AnxToastPlugin: PluginObject<{}>
