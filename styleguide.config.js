module.exports = {
  components: "src/components/**/[A-Z]*.vue",
  usageMode: "expand",
  styleguideDir: "dist",
  getExampleFilename(componentPath) {
    // The .md files are stored separately in the /docs folder
    componentPath = componentPath.replace(/src\\components/, "docs");
    componentPath = componentPath.replace(/src\/components/, "docs");
    return componentPath.replace(/\.vue?$/, ".md");
  }
};
