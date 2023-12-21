import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import rspack from "@rspack/core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
import webpack from "webpack";
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

const outDir = isRunningWebpack
  ? path.resolve(__dirname, "webpack-dist")
  : path.resolve(__dirname, "rspack-dist");

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  entry: {
    main: "./src/index",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/document.ejs",
    }),
  ],
  optimization: {},
  output: {
    clean: true,
    path: outDir,
    filename: "[name].js",
  },
  experiments: {
    css: false,
    ...(isRunningRspack && {
      rspackFuture: { disableTransformByDefault: true, newResolver: true },
    }),
  },
};

export default config;
