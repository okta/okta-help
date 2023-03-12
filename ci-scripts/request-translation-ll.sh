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
export TRANSLATION_COMMITS="https://github.com/okta/okta-help/commits/${TRANSLATION_BRANCH}"

git fetch --depth=1 origin ${TRANSLATION_BRANCH}
git reset --hard FETCH_HEAD

git switch ${TRANSLATION_BRANCH}

export RESOURCE_PATHS=( "Content/Resources" "Resources" "Data" "Skins" )
for RESOURCE_PATH in "${RESOURCE_PATHS[@]}"
do
  :
  cp -r -a --remove-destination "${EN_PATH}/${RESOURCE_PATH}/." "${JA_PATH}/${RESOURCE_PATH}"
done
cp -f "${EN_PATH}/Sitemap.xml" "${JA_PATH}/Sitemap.xml"

pushd ${JA_PATH}
git restore --source origin/${SHA} -- 'Data/Tocs/*'
popd

# checkout latest en-us sources
pushd ${EN_PATH}
git restore --source origin/${SHA} -- . ':!*/Topics/ReleaseNotes/*'
popd

export BACON_LINK="https://bacon-go.aue1e.saasure.net/tasks/CI_DOC_TOOLS_REQUEST_TRANSLATION_LL?taskId=${TEST_SUITE_RESULT_ID}"

if git diff-index --quiet HEAD --; then
  echo 'No changes detected in [${EN_PATH}]'

  send_slack_message "${SLACK_CHANNEL}" \
    ":warning: No changes for [${TARGET^^}]" \
    "Commit author: ${userEmail}\nTranslation commits: ${TRANSLATION_COMMITS}\nBacon task: ${BACON_LINK}" \
    "warning"
  exit
fi

git add --all
git -c user.name='CI Automation' -c user.email=${userEmail} commit -m "$(TZ=UTC+8 date +'%Y-%m-%d %H:%M:%S') Copying en resources and files for ${TARGET^^} project"
git push origin ${TRANSLATION_BRANCH}

send_slack_message "${SLACK_CHANNEL}" \
  ":white_check_mark: Requested translation for [${TARGET^^}]" \
  "Commit author: ${userEmail}\nTranslation commits: ${TRANSLATION_COMMITS}\nBacon task: ${BACON_LINK}" \
  "good"
