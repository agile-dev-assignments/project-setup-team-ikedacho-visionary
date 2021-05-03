set -xe
  
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
ssh-add -l

#ssh root@157.230.229.147
#cd ~/demo

#if [ -d "project-setup-team-ikedacho-visionary" ] ; then
#    echo "Directory project-setup-team-ikedacho-visionary exists."
#    cd project-setup-team-ikedacho-visionary
#    git pull
#  else
#    echo "Cloning project-setup-team-ikedacho-visionary....."
#    git clone https://github.com/agile-dev-assignments/project-setup-team-ikedacho-visionary.git
#    cd project-setup-team-ikedacho-visionary
#  fi

#  cd front-end
#  npm install
#  npm run build

#  cd ../back-end
#  npm install
#  echo "in back-end. start pm2..."
#  pm2 start server.js --name "server"
 
echo "finish"