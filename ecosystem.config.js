module.exports = {
  apps: [
    {
      name: 'metronome',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3901,
        NODE_ENV: 'production'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
}; 