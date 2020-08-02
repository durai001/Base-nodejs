
let express = require('express');
let router = express.Router();
let passport = require('passport');
require('../../config/passport')(passport)
let _=require("lodash")
router.get('/', (req,res)=>{
    res.send("Welcome To EasyChat")
});

function isAuthenticated(req, res, next) {
    passport.authenticate('jwt', { session: false }, function (err, user, message) {
        console.log(err)
        if (message&&_.isObject(message)&& !toJSON(message).isJoi) {
            message = toJSON(message).message;
        }
        if (err) return next(err);
        if (!user) return res.status(401).json({ status: "Failed", statusCode: 402, message });
        req.user = user;
        next();
    })(req, res, next);
}

router.use('/auth', require('./auth'));
router.use('/user', isAuthenticated, require('./user.route'));

module.exports = router;
