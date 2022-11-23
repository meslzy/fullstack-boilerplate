import {build, createServer, preview, InlineConfig} from "vite"

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

class Client {
  context: string;

  constructor() {
    this.context = process.cwd();
  }

  common(): InlineConfig {
    return {
      root: this.context,
      plugins: [
        react(),
        tsconfigPaths(),
      ],
      build: {
        outDir: "dist",
      },
      server: {
        port: 3000,
      },
    };
  };

  build() {
    const config = this.common();

    return build(config);
  };

  watch() {
    const config = this.common();

    createServer(config).then((server) => {
      server.listen().then(() => {
        server.printUrls();
      });
    });
  };

  preview() {
    const config = this.common();

    return preview(config).then((server) => {
      server.printUrls();
    });
  };
}

export default Client;
