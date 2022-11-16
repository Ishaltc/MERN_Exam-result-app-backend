const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  enrollNum: {
    type: Number,
    required: [true, "Enrolled Number is required"],
    text: true,
    ref: "Mark",
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    text: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/df4mlwr6i/image/upload/v1667491932/blank-profile-picture-g26a41c1f8_1280_sbctue.png",
  },
});


module.exports = mongoose.model("User", userSchema);