
function authoriseAdmin(req, res, next) {
  if (req.user && req.user.userRole === "admin") {
    next();
  } else {
    res.status(403).json({
        success: false,
        message:"Your are not eligible for this! "
    });
  }
}

module.exports = authoriseAdmin;
