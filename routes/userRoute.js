const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../validation/user/userDataValidation");
const { userUpload } = require("../middlewares/userUploads");
const authoriseAdmin = require("../middlewares/authorization");

userRouter.post(
  "/createuser",
  userUpload.single("profilePic"),
  registerUserValidation,
  userController.createUser
);
userRouter.get("/getallusers", userController.getUser);
userRouter.post("/reset", userController.resetUserPassword);
userRouter.post("/login", loginUserValidation, userController.userLogin);
userRouter.patch("/update/:id",authoriseAdmin, userController.updateUser);
userRouter.post("/resetpassword/:id/:token", userController.resetPassword);
userRouter.delete("/delete/:id",authoriseAdmin, userController.deleteUser);

module.exports = userRouter;
