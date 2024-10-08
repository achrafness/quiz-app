const CustomError = require("../errors");
const { isTokenValid } = require("../utils");
const { attachCookiesToResponse } = require("../utils");
const Token = require("../models/TokenUser");
const authenticate = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      console.log(payload);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken);
    console.log(payload);
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !(existingToken?.isValid)){
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
    req.user = payload.user;
    attachCookiesToResponse({res,user:payload,refreshToken:existingToken.refreshToken})
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { authenticate };
