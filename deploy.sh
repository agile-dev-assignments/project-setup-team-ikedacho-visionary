set -xe

  spawn ssh root@167.172.155.162
  expect "assword:"
  send "123\r"
  interact
  cd ~

  if [ -d "project-setup-team-ikedacho-visionary" ] ; then
    echo "Directory project-setup-team-ikedacho-visionary exists."
    cd project-setup-team-ikedacho-visionary
    git pull https://github.com/agile-dev-assignments/project-setup-team-ikedacho-visionary.git
  else
    echo "Cloning project-setup-team-ikedacho-visionary....."
    git clone https://github.com/agile-dev-assignments/project-setup-team-ikedacho-visionary.git
    cd project-setup-team-ikedacho-visionary
  fi
  echo "the branch isn't master."

  cd front-end
  npm install

  cd ../back-end
  npm install
  echo "in back-end. restart server.js"
  pm2 start server.js --name "server"
  echo "3."
