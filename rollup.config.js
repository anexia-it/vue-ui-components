import vue from "rollup-plugin-vue";
import buble from "rollup-plugin-buble";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import css from "rollup-plugin-css-only";
import minimist from "minimist";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import assetUrlResolver from "rollup-plugin-asset-url";

const argv = minimist(process.argv.slice(2));

/** This is the base configuration. Note that this configuration will be overriden from the settings for the different transpile targets (Module, Unpkg, ...) */
const baseConfig = {
  input: "src/index.ts",
  plugins: {
    /** The following plugins will be added before the vue plugin */
    preVue: [commonjs()],
    /** These are some properties for the vue plugin */
    vue: {
      css: true,
      template: {
        isProduction: true
      }
    },
    /** The following plugins will be added after the vue plugin */
    postVue: [
      typescript({
        typescript: require("typescript")
      }),
      // TODO: this doesn't work as it should because images are being rendered dynamically
      // TODO: ../assets/ has to be replaced with ../src/assets
      assetUrlResolver({
        limit: 10 * 1024, // Limit for assets to 10KB
        fileName: "[name][extname]",
        output: "./static/",
        reserveImportInJs: false
      }),
      buble({
        transforms: {
          asyncAwait: false,
          dangerousForOf: true
        }
      })
    ]
  }
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === "es") {
  const esConfig = {
    ...baseConfig,
    output: {
      file: pkg.module,
      format: "esm",
      exports: "named",
      sourcemap: true
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      css({
        output: pkg.style
      }),
      vue({
        ...baseConfig.plugins.vue
      }),
      ...baseConfig.plugins.postVue,
      terser({
        output: {
          ecma: 6
        }
      }),
      resolve()
    ]
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === "cjs") {
  const umdConfig = {
    ...baseConfig,
    output: {
      compact: true,
      file: pkg.main,
      format: "cjs",
      name: "AnxUi",
      exports: "named",
      sourcemap: true
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      css({
        output: pkg.style
      }),
      vue({
        ...baseConfig.plugins.vue,
        template: {
          ...baseConfig.plugins.vue.template,
          optimizeSSR: true
        },
        css: false
      }),
      ...baseConfig.plugins.postVue,
      resolve()
    ]
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === "iife") {
  const unpkgConfig = {
    ...baseConfig,
    output: {
      compact: true,
      file: pkg.unpkg,
      format: "iife",
      name: "AnxUi",
      exports: "named",
      sourcemap: true
    },
    plugins: [
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      terser({
        output: {
          ecma: 5
        }
      }),
      resolve()
    ]
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
