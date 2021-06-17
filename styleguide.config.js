// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  components: "src/components/**/[A-Z]*.vue",
  usageMode: "expand",
  styleguideDir: "dist",
  skipComponentsWithoutExample: true,
  copyCodeButton: true,
  require: [path.join(__dirname, "styleguide/global.requires.js")],
  renderRootJsx: path.join(__dirname, "styleguide/styleguide.root.js"),
  getExampleFilename(componentPath) {
    // The .md files are stored separately in the /docs folder
    componentPath = componentPath.replace(/src\\components/, "docs"); // \ for windows
    componentPath = componentPath.replace(/src\/components/, "docs"); // / for linux
    return componentPath.replace(/\.vue?$/, ".md");
  }
};
