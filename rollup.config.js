import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/main.ts",
  output: {
    dir: "output",
    format: "iife",
  },
  plugins: [typescript()],
};
