module.exports = function(eleventyConfig) {
  // Determine pathPrefix based on environment.
  // Use '/hot-cups/' for production (GitHub Pages); use '/' for local dev.
  // Prefer an explicit CI indicator (GitHub Actions) to decide production pathPrefix.
  // This avoids Eleventy or local tooling inadvertently setting NODE_ENV/ELEVENTY_ENV
  // and forcing the project pathPrefix during local development.
  const isProd = !!process.env.GITHUB_ACTIONS || (process.env.ELEVENTY_ENV === 'production') || (process.env.NODE_ENV === 'production');
  const pathPrefix = isProd ? '/hot-cups/' : '/';
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
    pathPrefix: pathPrefix,
    templateFormats: ["html","njk","md"],
    htmlTemplateEngine: "njk"
  };
};
