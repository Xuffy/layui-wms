<p align=center>
  <img src="http://thumbnail0.baidupcs.com/thumbnail/b0d21442b3e040c22f5dcc2e52a5395f?fid=1762385667-250528-1029638240726503&time=1495522800&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-rYmG%2bGZpEi4x8mBiEF2EYsirk98%3d&expires=8h&chkbd=0&chkv=0&dp-logid=3308104998544923111&dp-callid=0&size=c1920_u1080&quality=90" alt="" width="140">
</p>
<p align=center>
  网站后台管理系统模版
</p>

---

模版是基于layui前端UI框架，风格简单、舒适。

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

更新日志
===
### v0.0.5
* 增加mock平台，在`app.js`中调用`_config.isMock = true`开启mock。mock的具体使用请[查看`fis3`和`mockjs`文档](#docs)。

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

<span id = "docs">文档</span>
===
[layui官网](http://www.layui.com/)<br>
[Fis3官网](http://fis.baidu.com/fis3/index.html)<br>
[Mock.js官网](http://mockjs.com/)<br>
