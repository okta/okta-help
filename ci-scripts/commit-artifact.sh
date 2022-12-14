#!/bin/bash
export ARCHIVE_PATH="target.zip"
export OUTPUT_FOLDER="../${PUBLISH_DESTINATION}"

wget -O ${ARCHIVE_PATH} ${BUILT_ARTIFACT}

tar -xf ${ARCHIVE_PATH} -C ${OUTPUT_FOLDER} --strip-components=1 --overwrite  --no-same-permissions

rm ${ARCHIVE_PATH}
cd ${OKTA_HOME}/${REPO}

git fetch origin ${TOPIC}
export RET=$?

if [ "${RET}" == "0" ]
then
  echo "${TOPIC} exists on remote, adding commit"
  git switch ${TOPIC_BRANCH}
else
  echo "Creating ${TOPIC}"
  git checkout -b ${TOPIC_BRANCH}
fi

git add --all
git -c user.name='CI Automation' -c user.email=${userEmail} commit -m "Updates ${BUILD_NAME}"
git push origin ${TOPIC_BRANCH}
