set -xe
if [ $TRAVIS_BRANCH == 'master' ] ; then
  eval "$(ssh-agent -s)"
  echo "1."
  ssh-add ~/.ssh/id_rsa

  cd ~
  git clone https://github.com/agile-dev-assignments/project-setup-team-ikedacho-visionary.git
  cd project-setup-team-ikedacho-visionary
else
  echo "Not deploying, since the branch isn't master."
fi

echo "2."
ssh Lin@167.172.155.162 'pm2 restart all'
echo "3."