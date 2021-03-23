#!/usr/local/bin/node

const fs = require("fs");
const path = require("path");
const exec = require("child_process").execSync;

function jsbeautify(path, out) {
  return exec(`js-beautify "${path}" > "${out}"`);
}

function prettier(path, out) {
  return exec(`prettier "${path}" > "${out}"`);
}

function clean(path, out) {
  let c = fs.readFileSync(path, {
    encoding: "utf8"
  });
  let ll = c.split("\n");
  let res = "";
  ll.forEach(l => {
    l = l.replace(/\{" "\}/, "");
    if (l !== "" && l.trimEnd() ==="") {
      return;
    }
    res += l + "\n";
  });

  fs.writeFileSync(out, res, {
    encoding: "utf8"
  });
}

const exts = [".js", ".jsx", ".vue", ".html"];
async function run(p) {
  if (exts.indexOf(path.extname(p)) == -1) {
    console.log("skip..." + p);
    // console.log(path.extname(p).indexOf(['.js','.jsx','.vue']));
    return;
  }
  console.log(p);
  var tmp = "/tmp/jsb.js";
  var tmp2 = "/tmp/jsb.jsx";
  jsbeautify(p, tmp);
  prettier(tmp, tmp2);
  clean(tmp2, p);
}

let arg = process.argv[2];
if (arg) {
  if (exts.indexOf(path.extname(arg)) == -1) {
    let items = fs.readdirSync(arg);
    items.forEach(i => {
      run(path.join(arg, i));
    });
  } else {
    run(arg);
  }
}

