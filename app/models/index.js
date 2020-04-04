let bookshelf, config, knex;

config = require('../../config/config').db;

knex = require('knex')(config);

bookshelf = require('bookshelf')(knex);

bookshelf.plugin('bookshelf-virtuals-plugin');

bookshelf.plugin(require('bookshelf-scopes'));

module.exports = bookshelf;

