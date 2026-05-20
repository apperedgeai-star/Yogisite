const fs = require("fs");
const p = "components/preloader/CinematicPreloader.tsx";
let s = fs.readFileSync(p, "utf8");
const closeDiv = "</" + "div>";

s = s.replace(
  "<motion.div className=\"flex flex-col items-center gap-6\">",
  "<" + "motion.div className=\"flex flex-col items-center gap-6\">"
);
