#!/bin/bash
set -x

echo Hello 2

cd ..

ls

npm install gh

git status


git checkout -b test-commit2
git push origin test-commit2

echo 'test change' > data.txt

git status
git add --all

git -c user.name='Eugene' -c user.email=emikhasyak@okta.com commit -m "test commit message"
git push origin test-commit2

gh pr create --title "test PR" --body "test 123" --base em-test-bacon-task

echo Does it work?
