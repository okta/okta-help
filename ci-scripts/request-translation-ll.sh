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

# git status

git fetch --depth=1 origin ${TRANSLATION_BRANCH}
git reset --hard FETCH_HEAD

git status

git switch ${TRANSLATION_BRANCH}

git status

# export RESOURCE_PATHS=( "Content/Resources" "Resources" "Data" "Skins" )
# for RESOURCE_PATH in "${RESOURCE_PATHS[@]}"
# do
#     :
#     cp -r -f "${EN_PATH}/${RESOURCE_PATH}/" "${JA_PATH}/${RESOURCE_PATH}"
# done
# cp -f "${EN_PATH}/Sitemap.xml" "${JA_PATH}/Sitemap.xml"

cp -r -a -f "${EN_PATH}/Content/Resources/." "${JA_PATH}/Content/Resources"

git status

pushd ${JA_PATH}
git restore --source origin/${SHA} -- . ':!Data/Tocs/*'
popd

# checkout latest en-us sources
pushd ${EN_PATH}
# git restore --source gh-pages -- . ':!*/Topics/ReleaseNotes/*'
git restore --source origin/${SHA} -- . ':!*/Topics/ReleaseNotes/*'
popd

git add --all
git -c user.name='CI Automation' -c user.email=${userEmail} commit -m "Copying en resources and files for ${TARGET^^} project"
#git push origin ${TRANSLATION_BRANCH}
git status

# send_slack_message "${SLACK_CHANNEL}"\
#     ":white_check_mark: Requested translation for [${TARGET}]"\
#     "Commit author: ${userEmail}. Github link https://github.com/okta/okta-help/tree/${TRANSLATION_BRANCH}"\
#     "good"
