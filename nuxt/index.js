const { resolve, join } = require("path");

export default function(moduleOptions) {
  // get all options for the module
  const options = {
    ...moduleOptions,
    ...this.options.customCounter
  };

  // expose the namespace / set a default
  if (!options.namespace) options.namespace = "anx-ui";
  const { namespace } = options;

  /** Add the componenets as plugin */
  this.addPlugin({
    src: resolve(__dirname, "components-plugin.ts"),
    fileName: join(namespace, "components-plugin.ts"),
    options
  });
}
module.exports.meta = require("../package.json");
