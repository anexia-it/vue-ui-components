module.exports = {
  devServer: {
    // port: 80,
    proxy: {
      "/api": {
        target: "https://jsonplaceholder.typicode.com",
        ws: true,
        changeOrigin: true,
        pathRewrite: (path, req) => {
          return path.replace("api/", "");
        }
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  },
  css: {
    extract: true
  },
  chainWebpack: config => {
    config.optimization.minimizer("terser").tap(args => {
      const { terserOptions } = args[0];
      terserOptions.keep_classnames = true;
      terserOptions.keep_fnames = true;
      return args;
    });
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .options({
        fix: true
      });
  }
};
