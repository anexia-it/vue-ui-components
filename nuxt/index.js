// eslint-disable-next-line
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

  /** Add the components as plugin */
  this.addPlugin({
    src: resolve(__dirname, "ui-plugin.js"),
    fileName: join(namespace, "ui-plugin.js"),
    ssr: true,
    options
  });
}
module.exports.meta = require("../package.json");
