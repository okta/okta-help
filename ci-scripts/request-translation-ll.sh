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
export TRANSLATION_BRANCH=em-translation-${TARGET}
export RESOURCE_PATHS=( "Content/Resources" "Resources" "Data" "Skins" "Sitemap.xml" )

git fetch --depth=1 origin ${TRANSLATION_BRANCH}
git reset --hard FETCH_HEAD

# checkout latest en-us sources
cd ${EN_PATH}
git restore --source gh-pages -- . ':!*/Topics/ReleaseNotes/*'

cd ${OKTA_HOME}/${REPO}

# sync en-us resources to ja-jp
for RESOURCE_PATH in "${RESOURCE_PATHS[@]}"
do
    :
    rsync -av --exclude "Tocs/" "${EN_PATH}/${RESOURCE_PATH}/" "${JA_PATH}/${RESOURCE_PATH}"
done

git add --all
git -c user.name='CI Automation' -c user.email=${userEmail} commit -m "Copying en resources for ${TARGET^^} project"
#git push origin ${TRANSLATION_BRANCH}
git status

# send_slack_message "${SLACK_CHANNEL}"\
#     ":white_check_mark: Requested translation for [${TARGET}]"\
#     "Commit author: ${userEmail}. Github link https://github.com/okta/okta-help/tree/${TRANSLATION_BRANCH}"\
#     "good"
