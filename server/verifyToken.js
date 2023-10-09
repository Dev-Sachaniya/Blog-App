const jwt = require("jsonwebtoken");

const verfiy = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(500).json("You aren't verified");
  }
  jwt.verify(token, process.env.SECRET, async (error, data) => {
    if (error) {
      return res.status(403).json("not valid token");
    }
    req.userId = data._id;
    next();
  });
};

module.exports = verfiy;
