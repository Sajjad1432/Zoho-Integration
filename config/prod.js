// prod.js - production keys here!!!
module.exports = {
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  jwtCookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
  environment: process.env.NODE_ENV,
  port: process.env.PORT
};