module.exports = {
  components: "src/components/**/[A-Z]*.vue",
  usageMode: "expand",
  styleguideDir: "dist",
  getExampleFilename(componentPath) {
    // The .md files are stored separately in the /docs folder
    componentPath = componentPath.replace(/src\\components/, "docs"); // \ for windows
    componentPath = componentPath.replace(/src\/components/, "docs"); // / for linux
    return componentPath.replace(/\.vue?$/, ".md");
  }
};
