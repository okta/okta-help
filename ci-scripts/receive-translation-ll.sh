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

# topic from latest main
switch ${SHA}
git checkout -b ${TRANSLATION_RECEIVE_BRANCH}

# get ja files from translation branch
git fetch --depth=1 origin ${TRANSLATION_BRANCH}
pushd ${JA_PATH}
git restore --source origin/${TRANSLATION_BRANCH} -- .
popd

# run post processing
yum -y install python3-devel
python3 scripts/translation_postprocessing.py ${TARGET}

git status

git add --all
git -c user.name='CI Automation' -c user.email=${userEmail} commit -m "$(TZ=UTC+8 date +'%Y-%m-%d %H:%M:%S') Receiving translation for ${TARGET^^} project"
git push origin ${TRANSLATION_RECEIVE_BRANCH}

#export GITHUB_TOKEN
#get_vault_secret eng-services/github/eng-prod-CI-bot-okta GITHUB_TOKEN PersonalAccessToken

export HTTP_NEW_PR=$(curl \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  https://api.github.com/repos/okta/${PUBLISH_REPO}/pulls \
  -d '{
    "title":"'"${PR_TITLE}"'",
    "body":"Auto generated PR",
    "head":"'"${TRANSLATION_RECEIVE_BRANCH}"'",
    "base":"'"${SHA}"'"
  }')

URL=$(echo ${HTTP_NEW_PR} | jq -r '.html_url')


if [ "${URL}" == "null" ]
then
  exit ${FAILED_SETUP}
fi

# send_slack_message "${SLACK_CHANNEL}" \
#     ":white_check_mark: [${build_name}] is pushed to ${PUBLISH_REPO} successfully" \
#     "Author: ${userEmail} \n PR: ${URL} \n Bacon: ${BACON_LINK}" \
#     "good"
