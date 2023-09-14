#!/bin/bash
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

export BASE_BRANCH=master

export TRANSLATION_BRANCH=docs_translations_${TARGET^^}
export EN_PATH="${TARGET_PATH}en-us"
export JA_PATH="${TARGET_PATH}ja-jp"

export TRANSLATION_COMMITS="https://github.com/okta/okta-help/commits/${TRANSLATION_BRANCH}"
export BACON_LINK="https://bacon-go.aue1e.saasure.net/tasks/${BACON_TASK_NAME}?taskId=${TEST_SUITE_RESULT_ID}"
