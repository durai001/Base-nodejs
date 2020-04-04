let Bookshelf = require('./index');
let user_professions = Bookshelf.Model.extend({
  tableName: 'user_professions',
  hidden: ['is_delete'],

});

module.exports = Bookshelf.model('user_professions', user_professions);
