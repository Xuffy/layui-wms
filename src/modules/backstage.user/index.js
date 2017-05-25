'use strict';

layui.use(['form', 'laypage', '_route', '_ajax', '_view'], function () {
  var form = layui.form()
    , laypage = layui.laypage
    , _route = layui._route
    , _ajax = layui._ajax
    , layer = layui.layer
    , _view = new layui._view('#dx-tpl');

  _ajax.get({url:'test?a=1'}).then(function (data) {
    console.log(data)
  });

  // console.log(_view.render())

  // 初始化当前位置
  _route.setBreadcrumb(['后台用户管理', '后台用户']);

  // 渲染表单
  form.render();

  // 自定义验证规则
  form.verify({
    username: function (value) {
      if (value.length > 20) {
        return '用户名称过长，请重新输入';
      }
    },
    phone: function (value) {
      if (value && (value.length > 11 || value.length < 6)) {
        return '请输入正确的联系方式';
      }
    }
  });

  // 分页初始化
  laypage({
    cont: 'dx-page-default'
    , pages: 20
    , first: 1
    , skin: '#6a96df'
    , jump: function (data) {
      layer.msg('显示第' + data.curr + '页');
    }
  });

  // 监听增加按钮
  $('#add,.user-info,.user-update').on('click', function () {
    _route.go('backstage.user.info', {type: $(this).attr('dx-type')});
  });

  // 监听禁用按钮
  $('.user-ban').on('click', function () {
    layer.confirm('确定禁用此账户吗？', {
      btn: ['确定', '取消'] //可以无限个按钮
    }, function (index, layero) {
      layer.msg('禁用了')
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