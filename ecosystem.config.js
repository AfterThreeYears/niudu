module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'ssr',
      script: 'server.js',
      // watch: true,
      // instances: 4,
      // exec_mode: 'cluster',
      env_dev: {
        NODE_ENV: 'development',
      },
      env_prod: {
        NODE_ENV: 'production',
      },
    },

    // Second application
    {
      name: 'ssr-api',
      script: 'api/mock/index.js',
      // watch: true,
      // instances: 4,
      interpreter_args: '--harmony-async-await',
      // exec_mode: 'cluster',
      env_dev: {
        NODE_ENV: 'development',
      },
      env_prod: {
        NODE_ENV: 'production',
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  // deploy: {
  //   production: {
  //     user: 'node',
  //     host: '212.83.163.1',
  //     ref: 'origin/master',
  //     repo: 'git@github.com:repo.git',
  //     path: '/var/www/production',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //   },
  //   dev: {
  //     user: 'node',
  //     host: '212.83.163.1',
  //     ref: 'origin/master',
  //     repo: 'git@github.com:repo.git',
  //     path: '/var/www/development',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
  //     env: {
  //       NODE_ENV: 'dev',
  //     },
  //   },
  // },
};
