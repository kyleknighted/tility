require('shelljs/global');
require('colors');

// set root project path to var
var projRoot = pwd();
// set environment var
var env = process.env.npm_package_config_env;

// load proper Gemfile
cp('lib/Gemfile.'+env, 'Gemfile');

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

// verify environment
if(env === 'scratch') {

  // change directory for Bourbon and Neat installs
  cd('app/assets/stylesheets');

  if (exec('bourbon install').code !== 0) {
    echo('Error: Bourbon install failed.');
    exit(1);
  }

  if (exec('neat install').code !== 0) {
    echo('Error: Neat install failed.');
    exit(1);
  }

  // If you get this far, you're just about golden!
  echo(("---------------------------------------").green);
  echo(("To run your server, just run: grunt run").green);
  echo(("---------------------------------------").green);
} else if(env === 'rails') {

  // init rails in current directory
  if (exec('rails new . --skip-bundle -q -s -d mysql').code !== 0) {
    echo('Error: Rails init failed.');
    exit(1);
  }

} else if(env === 'node') {
  echo(("---------------------------------------").red);
  echo((("ERROR!").bold + (" Still working on this environment.")).red);
  echo(("---------------------------------------").red);
  exit(1);
} else {
  echo(("---------------------------------------").red);
  echo((("ERROR!").bold + (" This is not a valid environment. (scratch, rails, node)")).red);
  echo(("---------------------------------------").red);
  exit(1);
}

// transfer back to project root
cd(projRoot);

// bring in correct Gruntfile.js for env
cp('lib/Gruntfile.'+env+'.js', 'Gruntfile.js');