'use strict';

var Mock = require('mockjs');

module.exports = function (req, res, next) {
  res.writeHead(200, {'Content-Type': 'application/json'});

  var data = Mock.mock({
    'data|1-20': [{
      'id|+1': 1
    }]
  });


  res.end(JSON.stringify(data));
};