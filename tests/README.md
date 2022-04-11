# Acceptance tests


Install packages locally (with VPN enabled):

```
$ cd <path/to>/okta-help
$ yarn install
```

Spin up a local server:

```
$ pwd
<path/to>/okta-help
$ python3 -m http.server
```

Open a separate terminal window to run the Cypress tests:

```
$ cd <path/to>/okta-help
$ yarn run cy:open
```
