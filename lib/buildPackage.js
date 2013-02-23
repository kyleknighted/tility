var config = [];

var build = function(css, lib, js, projDir) {
  echo('Building install packages...');
  var replacement;

  sed('-i', '**CSS_CONFIG**', config[css], projDir + '/Gruntfile.js');
  if(css != 'None') {
    replacement = "  \"devDependencies\": {\n\t\t\"grunt-contrib-" + css.toLowerCase() + "\": \"git://github.com/gruntjs/grunt-contrib-" + css.toLowerCase() + ".git#master\",";
    sed('-i', '**CSS_NPM**', "grunt.loadNpmTasks('grunt-contrib-" + css.toLowerCase() + "');", projDir + '/Gruntfile.js');
  } else {
    sed('-i', '**CSS_NPM**', '', projDir + '/Gruntfile.js');
  }

  sed('-i', '**JS_CONFIG**', config[js], projDir + '/Gruntfile.js');
  if(js != 'None') {
    replacement = replacement + "\n\t\t\"grunt-contrib-coffee\": \"git://github.com/gruntjs/grunt-contrib-coffee.git#master\"";
    sed('-i', '**JS_NPM**', "grunt.loadNpmTasks('grunt-contrib-" + js.toLowerCase() + "');", projDir + '/Gruntfile.js');
  } else {
    sed('-i', '**JS_NPM**', '', projDir + '/Gruntfile.js');
  }

  sed('-i', '  "devDependencies": {', replacement, projDir + '/package.json');
}

config['None'] = '';

config['Sass'] = "\nsass: {\n" +
"      dist: {\n" +
"        files: {\n" +
"          './public/stylesheets/default.css': './app/assets/stylesheets/default.scss',\n" +
"          './public/stylesheets/ie.css': './app/assets/stylesheets/ie.scss'\n" +
"        }\n" +
"      },\n" +
"      dev: {\n" +
"        options: {\n" +
"          style: 'expanded',\n" +
"          lineNumbers: true\n" +
"        },\n" +
"        files: {\n" +
"          './public/stylesheets/default.css': './app/assets/stylesheets/default.scss',\n" +
"          './public/stylesheets/ie.css': './app/assets/stylesheets/ie.scss'\n" +
"        }\n" +
"      }\n" +
"    },";

config['LESS'] = "\nless: {\n" +
"       production: {\n" +
"         files: {\n" +
"           './public/stylesheets/default.css': './app/assets/stylesheets/default.less',\n" +
"           './public/stylesheets/ie.css': './app/assets/stylesheets/ie.less'\n" +
"         }\n" +
"       },\n" +
"       development: {\n" +
"         files: {\n" +
"           './public/stylesheets/default.css': './app/assets/stylesheets/default.less',\n" +
"           './public/stylesheets/ie.css': './app/assets/stylesheets/ie.less'\n" +
"         }\n" +
"       }\n" +
"     },";

config['Coffee'] = "\ncoffee: {\n" +
"       compile: {\n" +
"         files: {\n" +
"           './public/javascripts/default.js': ['./app/assets/javascripts/*.coffee']\n" +
"         }\n" +
"       }\n" +
"     },";

exports.build = build;