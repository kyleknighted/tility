echo "---------------";
echo "Install Bundler";
echo "---------------";
gem install bundler

echo "--------------------";
echo "Install From Gemfile";
echo "--------------------";
bundle install

if [-z "$(which npm)"]; then
  echo "Looks like you don't have NPM installed.";
  echo "Install Node.js - http://nodejs.org/";
  exit 1
else
  echo "-------------------------------";
  echo "Load from Node Packaged Modules";
  echo "-------------------------------";
  npm install

  cd app/assets/stylesheets

  echo "---------------";
  echo "Install Bourbon";
  echo "---------------";
  bourbon install

  echo "------------";
  echo "Install Neat";
  echo "------------";
  neat install

  echo "To run your server, just run: grunt run";
fi
