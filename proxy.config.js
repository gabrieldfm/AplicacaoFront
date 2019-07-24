const proxy = [
    {
      context: '/api',
      target: 'http://localhost:62109/api/task',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;