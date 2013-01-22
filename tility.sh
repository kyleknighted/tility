echo "---------------";
echo "Install Bundler";
echo "---------------";
gem install bundler

echo "--------------------";
echo "Install From Gemfile";
echo "--------------------";
bundle install

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
