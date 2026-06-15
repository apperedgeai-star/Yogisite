const fs = require("fs");

const files = [
  "components/sections/Problem.tsx",
  "components/sections/Hero.tsx",
  "components/sections/UnfairAdvantage.tsx",
  "components/navbar/Navbar.tsx",
  "components/navbar/OverlayMenu.tsx",
];

for (const file of files) {
  let s = fs.readFileSync(file, "utf8");
  // Fix erroneous </motion.div> where parent is plain div - conservative: only known patterns
  s = s.replace(
    /<motion\.motion\.div className="mx-auto max-w-7xl">/g,
    '<div className="mx-auto max-w-7xl">'
  );
  s = s.replace(/<motion\.div className="mx-auto max-w-7xl">/g, '<div className="mx-auto max-w-7xl">');
  s = s.replace(/<motion\.motion\.div className="relative max-w-5xl">/g, '<div className="relative max-w-5xl">');
  s = s.replace(/<motion\.motion\.motion\.div className="relative max-w-5xl">/g, '<div className="relative max-w-5xl">');
  s = s.replace(/<motion\.div className="relative max-w-5xl">/g, '<motion.div className="relative max-w-5xl">');
  s = s.replace(/<motion\.div className="relative max-w-5xl">/g, '<div className="relative max-w-5xl">');
  s = s.replace(/<motion\.div className="mx-auto grid max-w-7xl/g, '<div className="mx-auto grid max-w-7xl');
  s = s.replace(/<motion\.motion\.div className="mb-4 flex/g, '<div className="mb-4 flex');
  s = s.replace(/<motion\.div className="mb-4 flex/g, '<div className="mb-4 flex');
  fs.writeFileSync(file, s);
  console.log("processed", file);
}
