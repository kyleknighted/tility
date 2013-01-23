module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
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
    coffee: {
      compile: {
        files: {
          './public/javascripts/default.js': ['./app/assets/javascripts/*.coffee']
        }
      }
    },
    watch: {
      files: ['./public/*.html', './app/assets/stylesheets/*.scss', './app/assets/stylesheets/*.scss'],
      tasks: ['sass', 'coffee']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-reload');
  grunt.registerTask('run', ['connect', 'coffee', 'sass', 'reload', 'watch']);
  grunt.registerTask('precomp', ['coffee', 'sass', 'watch']);
  // grunt.registerTask('precomp', ['coffee','sass']);

};