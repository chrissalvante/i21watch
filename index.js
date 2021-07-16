//const GulpClient = require('gulp');
const {
  src,
  dest,
  parallel,
  watch
} = require('gulp');

const uglify = require('gulp-uglify'),
      changed = require('gulp-changed'),
      argv = require('yargs').argv;

var deployment_path = argv.p + '/',
    module = argv.m,
    source_bin = (module === 'globalcomponentengine') ? './server/iRely.Web/bin/*.dll' : './server/irely.' + module + '.webapi/bin/*.dll',
    source_app = './app',
    source_irely = './irely',
    source_override = './override',
    source_appjs = './app';

function watchFiles() {

  watch(source_bin, () => src(source_bin).pipe(dest(deployment_path + 'bin')));
  watch(source_app, () => src(source_app + '/**/*').pipe(changed(source_app + '/**/*')).pipe(dest(deployment_path + 'debug/app/' + module)));

  if (module === 'globalcomponentengine') {
    watch(source_irely, () => src(source_irely + '/**/*').pipe(changed(source_irely + '/**/*')).pipe(dest(deployment_path + 'debug/irely')));
    watch(source_override, () => src(source_override + '/**/*').pipe(changed(source_override + '/**/*')).pipe(dest(deployment_path + 'debug/override')));
    watch(source_appjs, () => src(source_appjs + '/app.js').pipe(changed(source_appjs + '/app.js')).pipe(uglify()).pipe(dest(deployment_path)));
  }
}

exports.watch = parallel(watchFiles)

//GulpClient.task('i21-watch', parallel(watchFiles));