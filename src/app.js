'use strict';

(function () {

  /**
   * 加载模块
   */
  layui.config({
    version: true,
    base: 'layui_modules/'
  }).extend({
    _route: 'route', // 通用模块
    _ajax: 'ajax', // ajax请求模块
    _config: 'config' // 配置模块
  });

  layui.use(['_route'], function () {
    var _route = layui._route;

    // 模块路由配置
    _route.config.base = 'modules/{0}/index.html';

  });

})();