const path = require("path");
const pug = require("pug");
const fs = require("fs");

const font = require("./font");

const html = pug.renderFile(path.resolve("index.pug"), { font: font.compile() });
fs.writeFileSync(path.resolve("./public/index.html"), html);
