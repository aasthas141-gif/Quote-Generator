// Single-file build (JS, CSS and fonts inlined) for hosting as one HTML page.
import { mergeConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

import base from "./vite.config";

export default mergeConfig(base, {
  plugins: [viteSingleFile()],
  build: { outDir: "dist-single" },
});
