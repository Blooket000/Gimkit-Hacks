import fs from "fs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import metablock from "rollup-plugin-userscript-metablock";
import pkg from './package.json' assert { type: 'json' }
import replace from "@rollup/plugin-replace";

// const license = fs.readFileSync("./LICENSE", "utf8");
const license = "\tThis script is licensed under GNU General Public License v3.0\n\tView conditions -> https://github.com/UndercoverGoose/gimkit/blob/main/LICENSE\n\tCopyright (c) 2023 UndercoverGoose"
const userscript = {
  prefix: `\n/*\n${license}\n*/\n\n(function(){const s=function s`,
  suffix: `;
if(window._gutil||!Object.isFrozen(WebSocket.prototype))return s({});
const w=window.open(location.href,"_blank");
w.Object.freeze=n=>{
  if(n.constructor?.name==="WebSocket")return n;
  return Object.freeze(n);
};
w.Object.isFrozen=_=>true;
w._gutil=true;
w.focus();
})();`.split("\n").join("")
}

export default {
  input: "src/main.ts",
  output: [
    {
      file: "./output/bundle.js",
      format: "iife"
    },
    {
      file: "./output/bundle.min.js",
      format: "iife",
      plugins: [terser()]
    },
    {
      file: "./output/main-userscript.user.js",
      format: "iife",
      plugins: [terser(), replace({
        delimiters: ["", ""],
        values: {
          "!function": userscript.prefix,
          "({});": userscript.suffix
        }
      }), metablock({
        file: null,
        override: pkg
      })],
    }
  ],
  plugins: [typescript({
    target: "esnext",
    compilerOptions: {
      lib: ["esnext", "dom"]
    }
  })]
}