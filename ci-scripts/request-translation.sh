#!/bin/bash

cd ${OKTA_HOME}/${REPO}

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

if [[ ${TARGET} == "oce" || ${TARGET} == "oie" ]]; then
    mv -i "${EN_PATH}/Content/Topics/ReleaseNotes" "${EN_PATH}"
fi

export TOPIC_BRANCH="docs_l10n_request_${TARGET^^}_$(date +"%s")"

TOPIC_BRANCH="TEST_REQUEST_${TARGET^^}_$(date +"%s")"

export RESOURCE_PATHS=( "Content/Resources" "Resources" "Data" "Skins" "Sitemap.xml" )

for RESOURCE_PATH in "${RESOURCE_PATHS[@]}"
do
   :
   echo skip
  # rsync -av --exclude "Tocs/" "${EN_PATH}/${RESOURCE_PATH}" "${JA_PATH}"
done

git checkout -b ${TOPIC_BRANCH}

git add --all
git -c user.name='CI Automation' -c user.email=${userEmail} commit -m "Copying en resources for ${TARGET^^} project"
git push origin ${TOPIC_BRANCH}

echo "message slack"
set -x

send_slack_message "${SLACK_CHANNEL}"\
    ":white_check_mark: Requested translation for [${TARGET}]"\
    "Commit author: ${userEmail}. Github link https://github.com/okta/okta-help/pull/new/${TOPIC_BRANCH}"\
    "good"
