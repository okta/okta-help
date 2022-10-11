#!/bin/bash
set -x

echo Hello 2

cd ..

ls

npm install -g gh

git status


git checkout -b test-commit3
git push origin test-commit3

echo 'test change' > data.txt

git status
git add --all

git -c user.name='Eugene' -c user.email=emikhasyak@okta.com commit -m "test commit message"
git push origin test-commit3

gh pr create --title "Test PR" --body "test 123" --base em-test-bacon-task

echo Does it work?
