set -xe

  eval "$(ssh-agent -s)"
  echo "1."
  ssh-add ~/.ssh/id_rsa

  cd ~
  git clone https://github.com/agile-dev-assignments/project-setup-team-ikedacho-visionary.git
  cd project-setup-team-ikedacho-visionary
  pm2 start npm -- start

  echo "3."
ssh Lin@167.172.155.162 'pm2 restart all'