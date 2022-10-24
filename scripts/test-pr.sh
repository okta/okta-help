#!/bin/bash
set -x

echo Hello

export ARCHIVE_PATH="target.zip"
export OUTPUT_FOLDER="../${PUBLISH_DESTINATION}"
export PRODUCT_NAME="${PUBLISH_DESTINATION1:=oce}"
export TOPIC_BRANCH="build-${PUBLISH_DESTINATION}-$(date +%s)"

echo ${TOPIC_BRANCH}

exit 0

wget -O ${ARCHIVE_PATH} ${BUILT_ARTIFACT}
ls
git status
git diff test-pr.sh

tar -xf ${ARCHIVE_PATH} -C ${OUTPUT_FOLDER} --strip-components=1 --overwrite

rm ${ARCHIVE_PATH}


git add --all
git status

git diff --cached --stat

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
