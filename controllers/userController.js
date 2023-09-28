const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
//function for create users
const createUser = async (req, res) => {
  const userData = new userModel(req.body);
  try {
    const isUserExists = await userModel.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExists) {
      res.status(409).json({
        success: false,
        message: "User is already register with the email",
      });
    } else {
      //encryption of password
      const salt = await bcrypt.genSalt(10);
      userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);
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
        res.status(200).json({
          success: true,
          message:"User Logged in Sucessfully"
        })
      } else {
        res.status(401).json({
          success: false,
          message:"Invalid Credentials"
        })
      }
    } else {
      res.status(403).json({
        success: false,
        message:"User is not reconised with this email"
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message:`Error occured ${err.message}`
    })
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
      message: "Error Occured ",
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
      message: "user updated sucessfully",
      status: true,
      updatedUser: updatedUser,
    });
  } catch (error) {
    res.send({
      message: "unable to update user",
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
      message: "user deleted sucessfully",
      status: true,
      deletedUser: deletedUser,
    });
  } catch (error) {
    res.send({
      message: "unable to delete user",
      status: false,
      error: err,
    });
  }
};
module.exports = { createUser, getUser, updateUser, deleteUser,userLogin };
