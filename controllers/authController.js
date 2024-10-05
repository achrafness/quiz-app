const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../models/User");
const TokenUser = require("../models/TokenUser");

const { attachCookiesToResponse, createTokenUser } = require("../utils");

const crypto = require("crypto");

const register = async (req, res) => {
  // if more then 1 user in db don't allow to register
  const users = await User.find({});
  if (users.length > 0) {
    throw new CustomError.BadRequestError("Registration is closed");
  } else {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ user });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  if (user) {
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
    const token = createTokenUser(user);
    let refreshToken = "";
    const existingToken = await TokenUser.findOne({ userId: user._id });
    if (existingToken) {
        const { isValid } = existingToken;
        if (!isValid) {
            throw new CustomError.UnauthenticatedError("Invalid Credentials");
        }
        refreshToken = existingToken.refreshToken;
      attachCookiesToResponse({ res, user: token, refreshToken });
      res.status(StatusCodes.OK).json({ user: token });
      return;
    }
    console.log("doesnot existe");
    refreshToken = crypto.randomBytes(40).toString("hex");
    const userAgent = req.headers["user-agent"];
    const ip = req.ip;
    const userToken = {
      refreshToken,
      ip,
      userAgent,
      userId: user._id,
    };
    await TokenUser.create(userToken);
    attachCookiesToResponse({ res, user: token, refreshToken });
    res.status(StatusCodes.OK).json({ user: token });
    return;
  }
};

const logout = async (req, res) => {
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

module.exports = {
  login,
  logout,
  register,
};
