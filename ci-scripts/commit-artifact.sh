#!/bin/bash
export ARCHIVE_PATH="target.zip"
export OUTPUT_FOLDER="../${PUBLISH_DESTINATION}"
export PRODUCT_NAME="${PUBLISH_DESTINATION:=oce}"
export TOPIC_BRANCH="build-${PRODUCT_NAME}-$(date +"%Y-%m-%d_%H-%M-%S_%s")"

wget -O ${ARCHIVE_PATH} ${BUILT_ARTIFACT}

tar -xf ${ARCHIVE_PATH} -C ${OUTPUT_FOLDER} --strip-components=1 --overwrite

rm ${ARCHIVE_PATH}
cd ..

git checkout -b ${TOPIC_BRANCH}

git add --all
git -c user.name='CI Automation' -c user.email=${userEmail} commit -m "Updates ${PRODUCT_NAME}"
git push origin ${TOPIC_BRANCH}
