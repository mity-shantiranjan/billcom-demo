/* jshint node: true */

module.exports = {
    options: {
        files: ["bower.json", "package.json"],
        updateConfigs: ["pkg"],
        commit: true,
        commitMessage: "Release v%VERSION%",
        commitFiles: ["bower.json", "package.json"],
        createTag: true,
        tagName: "v%VERSION%",
        tagMessage: "Version %VERSION%",
        push: false,
        pushTo: "upstream",
        gitDescribeOptions: "--tags --always --abbrev=1 --dirty=-d"
    }
};
