# Contributing

1. Fork, then clone this repo
1. `npm install`
1. `npm link`
1. In your plugin run:
    * `npm install`
    * `npm link js-object-utils`
1. Make your changes 
1. Push to your fork and [submit a pull request](https://github.intuit.com/SBG/js-object-utils/compare/).
1. Go through the code review process with the owner, making any changes necessary.
1. The code reviewer/owner will accept the pull request. He/she will bump the version and publish it.
1. Your changes will be included in the next published version of js-object-utils.

## How to release a new version 

1. Check in all changes to develop branch
1. npm install
1. grunt release [ --major | --minor | --patch ]
1. git push origin master vX.X.X

## How to add release notes

You can use this [Release](https://github.intuit.com/SBG/depcop/releases/tag/v1.1.1) as a guide for the following steps:

1. Go to [Releases](https://github.intuit.com/SBG/js-object-utils/releases)
1. Click **Draft a new release**
1. Be sure to title the Release with **vX.X.X**
1. Include a one sentence high level description of what this Release entails. 
1. Include a **changes** section that includes the commits that went into the Release. 
    1. You can use the command `git log vW.W.W..vX.X.X --no-merges --pretty=oneline --abbrev-commit` to generate this for you, where W and X are your previous and new release versions. 
