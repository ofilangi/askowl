var gulp = require('gulp');
var util = require('gulp-util');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
//version 1.7.1 with bug
//var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var inject = require('gulp-inject');
//var rename = require('gulp-rename');
var istanbul = require('gulp-istanbul');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var istanbulReport = require('gulp-istanbul-report');
var uglify = require('gulp-uglify');
//var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');

//console.log(require('istanbul').Report.getReportList());

//var askomicsSourceFiles = ['static/js/**/*.js','!static/js/third-party/**/*.js'];

var config = require('./config.json');

var askomicsSourceFiles = [
        'config.js',
        'static/js/help/AskomicsHelp.js',
        'static/js/jquery.sparql.js',
        'static/js/AskomicsRestManagement.js',
        'static/js/AskomicsUserAbstraction.js',
        'static/js/integration.js',
        'static/js/AskomicsResultsView.js',
        'static/js/query-handler.js',
        'static/js/AskomicsMenuFile.js',
        'static/js/AskomicsMenuView.js',
        'static/js/GraphObject.js',
        'static/js/node/GraphNode.js',
        'static/js/node/AskomicsNode.js',
        'static/js/node/AskomicsPositionableNode.js',
        'static/js/node/GONode.js',
        'static/js/link/GraphLink.js',
        'static/js/link/AskomicsLink.js',
        'static/js/link/AskomicsPositionableLink.js',
        'static/js/link/GOLink.js',
        'static/js/view/parameters/InterfaceParametersView.js',
        'static/js/view/parameters/TriplestoreParametersView.js',
        'static/js/view/parameters/GOParametersView.js',
        'static/js/view/AskomicsObjectView.js',
        'static/js/view/AskomicsLinkView.js',
        'static/js/view/AskomicsNodeView.js',
        'static/js/view/AskomicsPositionableLinkView.js',
        'static/js/view/AskomicsPositionableNodeView.js',
        'static/js/view/GOLinkView.js',
        'static/js/view/GONodeView.js',
        'static/js/AskomicsObjectBuilder.js',
        'static/js/AskomicsGraphBuilder.js',
        'static/js/AskomicsForceLayoutManager.js',
        'static/js/MainAskomics.js'
    ];

var askomicsCssFiles = [
  'askomics'
];

var prod = !!util.env.prod;
var reload = !!util.env.reload;

prod ? console.log('---> Production') : console.log('---> Development');
reload ? console.log('---> Reload') : util.noop();

/*
Default task : run 'build'
               if `gulp --reload`, watch AskOmics file and run 'build' when a file is modified
*/
gulp.task('default', ['build'], function () {
  reload ? gulp.watch(askomicsSourceFiles, ['build']) : util.noop();
});


/*
build task : jshint files
             babel
             concat all files in askomics.js
             if `gulp --prod` uglify askomics.js
*/
gulp.task('build', function() {
    return gulp.src(askomicsSourceFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
    //    .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('askomics.js'))
        .pipe(prod ? uglify() : util.noop() )
     //   .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('static/dist'));
});

var coverageFile = './.coverage-js/coverage.json';
var mochaPhantomOpts = {
  reporter: 'spec',
  dump:'output_test.log',
  //https://github.com/ariya/phantomjs/wiki/API-Reference-WebPage#webpage-settings
  phantomjs: {
    useColors: true,
    hooks: 'mocha-phantomjs-istanbul',
    coverageFile: coverageFile,
    settings: {
      //userName,password
      webSecurityEnabled : false
    },
    browserConsoleLogOptions: true
  },
  suppressStdout: false,
  suppressStderr: false,
  globals: ['script*', 'jQuery*']
};

//https://github.com/willembult/gulp-istanbul-report
gulp.task('pre-test', function () {
  return gulp.src(askomicsSourceFiles, {base: "static/js"})
  //  .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015']}))
    // Covering files
    .pipe(istanbul({coverageVariable: '__coverage__'}))
  //  .pipe(sourcemaps.write('.'))
    // Write the covered files to a temporary directory
    .pipe(gulp.dest('test/client/js/istanbul/'));
});

// Askomics test files
var askomicsTestSourceFiles = ['test/client/js/*.js'];
gulp.task('pre-test-srctest', function () {
  return gulp.src(askomicsTestSourceFiles)
    .pipe(babel({presets: ['es2015']}))
    // Write the covered files to a temporary directory
    .pipe(gulp.dest('test/client/js/istanbul/test'));
});

// writing dependancies about node_modules test framework
var testFrameworkFiles=[
  'node_modules/mocha/mocha.js',
  'node_modules/mocha/mocha.css',
  'node_modules/should/should.js',
  'node_modules/chai/chai.js',
  'node_modules/jquery/dist/jquery.js',
  'node_modules/intro.js/intro.js',
  'static/js/third-party/jquery.dataTables.min.js',
  'static/js/third-party/jQuery-contextMenu-2.30/jquery.contextMenu.min.js',
  'static/js/third-party/jQuery-contextMenu-2.30/jquery.ui.position.min.js',
];
// New Askomics files instrumented for coverage
var askomicsInstrumentedSourceFiles = askomicsSourceFiles.slice();
askomicsInstrumentedSourceFiles.forEach(function(element, index) {
  askomicsInstrumentedSourceFiles[index] = askomicsInstrumentedSourceFiles[index].replace('static/js','test/client/js/istanbul');
});



gulp.task('test', ['default','pre-test','pre-test-srctest'],function () {
    return gulp
    .src('test/client/index_tpl.html')
    .pipe(inject(gulp.src(testFrameworkFiles, {read: false}) , {relative: true, name: 'testFramework'}))
    .pipe(inject(gulp.src(askomicsInstrumentedSourceFiles, {read: false}), {relative: true, name: 'askomics'}))
    .pipe(inject(gulp.src(['test/client/js/istanbul/test/*.js'], {read: false}) , {relative: true, name: 'askomicsTestFiles'}))
    //.pipe(rename('index.html'))
    .pipe(gulp.dest('test/client/'))
    .pipe(mochaPhantomJS(mochaPhantomOpts))
    .on('finish', function() {
      gulp.src(coverageFile)
        .pipe(istanbulReport({
          reporterOpts: {
            dir: './coverage'
          },
          includeAllSources: true,
          includeUntested : true,
          reporters: [
            'text',
            'text-summary',
            {'name': 'lcovonly', file: 'frontend.lcov'},
            {'name': 'lcovonly', file: 'lcov.info'}, // atom plugin lcov-info
            {'name': 'json', file: 'frontend.json'} // -> ./jsonCov/cov.json
          ]
        }));
    });
});
/*
gulp.task('remap-istanbul', function () {
    return gulp.src('coverage/frontend.json')
        .pipe(remapIstanbul({
            fail: true,
            reports: {
                'json': 'coverage.json',
                'html': 'html-report'
            }
        }));
});
*/
