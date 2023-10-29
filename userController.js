const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });

    return newObj;
}

exports.getAllUsers = catchAsync(async (req, res, next) => {

    const users = await User.find();

    //SENDING BACK TO THE RESPONSE
    res.status(200).json({
        status: 'success',
        totalUser: users.length,
        data: {
            users
        }
    });
});


exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};
exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};
exports.updateUser = catchAsync(async (req, res, next) => {


    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!user) {
        return next(new AppError('user id is invalid', 400));
    }


    res.status(200).json({
        status: 'sucess',
        data: user
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        // return: we used return here for immidietly go to the in "globa-error-handler" and don't run after this code!
        return next(new AppError('Invalid user Id', 404));
    }

    //SENDING BACK TO THE RESPONSE
    res.status(200).json({
        status: 'success',
        data: {
            user: null
        }
    });
});


//update Me

exports.updateMe = catchAsync(async (req, res, next) => {
    //check if user POsted password for update
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError("This route is only for user update not password update.. use 'reset Password or forgot Password' to update the password", 400));
    }

    //filteration
    const filterBody = filterObj(req.body, 'name', 'email');

    //update the user
    const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
        new: true,
        runValidators: true
    });

    // Send back response to the user
    res.status(200).json({
        status: "success",
        data: {
            user: updateUser
        }
    });
});


exports.deleteMe = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: "success"
    });

});