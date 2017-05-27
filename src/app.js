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
    _config: 'config', // 配置模块
    _view: 'view' // 视图渲染模块
  });

  layui.use(['_route', '_config'], function () {
    var _route = layui._route
      , _config = layui._config;

    /**
     * 模块路由配置
     * @type {string}
     * modules文件夹中存放的业务模块，每个文件夹就是一个模块，里面可以有css、js、html...
     * {0}对应每个业务模块
     * index.js为模块入口文件
     */
    _route.config.base = 'modules/{0}/index.js';

    // 开启模拟数据
    _config.isMock = true;

  });

})();