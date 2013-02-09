var build = function(orig, dest, env){
  // build default layout
  mkdir('-p', dest + '/app/views/layouts/');
  cp(orig + '/lib/tility/index.rails.erb', dest + '/app/views/layouts/application.html.erb');

  // init rails in current directory
  if (exec('rails new . --skip-bundle --quiet --skip --database=mysql --template=' + orig + '/lib/tility/template.rails.rb').code !== 0) {
    echo('Error: Rails init failed.');
    exit(1);
  }

  // add .css extension to default.scss for sprockets
  cp(orig + '/app/assets/stylesheets/default.scss', dest + '/app/assets/stylesheets/default.css.scss');

  // moving selectivzr to be a vendor library
  mkdir('-p', dest + '/vendor/assets/javascripts/');
  cp(orig + '/public/javascripts/selectivizr-min.js', dest + '/vendor/assets/javascripts/selectivizr-min.js');

  // No longer need
  rm(dest + '/app/assets/javascripts/main.js.coffee');
  rm(dest + '/app/assets/stylesheets/main.css.scss');
}

var output = function() {
  echo(("------------------------------------------").green);
  echo(("To run your server, run: guard start -i").green);
  echo(("To run your server, run: rails server").green);
  echo(("------------------------------------------").green);
}

exports.build = build;
exports.output = output;