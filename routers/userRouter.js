const express = require('express');
const router = express();
const {
    authenticateUser,
    authorizePermissions
} = require('../middleware/authentication');
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    getWalletBalance,
    updateWalletBalance,
    updateUserPassword
} = require('../controllers/userController');

router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers);
router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/getWalletBalance/:email').get(authenticateUser, getWalletBalance);
router.route('/updateUser').put(authenticateUser, authorizePermissions('admin'), updateUser);
router.route('/updateWalletBalance').post(authenticateUser, updateWalletBalance);
router.route('/updateUserPassword').put(authenticateUser, updateUserPassword);
router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;