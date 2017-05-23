'use strict';

layui.define(['layer', 'element'], function (exports) {
  var layer = layui.layer
    , element = layui.element()
    , _route = {
    params: {}, // 当前页面地址参数
    config: { // 路由跳转配置
      base: '' // 模块路径配置
    }
  };


  /**
   * 左边菜单跳转
   * @param url          跳转地址
   * @param urlParams    传递参数
   * @constructor
   */
  _route.go = function (url, urlParams) {
    var shade = $('.index-shade-ban')
      , progressNum = 0
      , progressTimer = null;

    // 初始化链接参数
    _route.params = {};

    if (!_.isEmpty(urlParams)) {
      _route.params = urlParams; // 链接参数赋值
    }

    url = this.config.base ? this.config.base.format(url) : url;

    // 显示进度条
    /*$('#dx-progress-page').removeClass('layui-hide');

    progressTimer = setInterval(function () {
      progressNum = progressNum + Math.random() * 10 | 0;
      element.progress('request-progress', progressNum + '%');
    }, 300 + Math.random() * 1000);*/

    // 请求页面
    $.ajax({
      url: url,
      type: 'GET',
      complete: function () {
      },
      success: function (data) {
        $('#dx-content').html(data);
        /*// 进度条全部加载
        clearInterval(progressTimer);
        element.progress('request-progress', '100%');
        setTimeout(function () {
          $('#dx-progress-page').addClass('layui-hide');
        }, 300);*/
      }
    });
  };

  /**
   * 设置面包屑导航
   * @param params
   * @param setting
   * @constructor
   */
  _route.setBreadcrumb = function (params, setting) {
    var htmlStr = '', set = setting || {};

    if (set.hide) {
      return $('.dx-breadcrumb').addClass('layui-hide');
    } else {
      $('.dx-breadcrumb').removeClass('layui-hide');
    }

    if (!_.isEmpty(params)) {
      _.map(params, function (val, index) {
        var tFirst, tLast;

        if (params.length === index + 1) {
          tFirst = '<cite>';
          tLast = '</cite></a>';
        } else {
          tFirst = '';
          tLast = '<span class="layui-box">&gt;</span></a>';
        }

        if (_.isObject(val)) {
          htmlStr += '<a href="javascript:void(0);" url="' + val.url + '">' + tFirst + val.name + tLast;
        } else {
          htmlStr += '<a href="javascript:void(0);">' + tFirst + val + tLast;
        }
      });
      $('.layui-breadcrumb').html(htmlStr);

      // 监听面包屑导航点击
      $('.dx-breadcrumb a').on('click', function () {
        var url = $(this).attr('url');
        if (!_.isEmpty(url)) {
          _route.go(url);
        }
      });
    }
  };

  //输出_route接口
  exports('_route', _route);
});