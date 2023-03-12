#!/bin/bash
set -x


git status
if git diff-index --quiet HEAD --; then
  echo "!true"
else
  echo "!false has changes"
fi

