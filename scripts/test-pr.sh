#!/bin/bash
set -x

echo Hello 2

cd ..

ls

brew install gh

git status


git checkout -b test-commit1
git push origin test-commit1

echo 'test change' > data.txt

git status
git add --all

git commit --author="Name <>" -m "test commit message"
git push origin test-commit1

gh pr create --title "test PR" --body "test 123" --base em-test-bacon-task

echo Does it work?
