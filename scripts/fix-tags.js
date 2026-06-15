const fs = require("fs");
const path = process.argv[2];
const replacements = JSON.parse(process.argv[3]);
let s = fs.readFileSync(path, "utf8");
for (const [from, to] of replacements) {
  s = s.split(from).join(to);
}
fs.writeFileSync(path, s);
