let Bookshelf = require('./index');
let user_interestes = Bookshelf.Model.extend({
  tableName: 'user_interestes',
  hidden: ['is_delete'],

});

module.exports = Bookshelf.model('user_interestes', user_interestes);
