'use strict';

(function () {

  /**
   * 加载模块
   */
  layui.config({
    base: 'static/layui_extend/'
  }).extend({
    _route: '_route', // 通用模块
    _ajax: '_ajax', // ajax请求模块
    _config: '_config' // 配置模块
  });


})();