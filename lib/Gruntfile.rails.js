module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    reload: {
      port: 4000,
      liveReload: {},
      proxy: {
        host: 'localhost',
        port: 3000
      }
    },
    trigger: {
      watchFile: 'index.html'
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'public'
        }
      }
    },
    watch: {
      files: ['./public/*.html', './app/assets/stylesheets/*.scss', './app/assets/javascripts/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-reload');

  grunt.registerTask('run', ['connect', 'reload', 'watch']);

};
