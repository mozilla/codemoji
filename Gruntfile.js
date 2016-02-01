module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        browserSync: {
            dev:{
                bsFiles: {
                    src : [ 
                        '*.html',
                        'assets/css/*.css',
                        'assets/js/*.js'
                    ]
                },
                options: {
                    server: {
                        baseDir: "./",
                    },
                    watchTask: false,
                    open: false
                }
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
              dest: 'public'
            }
        },
        usemin:{
          html:['public/index.html']
        },
        copy:{
          html: {
              src: './index.html', dest: 'public/index.html'
          },
          svg_modules: {
              src: 'svg_modules/*', dest: 'public/'
          },
          assets_dir: {
              src: 'assets/', dest: 'public/'
          },
          img: {
              src: 'assets/img/*', dest: 'public/'
          },
          font: {
              src: 'assets/font/*', dest: 'public/'
          },
          text: {
              src: 'assets/text/*', dest: 'public/'
          },
          svg: {
              src: 'assets/svg/*', dest: 'public/'
          }
        }
    });
 
    grunt.registerTask('dev', ['browserSync:dev']);
    grunt.registerTask('build',[
      'copy:html',
      'copy:svg_modules',
      'copy:assets_dir',
      'copy:font',
      'copy:img',
      'copy:text',
      'copy:svg',
      'useminPrepare',
      'concat',
      'uglify',
      'cssmin',
      'usemin'
    ]);

};



