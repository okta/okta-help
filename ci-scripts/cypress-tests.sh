
#!/bin/bash
YARN_VERSION=1.22.4

cd ${OKTA_HOME}/${REPO}

setup_service yarn $YARN_VERSION

echo "TESTS!"

export CYPRESS_INSTALL_BINARY="https://cdn.cypress.io/desktop/11.0.1/darwin-x64/cypress.zip"

if ! yarn install --unsafe-perm; then
  echo "Unable to install thrush dependency packages"
  exit ${FAILED_SETUP}
fi

yarn run cy:run

echo "TESTS! done"
