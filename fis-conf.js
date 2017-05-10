'use strict';

fis.hook('relative');

fis.set('fileURL', './dist');


fis.set('project.ignore', [
  'dist/**',
  'fis-conf.js'
]).match('::image', {
  useHash: true
}).match('*.js', {
  // optimizer: fis.plugin('uglify-js')
}).match('*.css', {
  optimizer: fis.plugin('clean-css')
}).match('*.png', {
  optimizer: fis.plugin('png-compressor')
});

fis
  .media('pro')
  .set('project.ignore', [
    'dist/**',
    'fis-conf.js'
  ]).match('**', {
  relative: true
}).match('*.js', {
  optimizer: fis.plugin('uglify-js')
}).match('*.css', {
  optimizer: fis.plugin('clean-css')
}).match('*.png', {
  optimizer: fis.plugin('png-compressor')
}).match('**', {
  deploy: fis.plugin('local-deliver', {
    to: fis.get('fileURL')
  })
}).match('::image', {
  useHash: true
});