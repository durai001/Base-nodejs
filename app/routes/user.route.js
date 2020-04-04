
let express = require('express');
let router = express.Router();
let UsersController = require('../controllers/userController');
 


router.get('/my_profile', UsersController.my_profile);
router.put('/update_my_profile', UsersController.update_my_profile);
router.delete('/delete_my_acc', UsersController.deleteUser);
router.put('/change_password', UsersController.changePassword);
// router.get('/all', UsersController.index);
// router.put('/editProfile', UsersController.editUser);
// router.put('/:id/updateUser', UsersController.updateUser);
// router.get('/userDeatails', UsersController.userDeatails);
// router.delete('/:id/deleteUser', UsersController.deleteUser);
// router.put('/update_profile_img', UsersController.updateProfileImg);

module.exports = router;
