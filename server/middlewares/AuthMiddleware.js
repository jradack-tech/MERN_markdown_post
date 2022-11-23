// custom middleware create
const jwt_decode = require("jwt-decode");

module.exports = (req, res, next) => {
  console.log("Token:", req.headers.authorization);
  const { account } = jwt_decode(req.headers.authorization);
  if (account === process.env.ADMIN_WALLET) {
    next();
  } else {
    res.status(400).json({ error: "You are not admin" });
  }
};
