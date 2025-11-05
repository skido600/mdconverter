import fs from "fs";
import path from "path";
import { marked } from "marked";
import hljs from "highlight.js";
import { Template } from "./helper/Template.js";
const __dirname = path.resolve();

// Configure marked for syntax highlighting will highlight js markdown
marked.setOptions({
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
});

// Paths
const markdownDir = path.join(__dirname, "markdown");
const templatePath = path.join(__dirname, "template", "layout.html");
const stylePath = path.join(__dirname, "template", "style.css");
const distDir = path.join(__dirname, "dist");
const imagesSrcDir = path.join(markdownDir, "images");
const imagesDistDir = path.join(distDir, "images");

// Ensure dist exists
fs.mkdirSync(distDir, { recursive: true });

// Copy images
if (fs.existsSync(imagesSrcDir)) {
  fs.mkdirSync(imagesDistDir, { recursive: true });
  const imageFiles = fs.readdirSync(imagesSrcDir);
  imageFiles.forEach((file) => {
    fs.copyFileSync(
      path.join(imagesSrcDir, file),
      path.join(imagesDistDir, file)
    );
  });
  console.log(` Copied images: ${imageFiles.join(", ")}`);
}

// Copy style.css
fs.copyFileSync(stylePath, path.join(distDir, "style.css"));

// Read layout template
const layout = fs.readFileSync(templatePath, "utf-8");

// Process markdown files
const files = fs.readdirSync(markdownDir).filter((f) => f.endsWith(".md"));
let blogLinks = "";

files.forEach((file) => {
  const markdown = fs.readFileSync(path.join(markdownDir, file), "utf-8");
  const htmlContent = marked(markdown);
  const title = file.replace(".md", "");

  // Add highlight.js CSS link into layout
  const finalHTML = layout.replace("{{title}}", title).replace(
    "{{content}}",
    `
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
      />
      ${htmlContent}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
      <script>hljs.highlightAll();</script>
      `
  );

  fs.writeFileSync(path.join(distDir, `${title}.html`), finalHTML);
  blogLinks += `<li><a href="./dist/${title}.html"  target="_blank" rel="noopener noreferrer">${title}</a></li>`;
});
const rootIndexPath = path.join(__dirname, "index.html");
//check if root  index.html exist
if (!fs.existsSync(rootIndexPath)) {
  fs.writeFileSync(rootIndexPath, Template(blogLinks));
  console.log("index.html created at project root.");
} else {
  console.log(" index.html already exists — skipped creation.");
}
fs.writeFileSync(rootIndexPath, Template(blogLinks));
console.log("Markdown compiled successfully with syntax highlighting!");
