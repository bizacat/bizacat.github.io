'use strict';

module.exports = function (grunt) {

  // Show elapsed time after tasks run to visualize performance
  require('time-grunt')(grunt);
  // Load all Grunt tasks that are listed in package.json automagically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // shell commands for use in Grunt tasks
    shell: {
      jekyllBuild: {
        command: 'jekyll build'
      },
      jekyllServe: {
        command: 'jekyll serve'
      }
    },
    watch: {
      files: [
          '_includes/*.html',
          '_layouts/*.html',
          '_posts/*.markdown',
          '_pages/*.html',
          '_config.yml',
          'index.html',
          '_sass/*.scss'
      ],
      tasks: ['shell:jekyllBuild', 'shell:jekyllServe'],
      options: {
        interrupt: true,
        atBegin: true,
        liveReload: true
      }
    }

  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['shell']);

};
