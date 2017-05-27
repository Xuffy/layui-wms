'use strict';

layui.use(['_route', '_view'], function () {
  var _route = layui._route;

  // 初始化当前位置
  _route.setBreadcrumb(['后台用户管理', {url: 'backstage.user', name: '权限维护'}]);

  // 视图渲染
  var _view = new layui._view({template: __inline('index.html')});

});