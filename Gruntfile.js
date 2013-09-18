module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        tabSize: 2
      },
      files: ["package.json", "component.json"]
    }
  });
  
  grunt.loadNpmTasks('grunt-bumpx');
  
  grunt.registerTask('default', ['bump']);
  //grunt.registerTask('test',    ['test'])
}

