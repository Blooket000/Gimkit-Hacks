import fs from "fs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import metablock from "rollup-plugin-userscript-metablock";
import pkg from './package.json' assert { type: 'json' }
import replace from "@rollup/plugin-replace";

// const license = fs.readFileSync("./LICENSE", "utf8");
const license = "\tThis script is licensed under GNU General Public License v3.0\n\tView conditions -> https://github.com/UndercoverGoose/gimkit/blob/main/LICENSE\n\tCopyright (c) 2023 UndercoverGoose"

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
      file: "./output/main-userscript.user.js",
      format: "iife",
    },
    plugins: [typescript({
      target: "esnext",
      compilerOptions: {
        "lib": ["esnext", "dom"]
      }
    }), terser(), replace({
      delimiters: ["", ""],
      values: {
        "!function": `\n/*\n${license}\n*/\n\n(function(){const s=function s`,
        "({});": ";if(Object.isFrozen(WebSocket.prototype)){const w=window.open(location.href,'_blank');w.ssrc=s.toString();w.eval(s+';s({})');w.focus();}else s({})})();"
      }
    }), metablock({
      file: null,
      override: pkg
    })],
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