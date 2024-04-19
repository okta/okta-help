export TOPIC_BRANCH="test-$(TZ=UTC+8 date +'%Y-%m-%d_%H-%M-%S_%s')"

git checkout -b ${TOPIC_BRANCH}

touch $(TZ=UTC+8 date +'%Y-%m-%d_%H-%M-%S')

git add --all
git -c user.name='CI Automation' -c user.email=${userEmail} commit -m "test"
git push origin ${TOPIC_BRANCH}

commit_sign_push "signed commit"
