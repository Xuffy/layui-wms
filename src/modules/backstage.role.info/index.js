'use strict';

layui.use(['form', '_route'], function () {
  var form = layui.form()
    , _route = layui._route
    , layer = layui.layer
    , curPosition = ''
    , boxEle = $('.dx-info-box');

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
      boxEle.addClass('type-info').find('input[type="checkbox"]').attr('disabled', 'disabled');
      break;
  }

  // 初始化当前位置
  _route.setBreadcrumb(['后台用户管理', {url: 'backstage.user', name: '后台角色'}, curPosition]);

  // 渲染表单
  form.render();

  // 监听checkbox点击
  form.on('checkbox(checkbox)', function (data) {
    var pck = $(data.elem).parent().parent();

    // 判断是否全选
    if ($(data.elem).attr('parentCheckBox')) {
      if (data.elem.checked) {
        pck.find('.layui-form-checkbox').addClass('layui-form-checked');
        _.map(pck.find('input[type="checkbox"]'), function (val) {
          val.checked = true;
        });
      } else {
        pck.find('.layui-form-checkbox').removeClass('layui-form-checked');
        _.map(pck.find('input[type="checkbox"]'), function (val) {
          val.checked = false;
        });
      }
    } else {
      if (!data.elem.checked) {
        pck.find('input[parentCheckBox]').eq(0).next('.layui-form-checkbox').removeClass('layui-form-checked')[0].checked = false;
      }
    }
  });

  // 监听增加按钮
  $('#add,.user-info,.user-update').on('click', function () {
    _route.go('backstage.user.info', {type: $(this).attr('dx-type')});
  });


  // 监听禁用按钮
  $('.user-delete').on('click', function () {
    layer.confirm('确定删除此角色？', {
      btn: ['确定', '取消']
    }, function (index, layero) {
      layer.msg('删除了')
    });
  });


  // 监听提交按钮
  form.on('submit(search)', function (data) {
    layer.alert(JSON.stringify(data.field), {
      title: '最终的提交信息'
    });
    return false;
  });

});