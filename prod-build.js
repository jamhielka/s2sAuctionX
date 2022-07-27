module.exports = function (grunt) {

  var buildDate = new Date().getTime();
  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    clean: {
      release: ['dist']
    },
    copy: {
      dashboard: {
        files: [
          // includes files within path
          { expand: true, src: ['Dockerfile'], dest: 'dist', filter: 'isFile' },
          { expand: true, src: ['app.js'], dest: 'dist', filter: 'isFile' },
          { expand: true, src: ['package-lock.json'], dest: 'dist', filter: 'isFile' },
          { expand: true, src: ['package.json'], dest: 'dist', filter: 'isFile' },

        ],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'copy']);



};