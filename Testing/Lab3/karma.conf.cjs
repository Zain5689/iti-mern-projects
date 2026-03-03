module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      { pattern: "lib/**/*.js", type: "module" },
      { pattern: "spec/**/*.js", type: "module" },
    ],
    browsers: ["Chrome"],
    singleRun: false,
  });
};
