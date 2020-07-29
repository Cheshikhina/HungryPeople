const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const del = require('del');
const cssBase64 = require('gulp-css-base64');
const webpack = require('webpack-stream');
const pug = require('gulp-pug');
const realFavicon = require('gulp-real-favicon');
const fs = require('fs');
const FAVICON_DATA_FILE = 'faviconData.json';

// Сообщение для компилируемых файлов
let doNotEditMsg = '\n ВНИМАНИЕ! Этот файл генерируется автоматически.\n Любые изменения этого файла будут потеряны при следующей компиляции.\n Любое изменение проекта без возможности компиляции ДОЛЬШЕ И ДОРОЖЕ в 2-5 раз.\n\n';

const dist = './build/js';
gulp.task('index', () => {
  return gulp.src('./source/js/main.js')
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'main.js'
      },
      watch: false,
      devtool: 'source-map',
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /(node_modules[\/\\](?!(swiper|dom7)[\/\\])|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: 'usage'
                }]
              ]
            }
          }
        }]
      }
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('index-min', () => {
  return gulp.src('./source/js/main.js')
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: 'main.js'
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /(node_modules[\/\\](?!(swiper|dom7)[\/\\])|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  corejs: 3,
                  useBuiltIns: 'usage'
                }]
              ]
            }
          }
        }],
      }
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(postcss([autoprefixer({
      browsers: [
        '> 1%',
        'not dead'
      ]
    })]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css', 'base64', 'refresh'));
  gulp.watch('source/img/icon_*.svg', gulp.series('sprite', 'pug', 'refresh'));
  gulp.watch('source/img/*.{png,jpg}', gulp.series('copy', 'pug', 'refresh'));
  gulp.watch(['source/pug/**/*.pug', '!source/pug/common/mixins.pug'], gulp.series('delMixins', 'writePugMixinsFile', 'pug', 'refresh'));
  gulp.watch('source/js/**/*.js', gulp.series('index', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('images', function () {
  return gulp.src('source/img/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo({
        plugins: [{
            cleanupIDs: false
          },
          {
            removeViewBox: false
          },
          {
            convertPathData: false
          },
          {
            mergePaths: false
          },
        ],
      })
    ]))
    .pipe(gulp.dest('source/img'));
});

gulp.task('webp', function () {
  return gulp.src('source/img/*.{png,jpg}')
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest('source/img'));
});

gulp.task('sprite', function () {
  return gulp.src('source/img/icon_*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('base64', function () {
  return gulp.src('build/css/style.min.css')
    .pipe(cssBase64({
      maxWeightResource: 5000, //50кб
      extensionsAllowed: ['.png', '.jpg']
    }))
    .pipe(gulp.dest('build/css'));
});

gulp.task('pug', function () {
  return gulp.src('source/pug/pages/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('generate-favicon', function (done) {
  realFavicon.generateFavicon({
    masterPicture: './source/img/helm.svg',
    dest: './build/img/favicon/',
    iconsPath: './img/favicon/',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#333333',
        margin: '21%',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {
        design: 'raw'
      },
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#4d2828',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        }
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#333333',
        manifest: {
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      },
      safariPinnedTab: {
        pictureAspect: 'blackAndWhite',
        threshold: 94.375,
        themeColor: '#5bbad5'
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false,
      readmeFile: false,
      htmlCodeFile: false,
      usePathAsIs: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function () {
    done();
  });
});

gulp.task('inject-favicon-markups', function (done) {
  gulp.src(['./build/*.html'])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(gulp.dest('./build/'));
  done();
});

gulp.task('check-for-favicon-update', function (done) {
  let currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function (err) {
    if (err) {
      throw err;
    }
  });
  done();
});

gulp.task('writePugMixinsFile', function (cb) {
  let allBlocksWithPugFiles = getDirectories('./source/pug/mixins/');
  let pugMixins = '//-' + doNotEditMsg.replace(/\n /gm, '\n  ');
  allBlocksWithPugFiles.forEach(function (blockName) {
    pugMixins += `include ../mixins/${blockName}\n`;
  });
  fs.writeFileSync('./source/pug/common/mixins.pug', pugMixins);
  return cb();
});

function getDirectories(path) {
  let source = path;
  let res = fs.readdirSync(source);
  return res;
}

gulp.task('copy', function () {
  return gulp.src([
      'source/fonts/**/*.{woff,woff2}',
      'source/img/**',
      'source//*.ico',
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});


gulp.task('delMixins', function () {
  return del('./source/pug/common/mixins.pug');
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('build', gulp.series('clean', 'delMixins', 'copy', 'index', 'css', 'base64', 'sprite', 'writePugMixinsFile', 'pug'));
gulp.task('start', gulp.series('build', 'server'));
gulp.task('prod', gulp.series('clean', 'delMixins', 'copy', 'webp', 'images', 'index-min', 'css', 'base64', 'sprite', 'writePugMixinsFile', 'pug', 'generate-favicon', 'check-for-favicon-update', 'inject-favicon-markups'));
