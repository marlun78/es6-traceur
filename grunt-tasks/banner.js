/**
 * grunt-task/banner.js
 * Grunt task to add a file ’banner’
 */
module.exports = function (grunt) {

    grunt.registerMultiTask('banner', 'Adds a ’banner’ to files', function banner() {
        var options = this.options({
                banner: ''
            }),
            files = this.files;

        if (!options.banner || !files || !files.length) {
            grunt.log.error('No banner or files found');
            return;
        }

        files.forEach(filesIterator);

        function filesIterator(file) {
            file.src.forEach(fileIterator);
        }

        function fileIterator(path) {
            if (grunt.file.isFile(path)) {
                grunt.file.write(path,
                    options.banner +
                        grunt.util.linefeed +
                        grunt.file.read(path)
                );
                grunt.log.ok('Banner added to:', path);
            }
        }
    });
};
