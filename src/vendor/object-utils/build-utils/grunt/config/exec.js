/* jshint node: true */

module.exports = {
    copyGitHooks: {
        command: "cp <%= buildUtilsDir %>/git/hooks/* .git/hooks"
    }
};