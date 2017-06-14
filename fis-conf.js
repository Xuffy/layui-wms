'use strict';


fis.hook('relative');

fis
  .match('**', {relative: true})
  .set('project.ignore', ['live/**', 'fis-conf.js', 'build/**', 'README.md', 'package.json', 'node_modules/**'])
  .match(/^\/src\/(.*)$/i, {
    useCache: false,
    release: '/$1'
  })
  .match('/src/app.js', {
    release: false
  })
  .match('/src/index.html', {
    release: '/index$1'
  })
  .match('**.css', {
    preprocessor: fis.plugin('autoprefixer', { // 自动生成CSS3兼容前缀
      "browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
      "cascade": true
    })
  })
  .match('**.js', {
    preprocessor: [
      fis.plugin('js-require-css')
    ]
  })
  .match(/^\/src\/styles\/font\/(.*)\.(html|css)/i, {
    release: false
  })
  .match(/^\/src\/styles\/css\/(header|index|menu)\.css/i, {
    release: false
  })
  .match('/src/modules/**/*.{html,css}', {
    release: false
  });
// .match('**.{png,jpg,gif}', {optimizer: fis.plugin('png-compressor')});


// 本地环境 默认使用mock
fis
  .media('mock')
  .match('*', {
    deploy: [
      fis.plugin('replace', {
        from: '__fis.env',
        to: 'mock'
      }),
      fis.plugin('local-deliver', {
        to: './live'
      })
    ]
  });

// 本地环境 默认不使用mock
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

// 发布到线上环境
fis
  .media('pro')
  .set('project.ignore', ['live/**', 'fis-conf.js', 'build/**', 'README.md', 'package.json', 'node_modules/**', '/src/mock/**'])
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