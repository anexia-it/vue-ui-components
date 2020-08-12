import Vue from "vue";
import { mergeData } from "vue-functional-data-merge";

// TODO: remove the unnecessary code if this file and check it again

export const makeIcon = (name, content) => {
  console.log("in make icon");
  // For performance reason we pre-compute some values, so that
  // they are not computed on each render of the icon component
  const kebabName = name; // TODO implmenet kebap function
  const iconName = `AnxIcon${name}`;
  const iconNameClass = `anx-icon-${kebabName}`;
  const svgContent = content;
  console.log("iconName:", iconName)
  // Return the icon component definition
  return /*#__PURE__*/ Vue.extend({
    name: iconName,
    functional: true,
    props: {
      //...commonIconProps,
      stacked: {
        type: Boolean,
        default: false
      }
    },
    render(h, { data, props }) {
      return h(
        "svg",
        mergeData(data, {
          staticClass: iconNameClass,
          props: { ...props, content: svgContent },
          attrs: { "aria-label": kebabName.replace(/-/g, " ") },
          domProps: { innerHTML: svgContent }
        })
      );
    }
  });
};
