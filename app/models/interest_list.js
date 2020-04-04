let Bookshelf = require('./index');
let interest_list = Bookshelf.Model.extend({
  tableName: 'interest_list',
  hidden: ['is_delete'],

});

module.exports = Bookshelf.model('interest_list', interest_list);
