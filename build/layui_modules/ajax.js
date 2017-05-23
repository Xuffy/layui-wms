'use strict';

layui.define(['_config'], function (exports) {
  var _ajax = {}
    , _config = layui._config;

  /**
   * GET请求
   * @param params
   */
  _ajax.get = function (params) {
    params.type = 'GET';
    return ajaxCustom(params);
  };

  /**
   * POST请求
   * @param params
   */
  _ajax.post = function (params) {
    params.type = 'POST';
    return ajaxCustom(params);
  };

  /**
   * 自定义AJAX请求，过滤参数，返回验证
   * @param params 接口参数：
   * @returns {*}
   */
  function ajaxCustom(params) {
    // params.type = params.type || 'GET';
    // params.url = $.config.env.api + params.url;
    params.url = _config.env.api + params.url;

    params.dataType = 'json';
    params.contentType = 'application/json';

    params.data = JSON.stringify(params.data);


    // 数据返回
    return $.ajax(params).error(function (e) {
      if (e.status !== 200) {
        throw new Error('[_ajax.modules] api error state - ' + e.status + ' ' + params.url);
      }
    }).then(function (data) {
      if (_.isEmpty(data)) {
        throw new Error('[_ajax.modules] api no return value ' + params.url);
      }
      return data.data || [];
    });
  }


  //输出ajax接口
  exports('_ajax', _ajax);
});