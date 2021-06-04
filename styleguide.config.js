module.exports = {
  components: "src/components/**/[A-Z]*.vue",
  usageMode: "expand",
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.vue?$/, ".md");
  }
};
