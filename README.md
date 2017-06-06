<p align=center>
  <img src="https://xuffy.github.io/wms-logo.png" alt="" width="140">
</p>
<p align=center>
  网站后台管理系统模版
</p>

---

模版是基于layui前端UI框架，风格简单、舒适。[模版展示](https://xuffy.github.io/layui-wms/)

依赖模块
===
- `layui`
- `underscore-min.js`
- `mock.js`

启动说明
===
```
// 安装开发环境
$ npm i -g fis3
$ npm i

// 进入项目根目录
$ cd **

// 启动服务
$ npm run server

// 开发调试
$ npm run dev

// 发布项目
$ npm run pro
```

扩展模块(layui_modules)
===
### route.js
* setBreadcrumb&nbsp;&nbsp;&nbsp;&nbsp;_route.setBreadcrumb(params[, setting])
 ```
 每个模块应调用此方法显示当前位置导航。params显示导航参数,可配置导航点击后跳转业务模块。
 setting地址导航配置,现在可以配置是否显示导航。
 ```
 示例：
 ```
_route.setBreadcrumb(null, {hide: true}); //隐藏地址导航栏
_route.setBreadcrumb(['前一级目录', '当前目录']); //不配置点击后跳转
_route.setBreadcrumb(['前两级目录', {url: '业务模块路径', name: '前一级目录'}, '当前目录']); //配置点击后跳转
 ```

* go&nbsp;&nbsp;&nbsp;&nbsp;_route.go(url[, urlParams])
 ```
 业务模块之间相互跳转。url指向业务模块名，urlParams所需要传递的参数。
 ```
 示例：
 ```
 _route.go('user',{id:1});
 ```

* config&nbsp;&nbsp;&nbsp;&nbsp;_route.config
 ```
 设置跳转的业务模块路径，在app.js中配置。
 ```
 示例：
 ```
_route.config.base = 'modules/{0}/index.js';
 ```

* params&nbsp;&nbsp;&nbsp;&nbsp;_route.params
 ```
 获取上个页面传递到当前页面的参数。
 ```
 示例：
 ```
_route.params.id获取id参数
 ```


===
### view.js
* template&nbsp;&nbsp;&nbsp;&nbsp;_view.template(html)
 ```
 HTML模版。暂时只支持接收html字符串，在配合fis3工具下使用__inline('index.html')引入HTML。
 ```

* data&nbsp;&nbsp;&nbsp;&nbsp;_view.data(params)
 ```
 模板引擎数据。若视图中有需要渲染的数据，在初始化_view时params就必须传入对应的默认数据
 ```

* before&nbsp;&nbsp;&nbsp;&nbsp;_view.before()
 ```
 模版渲染之前执行函数。若在渲染模版之前异步获取数据，需要将请求return给before函数。
 若不是异步获取则不需要return。
 ```

* complete&nbsp;&nbsp;&nbsp;&nbsp;_view.complete(view)
 ```
 模版渲染完成后执行函数，返回view中所有对象。
 ```

* event&nbsp;&nbsp;&nbsp;&nbsp;_view.event(view)
 ```
 添加dom元素事件，每次模版渲染完成后都会执行该函数。返回view中所有对象。
 ```

* 示例
 ```
 // 初始化view
 var _view = new layui._view({
    template: __inline('index.html'),
    data: {
      list: [{"user": "詹姆斯"}, {"user": "周杰伦"}],
      pageSize: 8,
      pageNum: 1
    },
    before: getListData,
    event: addEvent
  });
  // 获取列表数据
function getListData(pageNum) {
  return _ajax.get({url: 'test', data: {pageNum: pageNum || 1}})
  .then(function (data) {
      _view.data.list = data.list;
      _view.data.pageSize = data.pageSize;
      _view.data.pageNum = data.pageNum;
    });
  }
  // 添加事件
  function addEvent(){
	  // ...
  }
 ```

更新日志
===
### v1.0.3
* 增加主题样式文件`styles/css/default.theme.css`，可以自定义主题颜色，或新增主题样式文件。
* 修改view.js若before函数未定义，视图初始化渲染后会自动调用`_view.render()`。
* 将login.html页面移动到app.js同级，login.css移动到`styles/css/login.css`。

### v1.0.2
* 解决view首次会渲染问题。在每次修改`_view.data`数据后，需调用`_view.render()`更新dom。

### v1.0.1
* 解决laytpl模块动态加载会多次调用接口问提。[laytpl文档](http://www.layui.com/doc/modules/laypage.html)

### v1.0.0
* 页面加载方式修改为资源加载
* `/src/modules`下每个业务模块入口文件修改为`index.js`
* 扩展layui模块view.js，实现视图渲染。

### v0.0.5
* 增加mock平台，在`app.js`中调用`_config.isMock = true`开启mock。mock的具体使用请查看[fis3](http://fis.baidu.com/fis3/docs/node-mock.html)和[mockjs](http://mockjs.com/examples.html)文档。

### v0.0.4
* 请求时增加进度条显示。
* 解决欢迎页面加载跳动问题

### v0.0.3
* 解决github文件名不能以“_”开头。

### v0.0.2
* 扩展layui模块ajax.js，基于jquery封装ajax请求，支持`_ajax.get`、`_ajax.post`请求。过滤返回参数，监听请求异常。
* 扩展layui模块config.js，在`_config.dev`中可设置环境变量，在`fis-conf.js`文件中会根据不同环境获取对应配置参数。

### v0.0.1
* 扩展layui模块route.js，`支持左边菜单跳转`、`设置面包屑导航`，在`_route.params`里可获取地址参数(JSON格式)，在`_route.config`里可设置模块路径配置。
* 模块化业务模块，modules目录下每个文件夹对应一个业务。

文档
===
[layui官网](http://www.layui.com/)&nbsp;&nbsp;&nbsp;&nbsp;[Fis3官网](http://fis.baidu.com/fis3/index.html)&nbsp;&nbsp;&nbsp;&nbsp;[Mock.js官网](http://mockjs.com/)&nbsp;&nbsp;&nbsp;&nbsp;
