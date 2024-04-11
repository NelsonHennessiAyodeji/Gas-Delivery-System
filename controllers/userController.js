const User = require("../model/User");
const { NotFoundError, BadRequestError } = require("../error");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("../utilities");
const searchPermissions = require("../utilities/searchPermissions");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");

  if (!users) {
    throw new NotFoundError("Unable to find all users");
  }

  res.status(StatusCodes.OK).json(users);
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password"); //TODO if allowed, get only user role users

  if (!user) {
    throw new BadRequestError("The id that you have provided does not exists");
  }

  searchPermissions(req.user, user._id);

  res.status(StatusCodes.OK).json(user);
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json(req.user);
};

const getWalletBalance = async (req, res) => {
  const { email } = req.params;
  // console.log(id);
  try {
    const user = await User.findOne({email});    
    // console.log(user);
    // console.log(user.walletBalance);
    res.status(StatusCodes.OK).json(user.walletBalance);    
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateUser = async (req, res) => {
  const { name, email } = req.body; //OPTIONAL TODO: add a password verification before saving the update
  const { userId } = req.user;

  if (!(name || email)) {
    throw new BadRequestError("Please provide a name and a password");
  }

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  const userToken = {
    userName: name,
    userEmail: email,
    userId: user._id,
    userWalletBalance: user.walletBalance,
    userRole: user.role
  };

  attachCookiesToResponse(res, userToken);
  res.status(StatusCodes.OK).json(userToken);
};

const updateWalletBalance = async (req, res) => {
  // console.log(req.body.walletBalance);
  const { walletBalance } = req.body;
  const { userId } = req.user;
  // console.log(walletBalance);

  if (walletBalance) {
    const user = await User.findOne({ _id: userId });
    // console.log(user);
  
    user.walletBalance = walletBalance;
    await user.save();
    // console.log(user.walletBalance);
    res.status(StatusCodes.OK).json(user.walletBalance);
  } else {
    res.status(400).json("There was an error, please retry");
  }

};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });

  if (!oldPassword || !newPassword) {
    throw new BadRequestError(
      "Please provide your old password and a new password"
    );
  }

  const isPasswordCorrect = await user.comparePasswords(oldPassword);

  if (!isPasswordCorrect) {
    throw new BadRequestError("Your old password is incorrect");
  }

  if (oldPassword === newPassword) {
    throw new BadRequestError("Your old and new password are matching");
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json("Your password was successfully changed");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  getWalletBalance,
  showCurrentUser,
  updateUser,
  updateWalletBalance,
  updateUserPassword
};
