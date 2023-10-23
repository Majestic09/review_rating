const jwt = require("jsonwebtoken");

const tokenAuthentication = async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  console.log(req.headers);
  console.log("authHeader :", authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    let token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          success: false,
          message: "User is not authorize",
        });
      } else {
        req.user = decoded.userData; //adding key in the userData named user
        console.log(decoded.userData);
        next();
      }
    });
  } else {
    res.status(409).json({
      success: false,
      message: "Token not found",
    });
  }
};

module.exports = { tokenAuthentication };
