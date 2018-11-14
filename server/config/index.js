/**
 * Configuration file
 */
const dotenv = require('dotenv');
dotenv.config('../.env');

const currentEnvironment = process.env.NODE_ENV || 'development';
const envConfigs = {
    development: 'dev',
    production: 'prod',
    test: 'test'
};

module.exports = require(`./${envConfigs[currentEnvironment]}`);
