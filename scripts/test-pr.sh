#!/bin/bash
set -x

echo Hello 2

cd ..

ls

git status


git checkout -b test-commit
git push origin test-commit

echo 'test change' > data.txt

git status
git add --all

git commit -m "test commit message"
git push origin test-commit

gh pr create --title "test PR" --body "test 123" --base em-test-bacon-task

echo Does it work?
