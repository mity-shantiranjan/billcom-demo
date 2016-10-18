"use strict";
/* jshint node: true */
module.exports = function(grunt) {
    var path = require("path"),
        banner;

    banner = "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
    "<%= grunt.template.today('yyyy-mm-dd') %>\n" +
    "<%= pkg.homepage ? '* ' + pkg.homepage + '\\n' : '' %>" +
    "* Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>;" +
    " Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> */\n";

    require("time-grunt")(grunt);
    //Load our custom tasks
    grunt.loadTasks("build-utils/grunt/tasks");

    require("load-grunt-config")(grunt, {
        configPath: path.join(process.cwd(), "build-utils/grunt/config"), //path to task.js files, defaults to grunt dir
        init: true, //auto grunt.initConfig
        data: { //data passed into config.  Can use with <%= test %>
            banner: banner,
            pkg: grunt.file.readJSON("package.json"),
            devServerPort: 9998,
            srcDir: "src",
            buildDir: "build",
            buildDistDir: path.normalize("<%= buildDir %>/dist"),
            buildUtilsDir: "build-utils",
            releaseDir: "release",
            testDir: "test"
        },
        loadGruntTasks: { //can optionally pass options to load-grunt-tasks.  If you set to false, it will disable auto loading tasks.
            pattern:  ["grunt-*", "intern", "@sbg/depcop"]
        }
    });

    // always run to copy updated git hooks if any.
    // grunt.task.run(["exec:copyGitHooks"]);

    //Linting tasks
    grunt.registerTask("lint", ["jshint", "jscs"]);

    //Minifier
    grunt.registerTask("minify", ["uglify"]);

    //Build Acceptance Criteria
    grunt.registerTask("build-acceptance", ["code-coverage-enforcer"]);

    //Documentation
    grunt.registerTask("documentation", ["jsdoc", "groc"]);

    grunt.registerTask("bundle", ["requirejs", "minify"]);

    grunt.registerTask("build", ["clean:build", "depcop", "lint", "test", "build-acceptance", "documentation", "bundle"]);

    grunt.registerTask("full", ["build", "sonarRunner:analysis"]);

    // Default task.
    grunt.registerTask("default", "build");

    // Semantic versioning
    grunt.registerTask("release", "Create release", function() {
        var explicitVersion = grunt.option("setversion"),
            bumpOnlyTask = "bump-only",
            predefinedVersions = ["major", "minor", "patch", "prerelease"],
            i, predefinedVersion;

        if (!explicitVersion) {
            for (i = 0; i < predefinedVersions.length; i++) {
                predefinedVersion = predefinedVersions[i];
                if (grunt.option(predefinedVersion)) {
                    bumpOnlyTask += ":" + predefinedVersion;
                    break;
                }
            }
        }

        grunt.task.run([bumpOnlyTask, "bump-commit"]);
    });
};
