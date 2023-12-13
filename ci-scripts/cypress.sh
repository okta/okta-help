#!/bin/bash
pushd ${OKTA_HOME}/${REPO}

export UPLOAD_ARTIFACT_URL=${ARTIFACTORY_URL}/topic/com/okta/flare/cypress_${BRANCH}_${SHA:0:10}.zip
export CURL="curl -Lk -u ${ARTIFACTORY_USERNAME}:${ARTIFACTORY_PASSWORD} -m 30 --connect-timeout 30 -f "
export CYPRESS_ZIP="cypress.zip"
export CYPRESS_SCREENS="tests/cypress/screenshots/*"

# Start xvfb
Xvfb :99 -screen 0 1366x768x16 &

export DBUS_SESSION_BUS_ADDRESS=/dev/null
export DISPLAY=:99.0

yum update -y
yum -y install gtk2-2.24* xorg-x11-server-Xvfb libXtst* libXScrnSaver* GConf2* alsa-lib* gtk3

setup_service node v18.0.0
setup_service yarn 1.21.1

if ! yarn; then
    echo "failed to install dependencies"
    exit ${BUILD_FAILURE}
fi

if ! yarn lint; then
    echo "failed eslint"
    exit ${BUILD_FAILURE}
fi

if ! npx cypress run --headless; then
    echo "failed cypress tests"

    zip -r ${CYPRESS_ZIP} ${CYPRESS_SCREENS}
    ${CURL} --upload-file ${CYPRESS_ZIP} ${UPLOAD_ARTIFACT_URL}

    exit ${BUILD_FAILURE}
fi
