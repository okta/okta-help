#!/bin/bash

# waiting for 10 minutes at most
export MAX_ATTEMPTS=30
export SLEEP_TIME=20
export GITHUB_TOKEN
if [ "${GITHUB_ORG}" == "atko-eng" ];
then
  get_vault_secret_key eng-services/github-uplift/eng-productivity-ci-bot-okta atko GITHUB_TOKEN
else
  get_vault_secret_key eng-services/github-uplift/eng-productivity-ci-bot-okta okta GITHUB_TOKEN
fi

# In case if Github has not started tests yet
sleep ${SLEEP_TIME}

until [ ${MAX_ATTEMPTS} -eq 0 ]; do
  export HTTP_WF_RUNS=$(curl -L \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    https://api.github.com/repos/${GITHUB_ORG}/${REPO}/actions/runs?head_sha=${SHA} )

  export TOTAL_COUNT=$(echo ${HTTP_WF_RUNS} | jq -r '.total_count')
  export CONCLUSION=$(echo ${HTTP_WF_RUNS} | jq -r '.workflow_runs[0].conclusion')
  export STATUS=$(echo ${HTTP_WF_RUNS} | jq -r '.workflow_runs[0].status')

  if [ "${TOTAL_COUNT}" = "0" ]; then
    echo "No workflows found. Did you create a PR?"
    exit ${FAILED_SETUP}
  fi

  echo "status: ${STATUS} conclusion: ${CONCLUSION}"

  if [ "${STATUS}" = "completed" ]; then
    if [ "${CONCLUSION}" = "success" ]; then
      echo "succeeded"
      exit ${FAILED_SETUP}
      # exit
    fi
    echo "failed"
    exit ${FAILED_SETUP}
  fi

  MAX_ATTEMPTS=$(($MAX_ATTEMPTS - 1))
  sleep ${SLEEP_TIME}
done

exit ${FAILED_SETUP}
