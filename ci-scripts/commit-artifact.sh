#!/bin/bash

export PUBLISH_TARGETS_FILE="publish_targets.txt"

copy_artifact()
{
  OUT_FOLDER=$1
  ARTIFACT_URL=$2
  ARCHIVE_PATH="target.zip"

  mkdir -p "${OUT_FOLDER}"
  wget -O ${ARCHIVE_PATH} ${ARTIFACT_URL}
  unzip -o ${ARCHIVE_PATH} -d ${OUT_FOLDER}
  rm ${ARCHIVE_PATH}
}

cd ${OKTA_HOME}/${REPO}
git fetch origin ${TOPIC_BRANCH}
export RET=$?

if [ "${RET}" == "0" ]
then
  echo "${TOPIC} exists on remote, updating"
  git checkout ${TOPIC_BRANCH}
else
  echo "Creating ${TOPIC}"
  git checkout -b ${TOPIC_BRANCH}
fi

cd ${OKTA_HOME}/${REPO}/ci-scripts

if [ ${PUBLISH_TARGETS} ]
then
  wget -O ${PUBLISH_TARGETS_FILE} ${PUBLISH_TARGETS}
  while IFS=$' \t\r\n' read -r artifact_link publish_to
  do
    copy_artifact "../${publish_to}" "${artifact_link}"
  done < ${PUBLISH_TARGETS_FILE}
  rm ${PUBLISH_TARGETS_FILE}
else
  copy_artifact "../${PUBLISH_DESTINATION}" "${BUILT_ARTIFACT}"
fi

cd ${OKTA_HOME}/${REPO}

git add --all
git -c user.name='CI Automation' -c user.email=${userEmail} commit -m "Updates ${BUILD_NAME}"
git push origin ${TOPIC_BRANCH}
