let config=require('./config').db.connection
var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: config.host,
      port: config.port, 
      user: config.user, 
      password: config.password, 
      database: config.database, 
    }
  });

  module.exports = knex;
 