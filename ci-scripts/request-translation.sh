#!/bin/bash
set -e

export targets=( "oce" "asa" "eu" "oie" "wf" "oag" )

if [[ ! "${targets[*]}" =~ "${TARGET}" ]]; then
    echo "No such target ${TARGET}. Exiting."
    exit ${FAILED_SETUP}
fi

cd ..

export TARGET="asa"
export TARGET_PATH=${TARGET}"/"

if [ ${TARGET} == "oce" ]; then
   TARGET_PATH=''
fi

export EN_PATH="${TARGET_PATH}en-us"
export JA_PATH="${TARGET_PATH}ja-jp"

export TOPIC_BRANCH="docs_l10n_request_${TARGET}_$(date +"%s")"

export paths=( "Content/Resources" "Resources" "Data" "Skins" )

for path in "${paths[@]}"
do
   :
  rsync -av --exclude "Tocs/" "${EN_PATH}/${path}" "${JA_PATH}"
done

git checkout -b ${TOPIC_BRANCH}

git add --all
git -c user.name='CI Automation' -c user.email=${userEmail} commit -m "Copying en resources for ${TARGET} project"
git push origin ${TOPIC_BRANCH}
