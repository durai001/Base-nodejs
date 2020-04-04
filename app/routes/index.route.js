
let express = require('express');
let router = express.Router();
let passport = require('passport');
require('../../config/passport')(passport)
let isAuthenticated = passport.authenticate('jwt', {
    session: false
});

router.use('/auth', require('./auth'));
router.use('/user', isAuthenticated, require('./user.route'));

module.exports = router;
