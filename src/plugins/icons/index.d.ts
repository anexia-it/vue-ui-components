import Vue, { PluginObject } from "vue";

// Plugin
export declare const AnxIconsPlugin: PluginObject<{}>;
export declare const AnxIconsNames: Array<string>;

// Component: anx-icon
export declare class AnxIcon extends Vue {}

// Components: anx-icon-{icon-name}
export * from "./icons";
