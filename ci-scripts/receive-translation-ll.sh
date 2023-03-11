#!/bin/bash
set -x
pushd ${OKTA_HOME}/${REPO}

export SLACK_CHANNEL='#infodev-notifications'
export targets=( "oce" "asa" "eu" "oie" "wf" "oag" )
if [[ ! "${targets[*]}" =~ "${TARGET}" ]]; then
    echo "No such target ${TARGET}. Exiting."
    exit ${FAILED_SETUP}
fi

export TARGET_PATH=${TARGET}"/"
if [ ${TARGET} == "oce" ]; then
   TARGET_PATH=''
fi

export EN_PATH="${TARGET_PATH}en-us"
export JA_PATH="${TARGET_PATH}ja-jp"
export TRANSLATION_BRANCH=em-translations-${TARGET}
export TRANSLATION_RECEIVE_BRANCH="em-translations-${TARGET}-receive-$(TZ=UTC+8 date +'%Y-%m-%d_%H-%M-%S_%s')"

# to script branch
switch ${SHA}


# new topic name, from gh-pages (SHA)
# checkout ja-jp from translation branch (restore)
git checkout -b ${TRANSLATION_RECEIVE_BRANCH}

pushd JA_PATH
git restore --source origin/${TRANSLATION_BRANCH} -- .
popd

git status

echo 'post processing !!!'
# run post processing

# create PR
# send slack notification

# export HTTP_NEW_PR=$(curl \
#     -X POST \
#     -H "Accept: application/vnd.github+json" \
#     -H "Authorization: Bearer ${GITHUB_TOKEN}" \
#     https://api.github.com/repos/okta/${PUBLISH_REPO}/pulls \
#     -d '{
#       "title":"'"${PR_TITLE}"'",
#       "body":"'"${GIT_NETLIFY_LINK}"'Auto generated PR for `'"${TOPIC_BRANCH}"'` \n Infodev link on bacon '"${BACON_LINK}"'",
#       "head":"'"${TOPIC_BRANCH}"'",
#       "base":"'"${BASE_BRANCH_PR}"'"
#     }')

#   URL=$(echo ${HTTP_NEW_PR} | jq -r '.html_url')


# if [ "${URL}" == "null" ]
# then
#   exit ${FAILED_SETUP}
# fi


# send_slack_message "${SLACK_CHANNEL}" \
#     ":white_check_mark: [${build_name}] is pushed to ${PUBLISH_REPO} successfully" \
#     "Author: ${userEmail} \n PR: ${URL} \n Bacon: ${BACON_LINK}" \
#     "good"
