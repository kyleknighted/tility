var build = function(orig, dest, name, cssLib){
  var libraryChoice = {
    'Bourbon' : {
      'exec' : 'bourbon install',
      'framework' : 'bourbon'
    },
    'Bourbon w/ Neat' : {
      'exec' : 'bourbon install && neat install',
      'framework' : 'bourbon'
    },
    'Compass' : {
      'exec' : 'compass create ' + dest + ' --sass-dir "app/assets/stylesheets" --css-dir "public/stylesheets" --javascripts-dir "app/assets/javascripts" --images-dir "public/images"',
      'framework' : 'compass'
    },
    'Compass w/ Susy' : {
      'exec' : 'compass create ' + dest + ' --sass-dir "app/assets/stylesheets" --css-dir "public/stylesheets" --javascripts-dir "app/assets/javascripts" --images-dir "public/images" -r susy -u susy',
      'framework' : 'compass'
    },
    'None' : {
      'exec' : false,
      'framework' : 'css'
    }
  }

  echo('Building directory architecture...');

  mkdir('-p', 'app/assets/stylesheets');
  mkdir('-p', 'app/assets/javascripts');
  mkdir('-p', 'public/images');
  mkdir('-p', 'public/stylesheets');
  mkdir('-p', 'public/javascripts');

  echo('Copying over some more files...');

  cp('-R', orig + '/app/assets/javascripts/*', dest + '/app/assets/javascripts');
  cp('-R', orig + '/public/javascripts/*', dest + '/public/javascripts');

  cp('-R', orig + '/app/assets/stylesheets/'+libraryChoice[cssLib].framework+'/*', dest + '/app/assets/stylesheets');

  cp('-R', orig + '/public/images/*', dest + '/public/images');

  // build default view
  cp(orig + '/lib/scratch/index.html', dest + '/public/index.html');

  if(cssLib != 'None') {
    cd('app/assets/javascripts');
    if(libraryChoice[cssLib].exec) {
      exec(libraryChoice[cssLib].exec);
    }
  }

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
