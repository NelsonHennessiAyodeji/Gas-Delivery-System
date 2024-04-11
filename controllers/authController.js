const User = require("../model/User");
const { attachCookiesToResponse } = require("../utilities");
const {
  BadRequestError,
  NotFoundError,
  NotAcceptableError,
  UnauthenticatedError
} = require("../error");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  // console.log(req.body);
  const {
    firstName,
    lastName,
    country,
    address,
    city,
    state,
    zipcode,
    phone,
    email,
    password

  } = req.body;
  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new BadRequestError(
      "The email that you have provided has already been registered, please use a different one"
    );
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  try {
    const user = await User.create({ 
      firstName,
      lastName,
      country,
      address,
      city,
      state,
      zipcode,
      phone,
      email,
      password,
      role
    });
    if (!user) {
      throw new BadRequestError("Please provide a valid username/email/password");
    }
  
    const name = firstName;
  
    const userToken = {
      userName: name,
      userEmail: email,
      userId: user._id,
      userWalletBalance: user.walletBalance,
      userRole: role
    };
    attachCookiesToResponse(res, userToken);
  
    res.status(StatusCodes.CREATED).json({
      user: {
        userName: userToken.userName,
        userEmail: userToken.userEmail,
        userFirstName: firstName,
        userLastName: lastName,
        userCountry: country,
        userAddress: address,
        userCity: city,
        userState: state,
        userZipcode: zipcode,
        userPhone: phone,
        userEmail: email,
        }
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new NotAcceptableError(
      "Can't accept blank fields, provide an email and a password to login"
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError(
      "The email that you have provided is not registered with us, please register this email then sign in"
    );
  }

  const passwordIsCorrect = await user.comparePasswords(password);

  if (!passwordIsCorrect) {
    throw new UnauthenticatedError("Password is incorrect, please try again");
  }

  const userToken = {
    userName: user.firstName,
    userEmail: email,
    userId: user._id,
    userWalletBalance: user.walletBalance,
    userRole: user.role
  };
  attachCookiesToResponse(res, userToken);
  
  res.status(StatusCodes.OK).json({
    userName: userToken.userName,
    userEmail: userToken.userEmail,
    userWalletBalance: user.walletBalance
  });
};

const details = async (req, res) => {
  try {
    const email = req.params.id;
    const user = await User.findOne({ email }); 
    if (user) {
      res.status(StatusCodes.CREATED).json({
        user: {
          userFirstName: user.firstName,
          userLastName: user.lastName,
          userCountry: user.country,
          userAddress: user.address,
          userCity: user.city,
          userState: user.state,
          userZipcode: user.zipcode,
          userPhone: user.phone,
          userEmail: user.email,
          }
      });
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error.message);
  }

};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now())
  });
  res.status(StatusCodes.OK).json("logged out");
};

module.exports = {
  register,
  login,
  details,
  logout
};
