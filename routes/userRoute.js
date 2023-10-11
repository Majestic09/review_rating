const userController = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();
const {
  registerUserValidation,
  loginUserValidation,
} = require("../validation/user/userDataValidation");
const { userUpload } = require("../middlewares/userUploads");


userRouter.post(
  "/createuser",
  userUpload.single("profilePic"),
  registerUserValidation,
  userController.createUser
);

userRouter.post("/login", loginUserValidation, userController.userLogin);
userRouter.post("/reset", userController.resetUserPassword);
userRouter.post("/resetpassword/:id/:token",userController.resetPassword)
userRouter.get("/getallusers", userController.getUser);
userRouter.patch("/update/:id", userController.updateUser);
userRouter.delete("/delete/:id", userController.deleteUser);

module.exports = userRouter;

