const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');

const router = express.Router();

// THIS ROUTE IS ONLY FOR ANY AUTHANTICATION PROCESS!
router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updateMyPassword', authController.protect, authController.updatePassword);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.post('/verifyCode', authController.verifyTheEmailCode);
router.get('/count', authController.countCounter);

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;