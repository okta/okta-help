#!/bin/bash
set -x

echo Hello

ARCHIVE_PATH="target.zip"
OUTPUT_FOLDER="../"${PUBLISH_DESTINATION}

wget -O ${ARCHIVE_PATH} ${BUILT_ARTIFACT}
ls
git status

tar -xf ${ARCHIVE_PATH} -C ${OUTPUT_FOLDER} --strip-components=1 --overwrite

rm ${ARCHIVE_PATH}

git add --all
git status

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
