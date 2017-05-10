'use strict';

(function () {

  /**
   * 加载模块
   */
  layui.config({
    base: 'modules/'
  }).extend({
    common: 'common' // 通用模块
  });

  layui.use(['layer', 'element', 'common', 'form'], function () {
    var layer = layui.layer
      , element = layui.element()
      , form = layui.form()
      , common = layui.common;

    window.$ = layui.jquery;
    window.$common = common;

    // 监听修改密码点击
    $('#updatePassword-btn').on('click', function () {
      layer.open({
        type: 1,
        shadeClose: true,
        title: '修改密码',
        offset: '20%',
        content: $('#updatePassword')
      });
    });

    // 监听导航点击
    element.on('nav(menu)', function (elem) {
      var mUrl = elem.attr('lps-menu');
      !_.isEmpty(mUrl) && common.MenuLink(mUrl);
    });

    // 监听修改密码提交
    form.on('submit(updatePassword)', function (data) {
      layer.alert(JSON.stringify(data.field), {
        title: '最终的提交信息'
      });
      return false;
    });

    // 初始化欢迎页面
    common.NavTitle(null, {hide: true});

  });

})();