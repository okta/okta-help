#!/bin/bash
export BACON_TASK_NAME="CI_DOC_TOOLS_REQUEST_TRANSLATION_LL"

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
export RESOURCE_PATHS=( "Content/Resources" "Resources" "Data" "Skins" )
for RESOURCE_PATH in "${RESOURCE_PATHS[@]}"
do
  :
  cp -r -a --remove-destination "${EN_PATH}/${RESOURCE_PATH}/." "${JA_PATH}/${RESOURCE_PATH}"
done
cp -f "${EN_PATH}/Sitemap.xml" "${JA_PATH}/Sitemap.xml"

pushd ${JA_PATH}
git restore --source origin/${BASE_BRANCH} -- 'Data/Tocs/*'
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

send_slack_message "${SLACK_CHANNEL}" \
  ":white_check_mark: Requested translation for [${TARGET^^}]" \
  "Commit author: ${userEmail}\nTranslation commits: ${TRANSLATION_COMMITS}\nBacon task: ${BACON_LINK}" \
  "good"
