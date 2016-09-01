module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js','index.html', 'lib/**/*.css', 'lib/**/*.js','bower_components/*'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
    	 files: ['bower_components/*','index.html','bower.json'],
    	 tasks: ['wiredep']
    },
    wiredep: {    	
    	target: {
	          	src: '../webapp/index.html', // point to your HTML file.	          
	          	dependencies: true,
	          	devDependencies : true,
	          	ignorePath : /(.\.+\/resources\/)/ig // replace ../resouces/
	          		
	        },
	    
     }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-copy');
     
  grunt.registerTask('default',['wiredep','watch']);

};