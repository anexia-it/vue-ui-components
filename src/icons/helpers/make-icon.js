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
      height: {
        type: String,
        default: "100%"
      },
      width: {
        type: String,
        default: "100%"
      },
      margin: {
        type: String,
        default: "0px"
      }
    },
    render(h, { data, props }) {
      return h(
        "div",
        mergeData(data, {
          staticClass: iconNameClass,
          props: { ...props },
          attrs: {
            "aria-label": iconName,
            style:
              (props.width ? `width: ${props.width};` : "") +
              (props.height ? ` height: ${props.height};` : "") +
              (props.margin ? `margin: ${props.margin};` : "")
          },
          domProps: { innerHTML: svgContent }
        })
      );
    }
  });
};
