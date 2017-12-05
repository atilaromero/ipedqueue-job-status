const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const pack = require('../package.json');
const assert = require('assert');
import config from 'config';

import  { materialStateByPath } from './routes/material-state-by-path';
import  { materialStatePut } from './routes/material-state-put';

const server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: config.port
});

server.route([
  materialStateByPath,
  materialStatePut,
]);

server.register([
  Inert,
  Vision,
  {
    register: HapiSwagger,
    options: {
      info: {
        'title': 'Test API Documentation',
        'version': pack.version,
      },
      documentationPath: '/docs'
    }
  }
], (err) => {
  assert(!err);
  server.start( (err) => {
    assert(!err);
    console.log('Server running at:', server.info.uri);
  });
});
