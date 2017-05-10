'use strict';

layui.define(function (exports) {
  var common = {
    LinkParams: {} // 跳转链接参数
  };

  /**
   * 面包屑导航
   * @param params
   * @param setting
   * @constructor
   */
  common.NavTitle = function (params, setting) {
    var htmlStr = '', set = setting || {};

    if (set.hide) {
      return $('.lps-breadcrumb').addClass('layui-hide');
    } else {
      $('.lps-breadcrumb').removeClass('layui-hide');
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
      $('.lps-breadcrumb a').on('click', function () {
        var url = $(this).attr('url');
        if (!_.isEmpty(url)) {
          common.MenuLink(url);
        }
      });
    }
  };

  /**
   * 左边菜单跳转
   * @param url          跳转地址
   * @param urlParams    传递参数
   * @constructor
   */
  common.MenuLink = function (url, urlParams) {
    var shade = $('.index-shade-ban');

    // 显示遮罩层
    shade.removeClass('layui-hide');

    // 初始化链接参数
    common.LinkParams = {};

    if (!_.isEmpty(urlParams)) {
      common.LinkParams = urlParams; // 链接参数赋值
    }

    // 请求页面
    $.ajax({
      url: url,
      type: 'GET',
      complete: function () {
        shade.addClass('layui-hide'); // 取消遮罩层
      },
      success: function (data) {
        $('#lps-content').html(data);
      }
    });
  };


  //输出common接口
  exports('common', common);
});