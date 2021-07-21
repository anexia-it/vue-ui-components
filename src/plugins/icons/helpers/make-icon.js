import Vue from "vue";
import { mergeData } from "vue-functional-data-merge";
import { kebab } from "./string-utils";
import { parse } from "node-html-parser";

export const makeIcon = (name, content) => {
  const kebabName = kebab(name);
  const iconName = `AnxIcon${name}`;
  const iconNameClass = `anx-icon anx-icon-${kebabName}`;

  /** Parse the raw html and get the parsed <svg> element */
  let svgNodeElement = parse(content);
  while (svgNodeElement.tagName != "SVG") {
    svgNodeElement = svgNodeElement.childNodes[0];
  }

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
      },
      title: {
        type: String,
        default: iconName
      }
    },
    render(h, { data, props }) {
      /** Render all the child components of the svg elemnt as vue components */
      const svgChildComponents = [];
      svgNodeElement.childNodes.forEach(child => {
        svgChildComponents.push(
          h(child.rawTagName, {
            attrs: child.attributes,
            domProps: {
              innerHTML: child.innerHTML
            }
          })
        );
      });

      /** Render a component for the title and bind the title property to it */
      svgChildComponents.push(h("title", props.title));

      /**
       * This function renders a <div> with the defined properties as elemnt attributes
       * It also renders a <svg> as child element of the div with all the options of the raw svg elemnt
       * Then it renders all the child components for the svg element
       */
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
          }
        }),
        [
          h(
            "svg",
            {
              attrs: svgNodeElement.attributes
            },
            svgChildComponents
          )
        ]
      );
    }
  });
};
