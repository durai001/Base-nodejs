
let express = require('express');
let router = express.Router();
let UsersController = require('../controllers/userController');
 


router.get('/my_profile', UsersController.my_profile);
router.get('/get_all_users', UsersController.get_all_users);
router.put('/update_my_profile', UsersController.update_my_profile);
router.delete('/delete_my_acc', UsersController.deleteUser);
router.put('/change_password', UsersController.changePassword);
router.get('/get_user_details', UsersController.userDeatails);
// router.put('/update_profile_img', UsersController.updateProfileImg);

module.exports = router;
