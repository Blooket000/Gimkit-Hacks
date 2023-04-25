import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default [
  {
    input: "src/main.ts",
    output: {
      file: "./output/main-minified.js",
      format: "iife",
    },
    plugins: [typescript({
      target: "esnext",
      compilerOptions: {
        "lib": ["esnext", "dom"]
      }
    }), terser()],
  },
  {
    input: "src/main.ts",
    output: {
      file: "./output/main.js",
      format: "iife"
    },
    plugins: [typescript({
      target: "esnext",
      compilerOptions: {
        "lib": ["esnext", "dom"]
      }
    })]
  }
];