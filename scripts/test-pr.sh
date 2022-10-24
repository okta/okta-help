#!/bin/bash
set -x

export ARCHIVE_PATH="target.zip"
export OUTPUT_FOLDER="../${PUBLISH_DESTINATION}"
export PRODUCT_NAME="${PUBLISH_DESTINATION:=oce}"
export TOPIC_BRANCH="build-${PRODUCT_NAME}-$(date +%s)"

wget -O ${ARCHIVE_PATH} ${BUILT_ARTIFACT}

tar -xf ${ARCHIVE_PATH} -C ${OUTPUT_FOLDER} --strip-components=1 --overwrite

rm ${ARCHIVE_PATH}

git checkout ${TOPIC_BRANCH}

git add --all
git -c user.name='CI automation' -c user.email=${userEmail} commit -m "Updates ${PRODUCT_NAME}"
git push origin ${TOPIC_BRANCH}

exit

git status


gh pr create --title "Test PR" --body "test 123" --base em-test-bacon-task --head "test-commit3"

exit 0

git checkout -b test-commit3
git push origin test-commit3

echo 'test change' > data.txt

git status
git add --all

git -c user.name='Eugene' -c user.email=emikhasyak@okta.com commit -m "test commit message"
git push origin test-commit3

gh pr create --title "Test PR" --body "test 123" --base em-test-bacon-task

echo Does it work?
