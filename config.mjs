import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
import webpack from "webpack";
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/document.ejs",
    }),

    isRunningWebpack &&
      new webpack.DefinePlugin({
        title: JSON.stringify("custom title"),
      }),
  ].filter(Boolean),
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
  experiments: {
    css: true,
  },
};

if (isRunningRspack) {
  config.builtins = {
    define: {
      title: JSON.stringify("custom title"),
    },
  };
}

export default config;
