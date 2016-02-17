var historyApiFallback = require('connect-history-api-fallback')

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    browserSync: {
      dev:{
        bsFiles: {
          src : [ 
          '*.html',
          'assets/css/*.css',
          'assets/js/*.js',
          'assets/js/{*,}/*.js',
          'libs/*.js',
          'libs/{*,}/*.js'
          ]
        },
        options: {
          server: {
            baseDir: "./",
            middleware: [ historyApiFallback() ]
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
    },
    postcss: {
      options: {
        map: false, // inline sourcemaps

        processors: [
          //require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          //require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'assets/css/*.css'
      }
    },
    watch: {
      scripts: {
        files: 'assets/css/*.css',
        tasks: ['postcss'],
      },
    },
  });


  grunt.registerTask('dev', ['browserSync:dev']);
  grunt.registerTask('build',[
    'copy:html',
    'copy:assets_dir',
    'copy:font',
    'copy:img',
    'copy:text',
    'copy:svg',
    'postcss',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin'
    ]);

};



