module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    reload: {
      port: 4000,
      liveReload: {},
      proxy: {
        host: 'localhost',
        port: 8000
      }
    },
    trigger: {
      watchFile: 'index.html'
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'public'
        }
      }
    },
    sass: {
      dist: {
        files: {
          './public/stylesheets/default.css': './app/assets/stylesheets/default.scss'
        }
      },
      dev: {
        options: {
          style: 'expanded',
          lineNumbers: true
        },
        files: {
          './public/stylesheets/default.css': './app/assets/stylesheets/default.scss',
          './public/stylesheets/ie.css': './app/assets/stylesheets/ie.scss'
        }
      }
    },
    uglify: {
      options: {
        banner: '//<%= pkg.name %> : <%= pkg.version %> : <%= grunt.template.today("yyyy-mm-dd") %>' + "\n"
      },
      my_target: {
        files: {
          './public/javascripts/default.js': ['./app/assets/javascripts/*.js']
        }
      }
    },
    watch: {
      files: ['./public/*.html', './app/assets/stylesheets/*.scss', './app/assets/javascripts/*.js'],
      tasks: ['sass', 'uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-reload');

  grunt.registerTask('run', ['connect', 'uglify', 'sass', 'reload', 'watch']);
  grunt.registerTask('precomp', ['sass', 'uglify']);

};
