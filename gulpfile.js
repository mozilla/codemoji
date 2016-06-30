var fs = require('fs');
var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var del = require('del')
var rev = require('gulp-rev')
var realFavicon = require('gulp-real-favicon');
var copy = require('gulp-copy');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var svgInject = require('svg-injectr');
var htmlmin = require('gulp-htmlmin');
var through = require('through2');
var processhtml = require('gulp-processhtml');
var replace = require('gulp-replace');

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'cache/faviconData.json';

gulp.task('copy:fonts', ['clean'], function() {
  return gulp.src('assets/css/font/**/*.{ttf,woff,woff2,eot,svg}')
      .pipe(gulp.dest('public/font'));
});

gulp.task('copy:cname', ['clean'], function() {
  return gulp.src('assets/CNAME')
      .pipe(gulp.dest('public/'));
});

gulp.task('copy:assets', ['clean'], function() {
  var assets_paths = [
    'assets/svg/*',
    'assets/img/**/*',
    'vendor/**/*',
    'share.html',
    'bower_components/youarei/dist/youarei.js'
  ]
  
  return gulp.src(assets_paths)
             .pipe(copy('public'));
});

gulp.task('copy:favicon', ['clean'], function() {
  return gulp.src('cache/favicon/*')
      .pipe(gulp.dest('public'));
});



gulp.task('minify', ['clean'], function() {

  var cleancssOpt = {advanced:false, aggressiveMerging:false, restructuring:false}
  var processors = [autoprefixer({browsers: ['last 3 version']})];

  return gulp.src('index.html')
      .pipe(usemin({
        css: [ cleanCSS(cleancssOpt), postcss(processors) ],
        vendorjs: [ uglify ]
      }))
      .pipe(gulp.dest('public'));
});


gulp.task('clean', function() {
  return del([
    'public/**/**/*',
    // don't remove .gitkeep
    '!public/.gitkeep'
  ]);
});

// Generate the icons. This task takes a few seconds to complete. 
// You should run it at least once to create the icons. Then, 
// you should run it whenever RealFaviconGenerator updates its 
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
  realFavicon.generateFavicon({
    masterPicture: 'favicon.svg',
    dest: 'cache/favicon',
    iconsPath: '/',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '14%'
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#da532c',
        onConflict: 'override'
      },
      androidChrome: {
        pictureAspect: 'shadow',
        themeColor: '#ffffff',
        manifest: {
          name: 'Cryptoloji',
          display: 'browser',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#5bbad5'
      }
    },
    settings: {
      compression: 2,
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function() {
    done();
  });
});





gulp.task('finalhtml', ['copy:assets'], function(){

  var htmlminopt = {collapseWhitespace: true, removeComments:true}
  var env;

  if (fs.existsSync('./env.json')) {
    env = require('./env.json')
  }
  else if (process.env.DOMAIN) {
    env = {
      domain: process.env.DOMAIN
    }
  } else {
    env = {
      domain: 'http://localhost:8080'
    }
  }

  gulp.src('public/share.html')
    .pipe(processhtml({
      commentMarker: 'process',
      recursive:true,
      data:{version:Math.random()*10000, env:env}
    }))
    .pipe(htmlmin(htmlminopt))
    .pipe(gulp.dest('public/'))

  gulp.src('public/index.html')
    .pipe(through.obj(function (chunk, enc, cb) {
      svgInject({source:chunk.path, selector:'data-svg'}, function(res){
        chunk.contents = new Buffer('<!DOCTYPE html>' + res)
        cb(null, chunk);
      })
    }))
    // disabled since it strip the og:image FB tag
    // favicon tag are put manually into html markup
    //.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(processhtml({
      commentMarker: 'process',
      recursive:true,
      data:{version:Math.random()*10000, env:env}
    }))
    .pipe(replace('<script src="app.js"></script>', ''))
    .pipe(replace('<link rel="stylesheet" href="style.css">', ''))
    .pipe(htmlmin(htmlminopt))
    .pipe(gulp.dest('public/'))
})




gulp.task('build', ['clean', 'copy:fonts', 'copy:cname', 'copy:favicon', 'copy:assets', 'minify', 'finalhtml']);
gulp.task('favicon', ['generate-favicon']);
