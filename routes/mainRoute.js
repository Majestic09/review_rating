const express = require("express");
const userRouter = require("./userRoute");
const reviewRouter = require("./reviewRoutes");
const companyRouter = require("./companyRoutes");

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/review", reviewRouter);
mainRouter.use("/company", companyRouter);

module.exports = mainRouter;
