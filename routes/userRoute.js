const userController = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/user/createuser", userController.createUser);
userRouter.get("/getallusers", userController.getUser);
userRouter.patch("/update/:id", userController.updateUser);
userRouter.delete("/delete/:id", userController.deleteUser);
userRouter.post("/user/login", userController.userLogin);

module.exports = userRouter;
