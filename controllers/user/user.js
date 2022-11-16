const { validateEmail } = require("../../helpers/validation");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { generateUserToken } = require("../../helpers/token");
const Mark = require("../../models/Mark");

//user signup function
exports.register = async (req, res) => {
  try {
    const { enrollNum, email, password } = req.body;

    if (enrollNum == "" || email == "" || password == "") {
      return res.status(400).json({ message: "Please fill the form" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res
        .status(400)
        .json({ message: "This email address is already being used" });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    const user = await new User({
      enrollNum,
      email,
      password: cryptedPassword,
    }).save();

    const token = generateUserToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      enrollNum: enrollNum,
      email: user.email,
      token: token,
      picture: user.picture,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//userLogin
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email == "" || password == "") {
      return res.status(400).json({ message: "Please  fill the form." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "This email is not connected to account" });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = generateUserToken({ id: user.id.toString() }, "7d");
    res.send({
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
      enrollNum: user.enrollNum,
      picture: user.picture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//getMarkListData
exports.getMarkListData = async (req, res) => {
  try {
   
    const data = await Mark.find();
    
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "Mark list haven't published yet" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
