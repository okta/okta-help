#!/bin/bash
export ARCHIVE_PATH="target.zip"
export OUTPUT_FOLDER="../${PUBLISH_DESTINATION}"

wget -O ${ARCHIVE_PATH} ${BUILT_ARTIFACT}

tar -xf ${ARCHIVE_PATH} -C ${OUTPUT_FOLDER} --strip-components=1 --overwrite

rm ${ARCHIVE_PATH}
cd ..

git config core.fileMode false
git checkout -b ${TOPIC_BRANCH}

git add --all
git -c user.name='CI Automation' -c user.email=${userEmail} commit -m "Updates ${BUILD_NAME}"
git push origin ${TOPIC_BRANCH}
