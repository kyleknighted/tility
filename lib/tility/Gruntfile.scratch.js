module.exports = function (grunt) {
  'use strict';

  var path = require('path');
  var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

  var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'public'
        }
      },
      livereload: {
        options: {
          port: 9001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, '.')]
          }
        }
      }
    },
    sass: {
      dist: {
        files: {
          './public/stylesheets/default.css': './app/assets/stylesheets/default.scss',
          './public/stylesheets/ie.css': './app/assets/stylesheets/ie.scss'
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
          'public/javascripts/default.js': ['app/assets/javascripts/*.js']
        }
      }
    },
    regarde: {
      html: {
        files: 'public/*.html',
        tasks: ['livereload']
      },
      js: {
        files: 'app/assets/javascripts/*.js',
        tasks: ['jshint', 'uglify', 'livereload'],
        events: true
      },
      css: {
        files: 'app/assets/stylesheets/*.scss',
        tasks: ['sass', 'livereload'],
        events: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('run', ['livereload-start', 'connect', 'regarde']);
  grunt.registerTask('precomp', ['jshint', 'sass', 'uglify']);

};
