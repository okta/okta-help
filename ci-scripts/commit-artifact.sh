#!/bin/bash
#export ARCHIVE_PATH="target.zip"
export PUBLISH_TARGETS_FILE="publish_targets.txt"
#export OUTPUT_FOLDER="../${PUBLISH_DESTINATION}"

copy_artifact()
{
  exoprt OUT_FOLDER = $1
  export ARTIFACT_URL = $2
  export ARCHIVE_PATH="target.zip"

  mkdir -p "${OUT_FOLDER}"
  wget -O ${ARCHIVE_PATH} ${ARTIFACT_URL}
  tar -xf ${ARCHIVE_PATH} -C ${OUT_FOLDER} --strip-components=1 --overwrite  --no-same-permissions
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

    # OUTPUT_FOLDER="../${publish_to}"

    # mkdir -p "${OUTPUT_FOLDER}"
    # wget -O ${ARCHIVE_PATH} ${artifact_link}
    # tar -xf ${ARCHIVE_PATH} -C ${OUTPUT_FOLDER} --strip-components=1 --overwrite  --no-same-permissions
    # rm ${ARCHIVE_PATH}
  done < ${PUBLISH_TARGETS_FILE}
else
  copy_artifact "../${PUBLISH_DESTINATION}" "${BUILT_ARTIFACT}"
  # mkdir -p "${OUTPUT_FOLDER}"
  # wget -O ${ARCHIVE_PATH} ${BUILT_ARTIFACT}
  # tar -xf ${ARCHIVE_PATH} -C ${OUTPUT_FOLDER} --strip-components=1 --overwrite  --no-same-permissions
  # rm ${ARCHIVE_PATH}
fi

cd ${OKTA_HOME}/${REPO}

git add --all
git -c user.name='CI Automation' -c user.email=${userEmail} commit -m "Updates ${BUILD_NAME}"
git push origin ${TOPIC_BRANCH}
