#!/bin/bash
export BACON_TASK_NAME="CI_DOC_TOOLS_RECEIVE_TRANSLATION_LL"

source setup-translation-ll.sh

export TRANSLATION_RECEIVING_BRANCH="translations-${TARGET}-receive-$(TZ=UTC+8 date +'%Y-%m-%d_%H-%M-%S_%s')"

# topic from latest main
get fetch --depth=1 origin ${BASE_BRANCH}
switch ${BASE_BRANCH}
git checkout -b ${TRANSLATION_RECEIVING_BRANCH}

# get ja files from translation branch
git fetch --depth=1 origin ${TRANSLATION_BRANCH}
pushd ${JA_PATH}
git restore --source origin/${TRANSLATION_BRANCH} -- .
popd

# run post processing
yum -y install python3-devel
python3 scripts/translation_postprocessing.py ${TARGET}

git add --all
git -c user.name='CI Automation' -c user.email=${userEmail} commit -m "$(TZ=UTC+8 date +'%Y-%m-%d %H:%M:%S') Receiving translation for ${TARGET^^} project"
git push origin ${TRANSLATION_RECEIVING_BRANCH}

export PR_TITLE="Receiving translation for ${TARGET^^}"
export PR_BODY="${TARGET^^} translation for the latest commit: ${TRANSLATION_COMMITS}"

export HTTP_NEW_PR=$(curl \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  https://api.github.com/repos/okta/okta-help/pulls \
  -d '{
    "title":"'"${PR_TITLE}"'",
    "body":"'"${PR_BODY}"'",
    "head":"'"${TRANSLATION_RECEIVING_BRANCH}"'",
    "base":"'"${BASE_BRANCH}"'"
  }')

URL=$(echo ${HTTP_NEW_PR} | jq -r '.html_url')

if [ "${URL}" == "null" ]
then
  exit ${FAILED_SETUP}
fi

send_slack_message "${SLACK_CHANNEL}" \
  ":white_check_mark: [${TARGET^^}] translation is ready for review" \
  "Author: ${userEmail} \n PR: ${URL} \n Bacon: ${BACON_LINK}" \
  "good"
