'use strict';

module.exports = function(grunt){
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['public/assets/*.*'],
		jst: {
			compile: {
				files: {
					'public/assets/pkg.js': ['app/templates/*.html']
				}
			}
		},
		concat: {
			app: {
				src: [
          'public/assets/pkg.js',
          'app/init.js',
					'app/views/*.js',
					'app/router.js'
				],
				dest: 'public/assets/pkg.js'
			}
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
			all: {
				files: ['app/**/*.*'],
				tasks: [
					'clean',
					'jst',
					'concat'
				]
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jst');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'clean',
		'jst',
		'concat',
		'connect',
		'watch'
	]);

};