// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pjson = require("./package.json");
const moduleVersion = pjson.version;

module.exports = {
  usageMode: "expand",
  exampleMode: "expand",
  styleguideDir: "dist",
  copyCodeButton: true,
  require: [path.join(__dirname, "styleguide/global.requires.js")],
  renderRootJsx: path.join(__dirname, "styleguide/styleguide.root.js"),
  getExampleFilename(componentPath) {
    // The .md files are in the same folder as the .vue files
    return componentPath.replace(/[A-Za-z]*.vue?$/, "README.md");
  },
  template: {
    lang: "en",
    favicon: "styleguide/favicon.png"
  },
  title: "ANEXIA Vue UI Components",
  version: moduleVersion,
  pagePerSection: true,
  tocMode: "collapse",
  sections: [
    {
      name: "Documentation",
      content: "docs/index.md",
      sections: [
        {
          name: "Installation",
          content: "docs/installation/index.md",
          sections: [
            {
              name: "Vue",
              content: "docs/installation/vue.md"
            },
            {
              name: "Nuxt",
              content: "docs/installation/nuxt.md"
            },
            {
              name: "Web",
              content: "docs/installation/web.md"
            }
          ]
        },
        {
          name: "Plugins",
          content: "docs/plugins.md"
        }
      ]
    },
    {
      name: "Components",
      components: "src/components/**/[A-Z]*.vue",
      ignore: [
        "src/components/AnxTableCol/AnxTableCol.vue",
        "src/components/AnxTableContainer/AnxTableContainer.vue",
        "src/components/AnxTableRow/AnxTableRow.vue"
      ]
    },
    {
      name: "Changelog"
    }
  ]
};
