let auth, express, passport, router;

express = require('express');

router = express.Router();

auth = require('../controllers/AuthController');

passport = require('passport');

// let paramValidation =  require('../app/models/model_validations');
// let validate = require('express-validation');

router.get('/get_roles', auth.getRoles);
router.get('/get_interest_list', auth.getInterestList);
router.get('/get_profession_list', auth.getProfesionList);
router.post('/login', auth.login);
router.post('/register', auth.register);
router.post('/forgot_password', auth.forgotPassword);
router.post('/reset_password', auth.resetPassword);



// router.post('/checkRequestBody', auth.checkRequestBody);
// router.get('/activate', auth.activate);
// router.post('/send_reset_password', auth.sendResetPassword);
// router.post('/change_password', auth.changePassword);
// router.post('/verify_token', auth.verifyToken);
// router.post('/sms', auth.smsverify);
// router.post('/social_register', auth.socialRegister);
// router.get('/get_all_users', auth.getAllUsers);
 
module.exports = router;
