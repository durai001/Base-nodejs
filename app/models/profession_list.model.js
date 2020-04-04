let Bookshelf = require('./index');
let profession_list = Bookshelf.Model.extend({
  tableName: 'profession_list',
  hidden: ['is_delete'],

});

module.exports = Bookshelf.model('profession_list', profession_list);
