const jwt = require("jsonwebtoken");
const Users = require("../models/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await Users.findOne({ _id: verifyToken._id });
    if (!rootUser) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    } else {
      res.status(200).json({ success: true, message: "Authorized" });
    }

    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized: Something went wrong" });
    console.log(error);
  }
};

module.exports = authenticate;
