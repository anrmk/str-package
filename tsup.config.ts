import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "providers/bybit/index": "src/providers/bybit/index.ts",
    "types/index": "src/types/index.ts",
    "types/bybit/index": "src/types/bybit/index.ts",
    "types/challenge/index": "src/types/challenge/index.ts",
    "utils/bybitHelper": "src/utils/bybitHelper.ts",
    "utils/challengeHelper": "src/utils/challengeHelper.ts",
    "utils/helper": "src/utils/helper.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  treeshake: true,
  outDir: "dist",
});
