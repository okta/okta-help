# Acceptance tests


1. Install packages locally:

```
$ cd <path/to>/okta-help
$ yarn install
```

2. Open a separate terminal window to run the Cypress tests:

```
$ cd <path/to>/okta-help
$ yarn run cy:open
```

This command will open a GUI. The tests can be run in browsers that you have installed on your system. You can select a browser by clicking the browser button in the top right corner of the window.

3. To execute the tests, click `> Run 4 integration specs` on the right side of the window. The tests will run in the browser that you selected (or the Electron default, which is shipped with Cypress).

FWIW, there is also a headless mode that can be run using the `yarn run cy:run` command.

In some situations, Cypress will take screenshots to use as diffs for subsequent runs. For the time being, I'm hiding this directory from commits.


Updating package.json file is not trivial. By default our environment is configured to install packages from internal npm registry. After `yarn` command, `yarn.lock` file will have lots of dependencies to our server. Running `yarn` command in github environment will fail as it won't be able to fetch packages from cached urls.

Workaround is to have `.npmrc` and `.yarnrc` in repository which overrides path to registry, and `yarn` command will install packages from a commonly available location. Unfortunately with new setting there is something not working in github environment, so we can not check in `.npmrc` and `.yarnrc` as they are. We have to check-in renamed configs and only when we need to update `package.json` only then we should rename config to actual names and make update.

Steps to update `package.json`:
- made a change to file (add/remove dependency)
- rename `.npmrc_` and `.yarnrc_` to `.npmrc` and `.yarnrc`
- run `yarn` to update `yarn.lock` file
- discard changes to `.npmrc_` and `.yarnrc_`
- commit `package.json` along with `yarn.lock` file
