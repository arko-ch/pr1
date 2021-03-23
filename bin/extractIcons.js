#!/usr/local/bin/node

const fs = require('fs');
const pa = require('path');

let icons = {};
function extractIconFromFile(path) {
  let c = fs.readFileSync(path, {
    encoding: "utf8"
  });
  let gen = false;
  let ll = c.split("\n");
  let n = [];
  for(let i=0; i<ll.length; i++) {
    let l = ll[i];
    if (l.indexOf('icon={') !== -1) {
      let res = /=\{(fa[a-zA-Z0-9]{1,20})\}/.exec(l);
      if (res) {
        // let c = ':' + res[1].replace(/[A-Z]/g, g => `-${g[0].toLowerCase()}`);
        // c = c.replace(':fa-', '');
        // l = l.replace(res[0], `={${c}}`);
        l = l.replace(res[0], `={Icons.${res[1]}}`);
        icons[res[1]] = true;
        gen = true;
      }
    }

    if (l.indexOf("import { FontAwesomeIcon") !== -1) {
      n.push('// ' + l);
      l = "import { Library as Icons, FontAwesomeIcon } from '../icons'";
    }
    n.push(l);
  };

  if (gen) {
    fs.writeFileSync(path.replace('.js', '_.js'), n.join("\n"), {encoding:'utf8',flag:'w'});
  } 
}

function extractFromDir(path) {
  let items = fs.readdirSync(path);
  items.forEach(i => {
    let filepath = pa.join(path, i);
    if (filepath.indexOf('assets') !== -1 || filepath.indexOf('.json') !== -1) {
      return;
    }
    if (filepath.indexOf('_.js') !== -1) {
      return;
    }
    if (filepath.indexOf('.js') !== -1) {
      extractIconFromFile(filepath);
      return;
    }
    if (filepath.indexOf('.') === -1) {
      extractFromDir(filepath);
      return;
    }
  });
}

function generateRegistry(icons) {
  let res = '';
  icons.forEach(i => {
    let im = `import { ${i} } from "@fortawesome/pro-regular-svg-icons/${i}";`;
    res += im + "\n";
  })

  res += "\n";

  icons.forEach(i => {
    let im = `library.add(${i}, '${i}');`;
    res += im + "\n";
  })

  res += "\n";

  fs.writeFileSync("./out.js", res, {
    encoding: "utf8"
  });
}

let arg = process.argv[2];
if (arg) {
  extractFromDir(arg);
  icons = Object.keys(icons);
  // generateRegistry(icons);
  console.log(icons);
}

