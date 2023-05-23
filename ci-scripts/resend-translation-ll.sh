#!/bin/bash
export BACON_TASK_NAME="CI_DOC_TOOLS_REQUEST_TRANSLATION_LL"

source setup-translation-ll.sh

git fetch --depth=1 origin ${BASE_BRANCH}
export BASE_BRANCH_SHA=$(git rev-parse origin/${BASE_BRANCH})

TRANSLATION_BRANCH="em-test-translation"

git fetch --depth=1 origin ${TRANSLATION_BRANCH}
git reset --hard FETCH_HEAD

git switch ${TRANSLATION_BRANCH}


# sync scripts from the main branch
pushd scripts
git restore --source origin/gh-pages -- .
popd

# update files!
python3 scripts/translation_modify_files.py ${TARGET}

git add --all

git -c user.name='CI Automation' -c user.email=${userEmail} \
  commit -m "$(TZ=UTC+8 date +'%Y-%m-%d %H:%M:%S') Updating en-us htm files for ${TARGET^^} project." \
  -m "Branch: ${BASE_BRANCH}" \
  -m "SHA: ${BASE_BRANCH_SHA}"
git push origin ${TRANSLATION_BRANCH}

send_slack_message "${SLACK_CHANNEL}" \
  ":white_check_mark: Re-sent translation for [${TARGET^^}]" \
  "Commit author: ${userEmail}\nTranslation commits: ${TRANSLATION_COMMITS}\nBacon task: ${BACON_LINK}" \
  "good"
