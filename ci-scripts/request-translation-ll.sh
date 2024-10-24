#!/bin/bash
export BACON_TASK_NAME="I18N_SYNC_TRANSLATIONS"

source setup-translation-ll.sh

git fetch --depth=1 origin ${BASE_BRANCH}
export BASE_BRANCH_SHA=$(git rev-parse origin/${BASE_BRANCH})

git fetch --depth=1 origin ${TRANSLATION_BRANCH}
git reset --hard FETCH_HEAD

git switch ${TRANSLATION_BRANCH}

# checkout latest en-us sources
pushd ${EN_PATH}
git restore --source origin/${BASE_BRANCH} -- . ':!*/Topics/ReleaseNotes/*' ':!*/topics/releasenotes/*'
popd

# copy en-us resources to en-ja
export RESOURCE_PATHS=( "Content/Resources" "content/resources" "Resources" "Data" "Skins" )
for RESOURCE_PATH in "${RESOURCE_PATHS[@]}"
do
  :
  cp -r -a --remove-destination "${EN_PATH}/${RESOURCE_PATH}/." "${JA_PATH}/${RESOURCE_PATH}"
done
cp -f "${EN_PATH}/Sitemap.xml" "${JA_PATH}/Sitemap.xml"

pushd ${JA_PATH}
git restore --source origin/${BASE_BRANCH} -- 'Data/Tocs/*'
    pushd Data
    git restore --source origin/${TRANSLATION_BRANCH} -- 'Search*.js'
    popd
popd

git add --all

if git diff-index --quiet HEAD --; then
  echo 'No changes detected in [${EN_PATH}]'

  send_slack_message "${SLACK_CHANNEL}" \
    ":warning: No changes for [${TARGET^^}]" \
    "Commit author: ${userEmail}\nTranslation commits: ${TRANSLATION_COMMITS}\nBacon task: ${BACON_LINK}" \
    "warning"
  exit
fi

git -c user.name='CI Automation' -c user.email=${userEmail} \
  commit -m "$(TZ=UTC+8 date +'%Y-%m-%d %H:%M:%S') Copying en resources and files for ${TARGET^^} project." \
  -m "Branch: ${BASE_BRANCH}" \
  -m "SHA: ${BASE_BRANCH_SHA}"
git push origin ${TRANSLATION_BRANCH}

export JSON_DATA='{
  "xtmBranchRegex":"origin/'${TRANSLATION_BRANCH}'",
  "i18nRepo":"okta-help"
}'
export BACON_TASK_RUN_ID=$(run_bacon_task_by_name "${BACON_TASK_NAME}" "${JSON_DATA}")

if ! wait_for_bacon_task_to_complete "${BACON_TASK_RUN_ID}" $((TIMEOUT * 60));
then
  exit ${FAILED_SETUP}
fi

send_slack_message "${SLACK_CHANNEL}" \
  ":white_check_mark: Requested translation for [${TARGET^^}]" \
  "Commit author: ${userEmail}\nTranslation commits: ${TRANSLATION_COMMITS}\nBacon task: ${BACON_LINK}" \
  "good"
