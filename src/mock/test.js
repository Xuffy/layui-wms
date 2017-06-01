'use strict';

var Mock = require('mockjs');

module.exports = function (req, res, next) {
  res.writeHead(200, {'Content-Type': 'application/json'});

  var data = Mock.mock({
    data:{
      'list|1-10': [{
        'user|+1': ['詹姆斯','周杰伦','刘德华','王宝强']
      }],
      "pageSize": 8
    }
  });


  res.end(JSON.stringify(data));
};