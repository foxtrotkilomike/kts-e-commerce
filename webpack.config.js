const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const buildPath = path.resolve(__dirname, "dist");
const contentPath = path.resolve(__dirname, "public");
const srcPath = path.resolve(__dirname, "src");
const isProd = process.env.NODE_ENV === "production";

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : "style-loader",
    !withModules
      ? "css-loader"
      : {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: !isProd
                ? "[path][name]__[local]"
                : "[hash:base64]",
            },
          },
        },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["autoprefixer"],
        },
      },
    },
    "sass-loader",
  ];
};

module.exports = {
  entry: path.join(srcPath, "index.tsx"),
  target: !isProd ? "web" : "browserslist",
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  output: {
    path: buildPath,
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.svg$/i,
        oneOf: [
          {
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"]
          },
          {
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024
              },
            },
          },
        ],
      },
      {
        test: /\.(png|ttf|woff2?|jpe?g)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(contentPath, "index.html"),
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(contentPath, "favicon.svg"),
      favicons: {
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          favicons: true,
          windows: true,
          yandex: false,
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css'
    }),
    new TsCheckerPlugin(),
    !isProd && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  optimization: {
    moduleIds: "deterministic",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    alias: {
      "@assets": path.join(srcPath, 'assets'),
      "@components": path.join(srcPath, 'components'),
      "@context": path.join(srcPath, 'context'),
      "@customTypes": path.join(srcPath, 'types'),
      "@config": path.join(srcPath, 'config'),
      "@hooks": path.join(srcPath, 'hooks'),
      "@layouts": path.join(srcPath, 'layouts'),
      "@pages": path.join(srcPath, 'App/pages'),
      "@services": path.join(srcPath, 'services'),
      "@store": path.join(srcPath, 'store'),
      "@styles": path.join(srcPath, 'styles'),
      "@utils": path.join(srcPath, 'utils'),
    }
  },
  devServer: {
    host: '127.0.0.1',
    port: 9000,
    hot: true,
    historyApiFallback: true,
  }
};
