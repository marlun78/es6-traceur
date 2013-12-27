/**
 * gruntfile.js
 *
 * Closure Compiler
 * https://developers.google.com/closure/compiler/
 *
 * Grunt ClosureCompiler
 * https://github.com/dcodeIO/grunt-closurecompiler
 *
 * Traceur Compiler
 * https://github.com/google/traceur-compiler
 *
 * Grunt Traceur
 * https://github.com/aaronfrost/grunt-traceur
 */
var fs = require('fs'),
    path = require('path');

module.exports = function (grunt) {

    var pkg = grunt.file.readJSON('package.json');

    //Ensure build directory exists
    grunt.file.mkdir(pkg.config.build || 'build');

    grunt.initConfig({

        pkg: pkg,

        defaultBanner: "/**!" +
            "\n * <%= pkg.name %> - <%= pkg.description %>" +
            "\n * Version: <%= pkg.version %>" +
            "\n * By:      <%= pkg.author %>" +
            "\n * License: <%= pkg.license %>" +
            "\n * Built:   <%= new Date %>" +
            "\n */",

        htmlDirNameIn: 'templates',
        scriptsDirNameIn: 'source',
        scriptsNameVersion: 'scripts-<%= pkg.version %>',
        scriptsFileName: '<%= scriptsNameVersion %>.js',
        scriptsFileNameMin: '<%= scriptsNameVersion %>-min.js',

        banner: {
            options: {
                banner: '<%= defaultBanner %>'
            },
            files: [
                '<%= pkg.config.build %>/**/*.js'
            ]
        },

        traceur: {
            options: {
                //Options: https://github.com/google/traceur-compiler/blob/master/src/options.js#L245
                sourceMap: true, // not supported yet
                sourceMaps: true // seems they haven’t decided on the ’s’ just yet
            },
            compile: {
                files: {
                    '<%= pkg.config.build %>/<%= scriptsFileName %>': [
                        '<%= scriptsDirNameIn %>/**/*.js'
                    ]
                }
            }
        },

        closurecompiler: {
            minify: {
                files: [
                    {
                        src: [
                            '<%= pkg.config.build %>/<%= scriptsFileName %>'
                        ],
                        dest: '<%= pkg.config.build %>/<%= scriptsFileNameMin %>'
                    }
                ],
                options: {
                    banner: '<%= defaultBanner %>',
                    compilation_level: "SIMPLE_OPTIMIZATIONS",
                    max_processes: 5
                }
            }
        },

        template: {
            html: {
                options: {
                    data: {
                        scriptsFileName: '<%= scriptsFileName %>',
                        scriptsFileNameMin: '<%= scriptsFileNameMin %>'
                    }
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= htmlDirNameIn %>/*.html'],
                        dest: '<%= pkg.config.build %>/',
                        filter: 'isFile'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-closurecompiler');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-traceur');

    grunt.task.loadTasks('./grunt-tasks');

    grunt.registerTask('scripts', ['traceur:compile', 'closurecompiler:minify', 'banner']);
    grunt.registerTask('html', ['template:html']);

    grunt.registerTask('build', ['scripts', 'html']);
    grunt.registerTask('default', ['build']);
};