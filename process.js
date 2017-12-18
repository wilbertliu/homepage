module.exports = {
  apps: [
    {
      name: 'wilbertliu.com',
      script: './server.js',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
