var build = function(orig, dest, name){
  mkdir('-p', 'app/assets/stylesheets');
  mkdir('-p', 'app/assets/javascripts');
  mkdir('-p', 'public/images');
  mkdir('-p', 'public/stylesheets');
  mkdir('-p', 'public/javascripts');

  cp('-R', orig + '/app/assets/stylesheets/*', dest + '/app/assets/stylesheets');
  cp('-R', orig + '/app/assets/javascripts/*', dest + '/app/assets/javascripts');
  cp('-R', orig + '/public/images/*', dest + '/public/images');
  cp('-R', orig + '/public/stylesheets/*', dest + '/public/stylesheets');
  cp('-R', orig + '/public/javascripts/*', dest + '/public/javascripts');

  // build default view
  cp(orig + '/lib/tility/index.scratch.html', dest + '/public/index.html');
  // bring in Gruntfile.js for env
  cp(orig + '/lib/tility/Gruntfile.scratch.js', dest + '/Gruntfile.js');
  // bring in package.json
  cp(orig + '/lib/tility/package.json', dest + '/package.json');
  sed('-i', '  "name": "",', '  "name": "' + name + '",', dest + '/package.json');
  exec('npm install');
}

var output = function() {
  echo(("---------------------------------------").green);
  echo(("To run your server, just run: grunt run").green);
  echo(("---------------------------------------").green);
}

exports.build = build;
exports.output = output;