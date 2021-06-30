module.exports = [
  {
    context: [ "/api", "/admin" ],
    target: 'http://backend-api-dev.example.com',
    changeOrigin: true
  }
]
