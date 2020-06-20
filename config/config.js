

//Checking the environment
var env = process.env.NODE_ENV || 'development';

//We'll be using our config.json data in here.

var config = require('./config.json');

//We'll fetch environment configuration.
var envConfig = config[env];


//Add env. config values to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);

