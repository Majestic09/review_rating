const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { unlinkSync } = require("fs");
const userModel = require("../models/userModel");
const { transporter } = require("../services/emailService");

//function for create users
const createUser = async (req, res) => {
  const userData = new userModel(req.body);
  try {
    const isUserExists = await userModel.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExists) {
      req.file ? unlinkSync(req.file.path) : null;
      res.status(409).json({
        success: false,
        message: "User is already register with the email",
      });
    } else {
      //encryption of password
      const salt = await bcrypt.genSalt(10);
      userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);
      //where the file pic store in server
      const filePath = `/uploads/user/${req.file.filename}`;
      userData.profilePic = filePath;
      const user = await userData.save();
      res.status(201).json({
        message: "Registration Sucessfull",
        status: true,
        createUser: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error Occured ${err.message}`,
      status: false,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const userData = await userModel.findOne({ userEmail: req.body.userEmail });
    if (userData) {
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      if (userData && hashPassword) {
        const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({
          success: true,
          message: "User logged in sucessfully",
          accessToken: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "User is not reconised with this email",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error occured ${err.message}`,
    });
  }
};

const resetUserPassword = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const userData = await userModel.findOne({ userEmail: req.body.userEmail });
    if (userData != null) {
      const secret = userData._id + process.env.SECRET_KEY;
      const token = jwt.sign({ userID: userData._id }, secret, {
        expiresIn: "15m",
      });
      const link = `http://localhost:3000/user/reset-password/${userData._id}/${token}`;
      let info = await transporter.sendMail({
        from: "shoppingonline2109@gmail.com",
        to: userEmail,
        subject: "For reset your password",
        html: `<a href=${link}>Click on this for reset password</a>`,
      });
      return res.status(200).json({
        success: true,
        message: "Email sent successfully",
        token: token,
        userID: userData._id,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Please enter valid email",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error occured ${err.message}`,
    });
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  try {
    const checkUser = await userModel.findById(id);
    if (checkUser != null) {
      const seckretKey = checkUser._id + process.env.SECRET_KEY;
      jwt.verify(token, seckretKey);
      if (newPassword === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
        await userModel.findByIdAndUpdate(checkUser._id, {
          $set: { userPassword: bcryptPassword },
        });
        res.status(201).json({
          success: true,
          message: "Password updated successfully",
        });
      } else {
        res.status(403).json({
          success: false,
          message: "New password and confirm password does not match",
        });
      }
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: `Error occured ${err.message}`,
    });
  }
};

//function for get all users
const getUser = async (req, res) => {
  try {
    const userData = await userModel.find();
    res.status(200).json({
      message: "Got all user data",
      status: true,
      data: userData,
    });
  } catch (err) {
    res.send({
      message: "Error occured",
      status: false,
      error: err,
    });
  }
};

//function for update user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidator: true,
      }
    );
    res.send({
      message: "User updated sucessfully",
      status: true,
      updatedUser: updatedUser,
    });
  } catch (error) {
    res.send({
      message: "Unable to update user",
      status: false,
      error: err,
    });
  }
};

//function for delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {}
    );
    res.send({
      message: "User deleted sucessfully",
      status: true,
      deletedUser: deletedUser,
    });
  } catch (error) {
    res.send({
      message: "Unable to delete user",
      status: false,
      error: err,
    });
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  userLogin,
  resetUserPassword,
  resetPassword,
};
