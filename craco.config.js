/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const CracoLessPlugin = require("craco-less");
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        // lessLoaderOptions: {
        //   lessOptions: {
        // modifyVars: { '@primary-color': '#1DA57A' },
        // javascriptEnabled: true,
        //   },
        // },
      },
    },
  ],
  webpack: {
    alias: {
      "@": resolve("src")
    },
    configure: (webpackConfig, {env}) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: env === "production" ? "/music-app": "/"
      };
      return webpackConfig;
    }
  }
};