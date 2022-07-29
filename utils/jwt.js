module.exports = {
  secret: process.env.NODE_ENV !== 'production' ? 'default-mesto-secret' : process.env.JWT_SECRET,
};
