import {Configuration, DefinePlugin, webpack} from "webpack";

import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";
import {ESBuildMinifyPlugin} from "esbuild-loader";
import NodemonPlugin from "nodemon-webpack-plugin";

import nodeExternals from "webpack-node-externals";

import path from "node:path";

class Server {
  context: string;

  constructor() {
    this.context = process.cwd();
  }

  common(): Configuration {
    const tsconfigPathsPlugin = new TsconfigPathsPlugin();

    return {
      target: "node",
      entry: path.join(this.context, "source", "index.ts"),
      output: {
        path: path.join(this.context, "dist"),
        libraryTarget: "commonjs"
      },
      resolve: {
        extensions: [".ts", ".js", ".json"],
        plugins: [tsconfigPathsPlugin]
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            loader: "esbuild-loader",
            exclude: [
              /node_modules/
            ],
            options: {
              loader: "ts",
              target: "es2015"
            }
          }
        ]
      },
      externalsPresets: {
        node: true
      },
      externals: [
        nodeExternals({
          modulesFromFile: true
        })
      ]
    };
  }

  build() {
    const config = this.common();

    config.mode = "production";

    const esBuildMinifyPlugin = new ESBuildMinifyPlugin({
      target: "es2015",
      platform: "node",
      loader: "ts"
    });

    config.optimization = {
      minimize: true,
      minimizer: [
        esBuildMinifyPlugin
      ]
    };

    const definePlugin = new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    });

    config.plugins = [
      definePlugin
    ];

    return webpack(config, (err, stats) => {
      if (err) {
        return console.error(err);
      }

      console.log(stats?.toString({
        colors: true
      }));
    });
  }

  watch() {
    const config = this.common();

    config.mode = "development";
    config.watch = true;
    config.watchOptions = {
      ignored: /node_modules/
    };

    const definePlugin = new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    });
    const nodemonPlugin = new NodemonPlugin({
      script: path.join(this.context, "build", "main.js")
    });

    config.plugins = [
      definePlugin,
      nodemonPlugin,
    ];

    return webpack(config, (err, stats) => {
      if (err) {
        return console.error(err);
      }

      console.log(stats?.toString({
        colors: true
      }));
    });
  }
}

export default Server;