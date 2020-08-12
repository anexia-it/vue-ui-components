import Vue from "vue";
import { mergeData } from "vue-functional-data-merge";
//import { pascalCase, trim } from "../utils/string";
//import { BIconBlank } from "./icons";
//import { commonIconProps } from "./helpers/icon-base";

// TODO: remove the unnecessary code if this file and check it again

export const AnxSecondIcon = Vue.extend({
  name: "AnxSecondIcon",
  functional: true,
  props: {
    icon: {
      type: String,
      default: null
    },
    //...commonIconProps,
    stacked: {
      type: Boolean,
      default: false
    }
  },
  render(h, { data, props, parent }) {
    //const icon = pascalCase(trim(props.icon || ""));
    const icon = props.icon;
    const iconName = `AnxIcon${icon}`;
    // If parent context exists, we check to see if the icon has been registered
    // Either locally in the parent component, or globally at the `$root` level
    // If not registered, we render a blank icon
    const components = ((parent || {}).$options || {}).components;
    const componentRefOrName =
      icon && components
        ? components[iconName] || "svg"
        : icon
        ? iconName
        : "svg";

    console.log("Components: ", components);
    console.log("icon: ", iconName);
    console.log("ref or name", componentRefOrName);
    console.log(components[iconName]);
    console.log("parent", parent.$options.comments);
    return h(
      componentRefOrName,
      mergeData(data, { props: { ...props, icon: null } })
    );
  }
});
