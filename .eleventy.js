// const { EleventyRenderPlugin } = require("@11ty/eleventy");

const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-js");

module.exports = function(eleventyConfig){
    eleventyConfig.setServerOptions({
      liveReload: true,
      domDiff: false,
      port: 4040,
      watch: ["_site/**/*.css"],
      showAllHosts: true
    });

    // WATCH
    eleventyConfig.addWatchTarget("tailwind.config.js");
    eleventyConfig.addWatchTarget("src/assets/css/*.css");
    eleventyConfig.addWatchTarget("src/assets/js/*.js");
    eleventyConfig.addWatchTarget("src/assets/images/*.svg");

    // PASSTHROUGH
    eleventyConfig.addPassthroughCopy("src/assets/icon/*");
    eleventyConfig.addPassthroughCopy("src/assets/images/*");
    eleventyConfig.addPassthroughCopy("src/assets/fonts/**/*.woff2");

    // SHORTCODE
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    eleventyConfig.addShortcode(
      "css",
      (href) =>
        `<link rel="stylesheet" type='text/css' href="${href}">`
    );

    eleventyConfig.addShortcode(
      "cssNonCritical",
      (href) =>
        `<link
        rel="stylesheet"
        href="${href}"
        media="print"
        onload="this.media='all'"
        />
        <noscript>
            <link
                href="${href}"
                rel="stylesheet"
                type="text/css"
            />
        </noscript>`
    );

    eleventyConfig.addShortcode(
      "js",
      (src, isModule=false) =>
        `<script src="${src}" ${isModule ? 'type="module"' : 'defer'}></script>`
    );

    // FILTER
    const pad = v => `0${v}`.slice(-2);
    eleventyConfig.addFilter("date", function(date, sep="-") {
      return `${pad(date.getDate())}${sep}${pad(date.getMonth() + 1)}${sep}${date.getFullYear()}`;
    });

    eleventyConfig.addFilter("sortBy", function(json, attr) {
      return json.sort((a, b) => a[attr].localeCompare(b[attr]));
    });

    eleventyConfig.addFilter("isValidUrl", function(value) {  
      try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch (_) {
        return false;  
      }
    });

    eleventyConfig.addFilter("transformFunding", function(value) {  
      if (value === null) {
        return "No Value Assigned"
      } else if (value.startsWith('$')) {
        return value.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')
      } else {
        return value
      }
    });

    eleventyConfig.addFilter("isSpecialFunding", function(value) {  
      return value === null || value.startsWith('$');
    });

    // TRANSFORMS
    eleventyConfig.addTransform("htmlmin", function(content) {
      if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
        return htmlmin.minify(content, {
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true
        });
      }

      return content;
    });

    const cssmin = new CleanCSS({});
    eleventyConfig.addTemplateFormats("template.css");
    eleventyConfig.addExtension("template.css", {
      outputFileExtension: "css",
      compile: async (inputContent) => {
        const output = process.env.DEBUG ? inputContent : cssmin.minify(inputContent).styles;

        return async () => {
          return output;
        };
      }
    });

    eleventyConfig.addTemplateFormats("template.js");
    eleventyConfig.addExtension("template.js", {
      outputFileExtension: "js",
      compile: async (inputContent) => {
        const output = process.env.DEBUG ? inputContent : UglifyJS.minify(inputContent).code;

        return async () => {
          return output;
        };
      }
    });

    // PLUGIN
    // eleventyConfig.addPlugin(EleventyRenderPlugin);

    // DRAFT SETTINGS
    // When `permalink` is false, the file is not written to disk
    eleventyConfig.addGlobalData("eleventyComputed.permalink", function() {
      return (data) => {
        // Always skip during non-watch/serve builds
        if(data.draft && !process.env.BUILD_DRAFTS) {
          return false;
        }

        return data.permalink;
      }
    });

    // When `eleventyExcludeFromCollections` is true, the file is not included in any collections
    eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", function() {
      return (data) => {
        // Always exclude from non-watch/serve builds
        if(data.draft && !process.env.BUILD_DRAFTS) {
          return true;
        }

        return data.eleventyExcludeFromCollections;
      }
    });

    eleventyConfig.on("eleventy.before", ({runMode}) => {
      // Set the environment variable
      if(runMode === "serve" || runMode === "watch") {
        process.env.DEBUG = true;
        process.env.BUILD_DRAFTS = true;
      }
    });

    return {
      dir: {
        input: "src",
        data: "_data",
        includes: "_includes",
        layouts: "_includes",
        markdownTemplateEngine: "njk"
      }
    };
}
  