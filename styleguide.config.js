module.exports = {
  components: "src/components/**/[A-Z]*.vue",
  usageMode: "expand",
  styleguideDir: "dist",
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.vue?$/, ".md");
  }
};
