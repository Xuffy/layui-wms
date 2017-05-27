'use strict';

layui.use(['_route', 'form', '_view'], function () {
  var _route = layui._route
    , form = layui.form()
    , curPosition = ''
    , boxEle = $('.dx-info-box');



  // 视图渲染
  var _view = new layui._view({
    template: __inline('index.html'),
    event: addEvent
  });

  // 自定义验证规则
  form.verify({
    /*title: function (value) {
     if (value.length < 5) {
     return '标题至少得5个字符啊';
     }
     }
     , pass: [/(.+){6,12}$/, '密码必须6到12位']
     , content: function (value) {
     layedit.sync(editIndex);
     }*/
  });


  function addEvent() {
    // 渲染表单
    form.render();
    // 状态判断
    switch (_route.params.type) {
      case 'add':
        curPosition = '新增';
        boxEle.addClass('type-add');
        break;
      case 'update':
        curPosition = '修改';
        boxEle.addClass('type-update');
        break;
      case 'info':
        curPosition = '查看';
        boxEle.addClass('type-info').find('input,select').attr('disabled', 'disabled');
        break;
    }

    // 初始化当前位置
    _route.setBreadcrumb(['后台用户管理', {url: 'backstage.user', name: '后台用户'}, curPosition]);

    //监听提交
    form.on('submit(info)', function (data) {
      layer.alert(JSON.stringify(data.field), {
        title: '最终的提交信息'
      });
      return false;
    });
  }


});