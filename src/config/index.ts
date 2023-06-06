import developmentConfig from './env/development.js';
import productionConfig from './env/production.js';
import testConfig from './env/test.js';

interface Config {
  readonly [key: string]: any
}

function getConfig(): Config {
  const environment = process.env.NODE_ENV || 'development';

  switch (environment) {
    case 'production':
      return productionConfig;
    case 'test':
      return testConfig;
    default:
      return developmentConfig;
  }
}

export default getConfig();
