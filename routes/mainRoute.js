const express = require("express");
const userRouter = require("./userRoute");
const companyRouter = require("./companyRoutes");
const reviewRouter = require("./reviewRoutes");

const mainRouter = express.Router();
mainRouter.use("/user", userRouter);
mainRouter.use("/company", companyRouter);
mainRouter.use("/review", reviewRouter);
module.exports = mainRouter;
