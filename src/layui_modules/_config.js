'use strict';

layui.define(function (exports) {
  var _config = {};

  /**
   * 环境变量
   */
  _config.env = {
    develop: {
      api: 'http://192.168.0.200:8080/labpoo/',
      imageUrl: 'http://192.168.0.200:8080/labpoo/system/showPic/'
    },
    production: {
      api: '/labpoo/',
      imageUrl: '/labpoo/system/showPic/'
    }
  }['__fis.env'];


  //输出config接口
  exports('_config', _config);
});