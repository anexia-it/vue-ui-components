// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  components: "src/components/**/[A-Z]*.vue",
  ignore: [
    "src/components/AnxTableCol/AnxTableCol.vue",
    "src/components/AnxTableContainer/AnxTableContainer.vue",
    "src/components/AnxTableRow/AnxTableRow.vue"
  ],
  usageMode: "expand",
  styleguideDir: "dist",
  copyCodeButton: true,
  require: [path.join(__dirname, "styleguide/global.requires.js")],
  renderRootJsx: path.join(__dirname, "styleguide/styleguide.root.js"),
  getExampleFilename(componentPath) {
    // The .md files are in the same folder as the .vue files
    return componentPath.replace(/[A-Za-z]*.vue?$/, "README.md");
  }
};
