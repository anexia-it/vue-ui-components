module.exports = {
  components: "src/components/**/[A-Z]*.vue",
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.vue?$/, ".md");
  }
};
