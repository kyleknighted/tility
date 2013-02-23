var build = function(orig, dest, name){
  echo('Building directory architecture...');
  mkdir('-p', 'app/assets/stylesheets');
  mkdir('-p', 'app/assets/javascripts');
  mkdir('-p', 'public/images');
  mkdir('-p', 'public/stylesheets');
  mkdir('-p', 'public/javascripts');

  echo('Copying over some more files...');
  cp('-R', orig + '/app/assets/stylesheets/*', dest + '/app/assets/stylesheets');
  cp('-R', orig + '/app/assets/javascripts/*', dest + '/app/assets/javascripts');
  cp('-R', orig + '/public/images/*', dest + '/public/images');
  cp('-R', orig + '/public/stylesheets/*', dest + '/public/stylesheets');
  cp('-R', orig + '/public/javascripts/*', dest + '/public/javascripts');

  // build default view
  cp(orig + '/lib/scratch/index.html', dest + '/public/index.html');

  echo('Installing from NPM...');
  exec('npm install');
}

var output = function() {
  echo(("---------------------------------------").green);
  echo(("To run your server, just run: grunt run").green);
  echo(("---------------------------------------").green);
}

exports.build = build;
exports.output = output;