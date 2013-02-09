var step1 = function(orig, dest, env) {
  // load proper Gemfile
  cp(orig + '/lib/' + env + '/Gemfile', dest + '/Gemfile');

  // verify RubyGems is installed
  if (!which('gem')) {
    echo('Sorry, this script requires RubyGems');
    exit(1);
  }

  // install bundler
  if (exec('gem install bundler').code !== 0) {
    echo('Error: Bundler install failed.');
    exit(1);
  }

  // install from Gemfile
  if (exec('bundle install').code !== 0) {
    echo('Error: Bundle install failed.');
    exit(1);
  }
}

var step2 = function(dest){
  // change directory for Bourbon and Neat installs
  cd(dest + '/app/assets/stylesheets');

  if (exec('bourbon install').code !== 0) {
    echo('Error: Bourbon install failed.');
    exit(1);
  }

  if (exec('neat install').code !== 0) {
    echo('Error: Neat install failed.');
    exit(1);
  }
}

exports.setup = step1;
exports.wrapup = step2;