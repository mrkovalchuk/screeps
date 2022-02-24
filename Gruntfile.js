module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'mr.kovalchuk.andrey@gmail.com',
                token: 'b9e62366-02a2-45f2-83d6-4cd8ee4e4105',
                branch: 'default',
                //server: 'season'
            },
            dist: {
                src: ['dist/*.js']
            }
        }
    });
}