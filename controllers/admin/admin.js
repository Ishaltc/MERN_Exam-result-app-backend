const { generateAdminToken } = require("../../helpers/token");
const { validateEmail } = require("../../helpers/validation");
const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const Mark = require("../../models/Mark");
const mongoose = require("mongoose");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email == "" || password == "") {
      return res.status(400).json({ message: "Please fill the form" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "invalid email address" });
    }

    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(400).json({ message: "Only admin can join" });
    }
    const check = await bcrypt.compare(password, admin.password);
    if (!check) {
      return res
        .status(400)
        .json({ message: "Invalid credentials.Please try again" });
    }

    const token = generateAdminToken({ id: admin._id.toString() }, "7d");

    res.send({
      id: admin._id,
      email: admin.email,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// add markList
exports.addNewMarkList = async (req, res) => {
  try {
    const { name, enrollNum, course, maths, physics, chemistry, createdBy } =
      req.body;
    if (
      name == "" ||
      course == "" ||
      maths == "" ||
      chemistry == "" ||
      physics == "" ||
      enrollNum == "" ||
      createdBy == ""
    ) {
      return res.status(400).json({ message: "Please fill the form" });
    }
    const user = await Mark.findOne({ enrollNum: enrollNum });
    if (user) {
      return res
        .status(400)
        .json({ message: "This student data has been added already" });
    }

    let statusInfo = "";
    const totalMark = parseInt(maths) + parseInt(physics) + parseInt(chemistry);
    if (totalMark >= 200) {
      statusInfo = "Pass";
    } else {
      statusInfo = "Fail";
    }
    const marks = await new Mark({
      name,
      enrollNum,
      course,
      chemistry,
      physics,
      maths,
      createdBy,
      statusInfo,
      total: totalMark,
    }).save();

    res
      .status(200)
      .json({ message: "New Mark list has been added successfully" });
  } catch (error) {
    res.status(500).json({
      message: error?.message,
    });
  }
};

//get students marks information
exports.getStudentsMarkInfo = async (req, res) => {
  try {
    const info = await Mark.find().sort({ createdAt: -1 });
    if (info) {
      res.status(200).json(info);
    } else {
      res.status(400).json({ message: "Marks list haven't added yet" });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message,
    });
  }
};

//delete a student mark list
exports.deleteMarkList = async (req, res) => {
  try {
    const { enrollNum } = req.params;
    const markList = await Mark.findOneAndDelete({ enrollNum });
    res.status(200).json({ message: "Mark removed successfully" });
  } catch (error) {
    res.status(500).json({
      message: error?.message,
    });
  }
};

exports.getMarkInfoForEdit = async (req, res) => {
  try {
    const { enrollNum } = req.params;
    const markList = await Mark.findOne({ enrollNum });
    res.status(200).json(markList);
  } catch (error) {
    res.status(500).json({
      message: error?.message,
    });
  }
};

//editing mark

exports.editingMark = async (req, res) => {
  try {
    const { maths, physics, chemistry } = req.body;
    const { enrollNum } = req.params;

    if (maths && maths !== "") {
      const data = await Mark.findOneAndUpdate({enrollNum}, {
        $set: { maths: maths },
      });
      return res
        .status(200)
        .json({ message: "Mark has been updated successfully" });
    }
    if (physics && physics !== "") {
      const data = await Mark.findOneAndUpdate({enrollNum}, {
        $set: { physics: physics },
      });
      return res
        .status(200)
        .json({ message: "Mark has been updated successfully" });
    }
    if (chemistry && chemistry !== "") {
      const update = { chemistry: chemistry };
      const data = await Mark.findOneAndUpdate({enrollNum}, update);
      
      return res
        .status(200)
        .json({ message: "Mark has been updated successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
