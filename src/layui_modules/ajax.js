'use strict';

layui.define(['_config', 'element'], function (exports) {
  var _ajax = {}
    , element = layui.element()
    , _config = layui._config;

  /**
   * GET请求
   * @param params
   * @param config
   */
  _ajax.get = function (params, config) {
    params.type = 'GET';
    return ajaxCustom(params, config);
  };

  /**
   * POST请求
   * @param params
   * @param config
   */
  _ajax.post = function (params, config) {
    params.type = 'POST';
    params.data = JSON.stringify(params.data);
    return ajaxCustom(params, config);
  };

  /**
   * 自定义AJAX请求，过滤参数，返回验证
   * @param params 接口参数：
   * @param config
   * @returns {*}
   */
  function ajaxCustom(params, config) {
    var progress_timer = progress('start');

    config = _.extend({
      base: '', // 设置请求路径
      isMock: _config.isMock // 是否开启模拟数据
    }, config);

    params.url = (config.base || (config.isMock ? '/' : _config.env.api)) + params.url;

    params.dataType = 'json';
    params.contentType = 'application/json';


    // 数据返回
    return $.ajax(params)
      .error(function (e) {
        progress('error', progress_timer);

        if (e.status !== 200) {
          throw new Error('[_ajax.modules] api error state - {0} {1}'.format(e.status || '000', params.url));
        }
      })
      .then(function (data) {
        progress('success', progress_timer);

        if (_.isEmpty(data)) {
          throw new Error('[_ajax.modules] api no return value {0}'.format(params.url));
        }

        return data.data || [];
      });
  }


  /**
   * 进度条设置
   * @param type
   * @param progress_timer
   * @returns {number}
   */
  function progress(type, progress_timer) {
    var timeout = null
      , progress_num = 0
      , progress_ele = $('#dx-progress-page');

    switch (type) {
      case 'start': // 显示进度条
        var max_num = _.random(80, 99);
        progress_ele.removeClass('layui-hide').find('.layui-progress-bar').removeClass('dx-progress-red');

        return setInterval(function () {

          progress_num = _.random(progress_num, progress_num + 50 > max_num ? max_num : progress_num + 50);

          element.progress('request-progress', progress_num + '%');

        }, _.random(350, 500));
        break;
      case 'success':

        clearInterval(progress_timer);

        element.progress('request-progress', '100%');

        timeout = setTimeout(function () {

          clearTimeout(timeout);

          progress_ele.find('.layui-progress-bar').addClass('dx-progress-red');

          $('#dx-progress-page').addClass('layui-hide');

          element.progress('request-progress', '0%');

        }, 500);
        break;
      case 'error':

        progress_ele.find('.layui-progress-bar').addClass('dx-progress-red');

        clearInterval(progress_timer);

        element.progress('request-progress', '100%');

        timeout = setTimeout(function () {

          clearTimeout(timeout);

          $('#dx-progress-page').addClass('layui-hide');

          element.progress('request-progress', '0%');

        }, 1000);
        break;
    }


  }

  //输出ajax接口
  exports('_ajax', _ajax);
});