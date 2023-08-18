import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import stripCode from "rollup-plugin-strip-code";
import alias from "@rollup/plugin-alias";

export default [
  {
    input: "src/index.ts",
    plugins: [
      stripCode({
        start_comment: "REMOVE_CJS_BUNDLE_START",
        end_comment: "REMOVE_CJS_BUNDLE_END",
      }),
      esbuild(),
    ],
    output: {
      file: `dist/index.cjs`,
      format: "cjs",
      sourcemap: true,
    },
  },
  {
    input: "src/index.ts",
    plugins: [
      stripCode({
        start_comment: "REMOVE_ESM_BUNDLE_START",
        end_comment: "REMOVE_ESM_BUNDLE_END",
      }),
      esbuild(),
    ],
    output: {
      file: `dist/index.mjs`,
      format: "es",
      sourcemap: true,
    },
  },
  {
    input: "src/index.ts",
    plugins: [
      dts(),
      alias({
        entries: [{ find: "aws-crt", replacement: "node_modules/aws-crt" }],
        // "aws-crt": path.resolve(__dirname, "node_modules/aws-crt"),
      }),
    ],

    output: {
      file: `dist/index.d.ts`,
      format: "es",
    },
  },
];
