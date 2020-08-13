/* eslint-disable @typescript-eslint/no-var-requires */
console.log("Auto generating files for AnxIcons");

const fs = require("fs");
const path = require("path");
const sutils = require("./string-utils");
const __PATH__ = "src/icons/";
const __ICONS_PATH__ = "src/assets/icons/";

const fileTitle = `// --- BEGIN AUTO-GENERATED FILE ---
//
// This file is auto generated on each build. Do not edit this file!
// Run the necessary scripts defined in package.json to generate this file.\n\n`;

const fileFooter = `\n\n// --- END AUTO-GENERATED FILE ---\n`;

/** Generates the content for the plugins.js file */
function generatePluginsFileContent(icons) {
  let content = fileTitle;

  content += `import Vue from "vue";\n\nimport {\n`;

  icons.forEach(({ fullName }) => {
    content += `  ${fullName},\n`;
  });
  content = content.slice(0, -2);

  content += `\n} from "./icons";\n\n`;

  content += `export const AnxIconsNames = [\n`;

  icons.forEach(({ fullName }) => {
    content += `  "${fullName}",\n`;
  });
  content = content.slice(0, -2);

  content += `\n];\n\nexport const AnxIconsPlugin = {\n  install: function() {\n`;
  icons.forEach(({ fullName }) => {
    content += `    Vue.component("${fullName}", ${fullName});\n`;
  });
  content = content.slice(0, -2);
  content += `\n}\n};`;

  content += fileFooter;

  return content;
}

/** Generate the content for the icons.js file */
function generateIconsFile(icons) {
  let content = fileTitle;

  content += `import { makeIcon } from "./helpers/make-icon";\n\n`;

  icons.forEach(({ name, fullName, svg }) => {
    content += `export const ${fullName} = makeIcon(\n  "${name}",\n  "${svg}"\n);\n\n`;
  });
  content = content.slice(0, -2);

  content += fileFooter;

  return content;
}

/** Generates a file with the given content */
function generateFile(name, content) {
  fs.writeFile(path.join(__PATH__, name), content, () => {
    console.log(`Generated ${name}`);
  });
}

/** Get all the names of the icons from the files located in de icons folder */
fs.readdir(__ICONS_PATH__, (err, files) => {
  if (err) {
    console.error("Error reading icon files directory!");
    console.error(err);
  } else {
    const icons = [];
    files.forEach(file => {
      /** Camelize the file name */
      let name = sutils.camelize(file);

      /** Check if the file is svg */
      const fileType = name.split(".")[1];
      if (fileType === "svg") {
        /** Remove the file extension */
        name = name.split(".")[0];

        /** Add the AnxIcon prefix */
        const fullName = "AnxIcon" + name;

        /** Read the svg content from the file and replace new lines and quotation marks*/
        let svg = fs.readFileSync(__ICONS_PATH__ + file, "utf8");
        svg = sutils.removeNewLines(svg);
        svg = sutils.replaceQuotationMarks(svg);
        svg = sutils.replaceWidthAndHeightForSvg(svg); // Replace the width and height to 100%

        /** Add the original and modified file names to the array */
        icons.push({
          original: file,
          fullName: fullName,
          name: name,
          svg: svg
        });
      }
    });

    /** Generate the plugins.js file */
    const pluginsJsFile = generatePluginsFileContent(icons);
    generateFile("plugin.js", pluginsJsFile);

    /** Generate the icons.js file */
    const iconsJsFile = generateIconsFile(icons);
    generateFile("icons.js", iconsJsFile);
  }
});
