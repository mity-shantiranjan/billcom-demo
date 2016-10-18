/* jshint node: true */

module.exports = {
    analysis: {
        options: {
            debug: true,
            separator: "\n",
            sonar: {
                host: {
                    url: "http://172.17.83.78:8080/sonar"
                },
                jdbc: {
                    url: "jdbc:mysql://172.17.83.78:3306/sonar"
                },

                projectKey: "<%= pkg.name %>",
                projectName: "<%= pkg.name %>",
                projectVersion: "<%= pkg.version %>",
                sources: ["src"].join(","),
                language: "js",
                sourceEncoding: "UTF-8",
                dynamicAnalysis: "reuseReports",
                forceAnalysis: true,
                javascript: {
                    lcov: {
                        reportPath: "<%= buildDir %>/test-results/code-coverage-reports/lcov.info"
                    }
                }

            }
        }
    }
};