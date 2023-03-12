#!/bin/bash
set -x

if git diff-index --quiet HEAD --; then
  echo "!true no changes"
else
  echo "!false has changes"
fi

