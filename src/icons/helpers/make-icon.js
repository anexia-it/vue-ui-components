import Vue from "vue";
import { mergeData } from "vue-functional-data-merge";
import { kebab } from "./string-utils";

export const makeIcon = (name, content) => {
  const kebabName = kebab(name);
  const iconName = `AnxIcon${name}`;
  const iconNameClass = `anx-icon anx-icon-${kebabName}`;
  const svgContent = content;

  // Return the icon component definition
  return Vue.extend({
    name: iconName,
    functional: true,
    props: {
      // Props can be added here
    },
    render(h, { data, props }) {
      return h(
        "div",
        mergeData(data, {
          staticClass: iconNameClass,
          props: { ...props },
          attrs: {
            "aria-label": name,
            width: "100%",
            height: "100%"
          },
          domProps: { innerHTML: svgContent }
        })
      );
    }
  });
};
