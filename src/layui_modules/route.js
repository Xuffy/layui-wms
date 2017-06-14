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

  window.ROUTE_HISTORY_STACK = window.ROUTE_HISTORY_STACK || [];


  // todo 路由历史栈 待完成...
  function routeHistory() {
    var rhs = ROUTE_HISTORY_STACK;

    console.log(this)
    /*this.setStack = function () {
      if (rhs.length >= 5) {
        _.rest(rhs);
      }
      rhs.push();
    };*/
  }

  /**
   * 左边菜单跳转
   * @param url          跳转地址
   * @param urlParams    传递参数
   * @constructor
   */
  _route.go = function (url, urlParams) {
    var shade = $('.index-shade-ban');

    // 初始化链接参数
    _route.params = {};

    if (!_.isEmpty(urlParams)) {
      _route.params = urlParams; // 链接参数赋值
    }

    url = this.config.base ? this.config.base.format(url) : url;

    $('#dx-content').html('<div id="dx-template"></div><script type="text/javascript" src="{0}"></script>'.format(url));

  };

  /**
   * 设置面包屑导航
   * @param params
   * @param setting
   * @constructor
   */
  _route.setBreadcrumb = function (params, setting) {
    var set = setting || {}
      , ele = $('.layui-breadcrumb');

    if (set.hide) {
      return $('.dx-breadcrumb').addClass('layui-hide');
    } else {
      $('.dx-breadcrumb').removeClass('layui-hide');
    }

    if (!_.isEmpty(params)) {
      ele.empty();
      _.map(params, function (val, index) {
        var $item;

        val = _.isObject(val) ? val : {name: val};


        if (params.length === index + 1) {
          $item = $('<a href="javascript:void(0);"><cite>{0}</cite></a>'.format(val.name));
        } else {
          $item = $('<a href="javascript:void(0);">{0}<span class="layui-box">&gt;</span></a>'.format(val.name));
        }

        $item.data('route', val);

        ele.append($item);
      });

      // 监听面包屑导航点击
      $('.dx-breadcrumb a').on('click', function () {
        var params = $(this).data('route');
        if (!_.isEmpty(params.url)) {
          _route.go(params.url, params.data | {});
        }
      });
    }
  };

  //输出_route接口
  exports('_route', _route);
});