# Acceptance tests


1. Install packages locally:

```
$ cd <path/to>/okta-help
$ yarn install
```

2. Spin up a local server:

```
$ pwd
<path/to>/okta-help
$ python3 -m http.server
```

Here, I'm using the Python HTTP Server package. You can use whatever local server you'd like, the tests don't care how the server is run.
The Python HTTP server default port is `8000`. At present, the Cypress tests
are configured to run on `http://localhost:8000/`.


3. Open a separate terminal window to run the Cypress tests:

```
$ cd <path/to>/okta-help
$ yarn run cy:open
```

This command will open a GUI. The tests can be run in browsers that you have installed on your system. You can select a browser by clicking the browser button in the top right corner of the window.

4. To execute the tests, click `> Run 4 integration specs` on the right side of the window. The tests will run in the browser that you selected (or the Electron default, which is shipped with Cypress).

FWIW, there is also a headless mode that can be run using the `yarn run cy:run` command.

In some situations, Cypress will take screenshots to use as diffs for subsequent runs. For the time being, I'm hiding this directory from commits.
