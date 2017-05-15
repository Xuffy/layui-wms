'use strict';


fis.hook('relative');

fis
  .match('**', {relative: true})
  .set('project.ignore', ['live/**', 'fis-conf.js', 'mock/**', 'build/**', 'README.md', 'package.json'])
  .match(/^\/src\/(.*)$/i, {
    useCache: false,
    release: '/$1'
  })
  .match('/src/app.js', {
    release: false
  })
  .match('/src/index.html', {
    release: '/index$1'
  });
// .match('**.{png,jpg,gif}', {optimizer: fis.plugin('png-compressor')});


fis
  .media('dev')
  .match('*', {
    deploy: [
      fis.plugin('replace', {
        from: '__fis.env',
        to: 'develop'
      }),
      fis.plugin('local-deliver', {
        to: './live'
      })
    ]
  });


fis
  .media('pro')
  .match('*.js', {
    optimizer: fis.plugin('uglify-js')
  })
  .match('*.css', {optimizer: fis.plugin('clean-css')})
  .match('*', {
    deploy: [
      fis.plugin('replace', {
        from: '__fis.env',
        to: 'production'
      }),
      fis.plugin('local-deliver', {
        to: './build'
      })
    ]
  });