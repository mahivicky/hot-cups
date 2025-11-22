module.exports = function(eleventyConfig) {
  // Passthrough copy for existing assets
  eleventyConfig.addPassthroughCopy("assets/css");
  eleventyConfig.addPassthroughCopy("assets/js");
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPassthroughCopy("components");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "docs"
    },
    templateFormats: ["html","njk","md"],
    htmlTemplateEngine: "njk"
  };
};
