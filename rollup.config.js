import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import pkg from "./package.json";

export default [
  // ESM build to be used with webpack/rollup. (Should be used in nuxt too)
  {
    input: "src/index.ts",
    output: {
      format: "esm",
      file: pkg.module,
      sourcemap: true
    },
    plugins: [commonjs(), vue(), resolve(), typescript()]
  },
  // SSR build.
  {
    input: "src/index.ts",
    output: {
      format: "cjs",
      file: pkg.main,
      sourcemap: true,
      exports: "named"
    },
    plugins: [
      commonjs(),
      vue({ template: { optimizeSSR: true } }),
      resolve(),
      typescript()
    ]
  },
  // Browser build.
  {
    input: "src/index.ts",
    output: {
      format: "iife",
      file: pkg.unpkg,
      sourcemap: true,
      name: "AnxUiBrowser",
      exports: "named",
      compact: true
    },
    plugins: [commonjs(), vue(), resolve(), typescript()]
  }
];
