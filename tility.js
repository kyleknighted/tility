require('shelljs/global');
require('colors');

var projRoot = pwd();

if(process.env.npm_package_config_env === 'scratch') {
  if (!which('gem')) {
    echo('Sorry, this script requires RubyGems');
    exit(1);
  }

  if (exec('gem install bundler').code !== 0) {
    echo('Error: Bundler install failed.');
    exit(1);
  }

  if (exec('bundle install').code !== 0) {
    echo('Error: Bundle install failed.');
    exit(1);
  }

  cd('app/assets/stylesheets');

  if (exec('bourbon install').code !== 0) {
    echo('Error: Bourbon install failed.');
    exit(1);
  }

  if (exec('neat install').code !== 0) {
    echo('Error: Neat install failed.');
    exit(1);
  }

  echo(("---------------------------------------").green);
  echo(("To run your server, just run: grunt run").green);
  echo(("---------------------------------------").green);
} else if(process.env.npm_package_config_env === 'rails') {
  echo(("---------------------------------------").red);
  echo((("ERROR!").bold + (" Still working on this environment.")).red);
  echo(("---------------------------------------").red);
  exit(1);
} else if(process.env.npm_package_config_env === 'node') {
  echo(("---------------------------------------").red);
  echo((("ERROR!").bold + (" Still working on this environment.")).red);
  echo(("---------------------------------------").red);
  exit(1);
} else {
  echo(("---------------------------------------").red);
  echo((("ERROR!").bold + (" This is not a valid environment.")).red);
  echo(("---------------------------------------").red);
  exit(1);
}

cd(projRoot);

cp('lib/Gruntfile.'+process.env.npm_package_config_env+'.js', 'Gruntfile.js');