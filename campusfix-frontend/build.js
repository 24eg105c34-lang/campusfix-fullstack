const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const output = path.join(root, "dist");
const apiBase = (process.env.CAMPUSFIX_API_URL || "http://localhost:8080/api").replace(/\/+$/, "");

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const file of ["index.html", "styles.css", "app.js"]) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}

fs.writeFileSync(
  path.join(output, "config.js"),
  `window.CAMPUSFIX_API_URL = ${JSON.stringify(apiBase)};\n`
);
