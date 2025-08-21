module.exports = {
  apps: [
    {
      name: 'help',
      port: '3000',
      exec_mode: 'cluster',
      instances: 1,
      max_memory_restart: '1000M',
      script: './.output/server/index.mjs'
    }
  ]
}
