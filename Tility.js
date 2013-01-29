require('shelljs/global');
require('colors');

// set root project path to var
var projRoot = pwd();
// set environment var
var env = process.env.npm_package_config_env;

// load proper Gemfile
cp('lib/tility/Gemfile.'+env, 'Gemfile');

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

  // build default view
  cp('lib/tility/index.'+env+'.html', 'index.html');

  // bring in Gruntfile.js for env
  cp('lib/tility/Gruntfile.'+env+'.js', 'Gruntfile.js');

  // If you get this far, you're just about golden!
  echo(("---------------------------------------").green);
  echo(("To run your server, just run: grunt run").green);
  echo(("---------------------------------------").green);

} else if(env === 'rails') {

  // build default view
  mkdir('-p', 'app/assets/views/layouts/');
  cp('lib/tility/index.'+env+'.erb', 'app/assets/views/layouts/application.html.erb');

  // init rails in current directory
  if (exec('rails new . --skip-bundle -q -s -d mysql').code !== 0) {
    echo('Error: Rails init failed.');
    exit(1);
  }

  // remove rails index file
  rm('public/index.html');

  // build default layout
  cp('-f', 'lib/tility/index.'+env+'.erb', 'app/views/layouts/application.html.erb');

  // remove tree from sprockets and only include default css
  sed('-i', ' *= require_tree .', ' *= require "default"', 'app/assets/stylesheets/application.css');

  // add .css extension to default.scss for sprockets
  mv('app/assets/stylesheets/default.scss', 'app/assets/stylesheets/default.css.scss');

  // moving selectivzr to be a vendor library
  mkdir('-p', 'vendor/assets/javascripts/');
  mv('public/javascripts/selectivizr-min.js', 'vendor/assets/javascripts/selectivizr-min.js');

  // enable default route
  sed('-i', '# root :to => \'welcome#index\'', 'root :to => \'main#index\'', 'config/routes.rb');

  // init guardfile for livereload
  if( exec('guard init livereload').code !== 0) {
    echo('Error: Guard unable to install.');
    exit(1);
  }

  // add rack livereload
  sed('-i', /^end/, "  config.middleware.insert_after(ActionDispatch::Static, Rack::LiveReload)\nend", 'config/environments/development.rb');

  // create default main controller
  if( exec('rails generate controller Main').code !== 0 ) {
    echo('Error: unable to generate controller');
    exit(1);
  }

  // create default view
  mkdir('-p', 'views/main');
  cd('app/views/main');
  exec('touch index.html.erb');
  cd(projRoot);

  // add method for default view in controller
  sed('-i', 'class MainController < ApplicationController', "class MainController < ApplicationController\n  def index\n  end", 'app/controllers/main_controller.rb');

  // no longer need these in rails
  rm('-rf', 'public/javascripts/');
  rm('-rf', 'public/stylesheets/');
  rm('-rf', 'public/images/');
  rm('app/assets/javascripts/default.js');

  // If you get this far, you're just about golden!
  echo(("------------------------------------------").green);
  echo(("To run your server, just run: guard").green);
  echo(("To run your server, just run: rails server").green);
  echo(("------------------------------------------").green);

} else if(env === 'node') {
  // grunt watch in node - http://cobbweb.me/blog/2012/06/07/using-grunt-dot-js-to-build-your-frontend-in-a-node-dot-js-slash-express-dot-js-app/
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
