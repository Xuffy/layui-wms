'use strict';

layui.define(['laytpl'], function (exports) {
  var laytpl = layui.laytpl;

  function _view(el) {
    this.el = $(el);
    this.elHtml = $(el).html();
    // this.
  }


  _view.prototype.render = function (data) {
    var _this = this;

    laytpl(_this.elHtml).render({test: 'hello world'}, function (html) {
      _this.el.html(html);
    });
  };


  //输出view接口
  exports('_view', _view);
});