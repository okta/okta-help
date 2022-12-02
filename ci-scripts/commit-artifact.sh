#!/bin/bash
export ARCHIVE_PATH="target.zip"
export OUTPUT_FOLDER="../${PUBLISH_DESTINATION}"

set -x
cd ${OKTA_HOME}/${REPO}/asa/en-us/Content/Topics/Adv_Server_Access/docs/
ls -l

cd ${OKTA_HOME}/${REPO}/ci-scripts
wget -O ${ARCHIVE_PATH} ${BUILT_ARTIFACT}

tar -xf ${ARCHIVE_PATH} -C ${OUTPUT_FOLDER} --strip-components=1 --overwrite  --no-same-permissions

rm ${ARCHIVE_PATH}
cd ${OKTA_HOME}/${REPO}/asa/en-us/Content/Topics/Adv_Server_Access/docs/
ls -l

cd ${OKTA_HOME}/${REPO}

git checkout -b ${TOPIC_BRANCH}

git add --all
git -c user.name='CI Automation' -c user.email=${userEmail} commit -m "Updates ${BUILD_NAME}"
git push origin ${TOPIC_BRANCH}
