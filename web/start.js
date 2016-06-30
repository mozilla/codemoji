'use strict';

const throng = require('throng');
const codemoji = require('./server');
const workers = process.env.WEB_CONCURRENCY || 1;

const start = function() {

  const server = codemoji.listen(process.env.PORT, function() {
    console.log(`Running server at: ${process.env.PORT}`);
  });

  const shutdown = function() {
    server.close(function() {
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

throng(workers, start);