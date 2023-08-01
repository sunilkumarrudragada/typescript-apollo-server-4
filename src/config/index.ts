import developmentConfig from './env/development.js';
import productionConfig from './env/production.js';
import testConfig from './env/test.js';
import { IConfig } from '../types/config.js';
import errors from './errors.js';

function getConfig(): IConfig {
  const environment = process.env.NODE_ENV || 'development';

  switch (environment) {
  case 'production':
    return { ...productionConfig, errors };
  case 'test':
    return { ...testConfig, errors };
  default:
    return { ...developmentConfig, errors };
  }
}

export default getConfig();
