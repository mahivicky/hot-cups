module.exports = function(eleventyConfig) {
  // Determine pathPrefix based on environment.
  // Use '/hot-cups/' for production (GitHub Pages); use '/' for local dev.
  // Prefer an explicit CI indicator (GitHub Actions) to decide production pathPrefix.
  // This avoids Eleventy or local tooling inadvertently setting NODE_ENV/ELEVENTY_ENV
  // and forcing the project pathPrefix during local development.
  const isProd = !!process.env.GITHUB_ACTIONS || (process.env.ELEVENTY_ENV === 'production') || (process.env.NODE_ENV === 'production');
  // Prefer explicit PATH_PREFIX (if you set it in CI), otherwise try to derive from GITHUB_REPOSITORY
  // e.g. GITHUB_REPOSITORY = 'owner/hot-cups' -> '/hot-cups/'
  let pathPrefix = '/';
  if (isProd) {
    if (process.env.PATH_PREFIX) {
      pathPrefix = process.env.PATH_PREFIX;
      if (!pathPrefix.endsWith('/')) pathPrefix = pathPrefix + '/';
    } else if (process.env.GITHUB_REPOSITORY) {
      const repo = process.env.GITHUB_REPOSITORY.split('/').pop();
      pathPrefix = '/' + repo + '/';
    } else {
      // fallback to hard-coded repo name
      pathPrefix = '/hot-cups/';
    }
  } else {
    pathPrefix = '/';
  }
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
