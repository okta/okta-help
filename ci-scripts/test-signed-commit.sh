export TOPIC_BRANCH="test-$(TZ=UTC+8 date +'%Y-%m-%d_%H-%M-%S_%s')"

git checkout -b ${TOPIC_BRANCH}

touch $(TZ=UTC+8 date +'%Y-%m-%d_%H-%M-%S')
commit_sign_push "signed commit"
