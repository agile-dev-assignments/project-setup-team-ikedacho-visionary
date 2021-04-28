set -xe

if [ $TRAVIS_BRANCH == 'master' ] ; then
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_rsa

  cd ~
  git clone https://github.com/agile-dev-assignments/project-setup-team-ikedacho-visionary.git
  cd project-setup-team-ikedacho-visionary
  pm2 start npm -- start
else
  echo "Not deploying, since the branch isn't master."
fi