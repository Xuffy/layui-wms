'use strict';

layui.use(['form', 'laypage', '_route', 'laydate', '_view', '_ajax'], function () {
  var form = layui.form()
    , laypage = layui.laypage
    , _route = layui._route
    , layer = layui.layer
    , _ajax = layui._ajax
    , laydate = layui.laydate
    , startTime
    , endTime;

  // 初始化当前位置
  _route.setBreadcrumb(['后台用户管理', '后台角色']);

  // 视图渲染
  var _view = new layui._view({
    template: __inline('index.html'),
    data: {
      list: []
    },
    before: function () {
      var _this = this;
      return _ajax.get({url: 'test?a=1'}).then(function (data) {
        _this.data.list = data;
      });
    },
    event: addEvent
  });

  // 监听时间选择
  startTime = {
    min: '1910-01-01 23:59:59',
    max: '2099-01-01 23:59:59',
    choose: function (datas) {
      endTime.min = datas; //开始日选好后，重置结束日的最小日期
      endTime.start = datas; //将结束日的初始值设定为开始日
    }
  };

  endTime = {
    min: '1910-01-01 23:59:59',
    max: '2099-01-01 23:59:59',
    choose: function (datas) {
      startTime.max = datas; //结束日选好后，重置开始日的最大日期
    }
  };

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


  function addEvent() {
    // 渲染表单
    form.render();

    // 分页初始化
    laypage({
      cont: 'dx-page-default'
      , pages: 20
      , first: 1
      , jump: function (data) {
        layer.msg('显示第' + data.curr + '页');
      }
    });

    $('#startTime').on('click', function () {
      startTime.elem = this;
      laydate(startTime);
    });

    $('#endTime').on('click', function () {
      endTime.elem = this;
      laydate(endTime);
    });


    // 监听增加按钮
    $('#add,.user-info,.user-update').on('click', function () {
      _route.go('backstage.role.info', {type: $(this).attr('dx-type')});
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

  }

});