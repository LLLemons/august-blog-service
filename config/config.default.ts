import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
const path = require('path')
const os = require('os');

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1619755722991_6387';

  // add your egg config in here
  config.middleware = [];

  config.security = {
    csrf: false
  }

  config.logger = {
    dir: path.join(appInfo.baseDir, 'logs')
  }
  // config.mysql = {
  //   client: {
  //     host: 'localhost',
  //     port: '3306',
  //     user: 'admin',
  //     password: 'august0410',
  //     database: 'test'
  //   },
  //   app: true,
  //   agent: false
  // }
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'test',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: 'august0410',
  };
  

  config.secret = "august3760"

  config.middleware = ['errorHandle']
  config.errorHandler = {
    match: '/api',
  },

  config.multipart = {
    mode: 'stream',
    autoFields: false,
    defaultCharset: 'utf8',
    fieldNameSize: 100,
    fieldSize: '100kb',
    fields: 10,
    fileSize: '10mb',
    files: 10,
    fileExtensions: [],
    tmpdir: path.join(os.tmpdir(), 'egg-multipart-tmp', appInfo.name),
    cleanSchedule: {
      // run tmpdir clean job on every day 04:30 am
      // cron style see https://github.com/eggjs/egg-schedule#cron-style-scheduling
      cron: '0 30 4 * * *',
    },
  };


  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
