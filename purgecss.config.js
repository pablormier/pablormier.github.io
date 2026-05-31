module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  safelist: {
    standard: [
      /^jp-/,
      /^lm-/,
      /^cm-/,
      /^CodeMirror/,
      /^highlight/,
      /^MathJax/,
      /^MJX/,
      /^mermaid/,
    ],
  },
  skippedContentGlobs: ["_site/assets/**/*.html"],
};
