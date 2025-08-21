const fs = require("fs");
const path = require("path");

const BASE_URL = "https://A _COMPANY.github.io"; // غيّر USERNAME لاسم مستخدم GitHub تبعك
const DIR = "./"; // جذر الموقع

function generateSitemap(dir, baseUrl) {
  let urls = [];

  function walk(dirPath) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walk(filePath);
      } else if (file.endsWith(".html")) {
        let relativePath = path.relative(DIR, filePath).replace(/\\/g, "/");
        if (relativePath === "index.html") {
          urls.push(`${baseUrl}/`);
        } else {
          urls.push(`${baseUrl}/${relativePath}`);
        }
      }
    });
  }

  walk(dir);

  const today = new Date().toISOString().split("T")[0];
  let sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach((url) => {
    sitemap += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  sitemap += "</urlset>";

  fs.writeFileSync("sitemap.xml", sitemap, "utf8");
  console.log("✅ تم إنشاء sitemap.xml بنجاح!");
}

generateSitemap(DIR, BASE_URL);