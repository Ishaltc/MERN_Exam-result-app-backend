const mongoose = require("mongoose");
const markSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    enrollNum: {
      type: Number,
      trim: true,
      unique: true,
    },
    course: {
      type: String,
      required: true,
    },

    chemistry: {
      type: "String",
    },
    physics: {
      type: "String",
    },
    maths: {
      type: "String",
    },
    total: {
      type: "Number",
    },
    statusInfo: {
      type: "String",
    },
    createdBy: {
      type: "String",
      require: true,
    },
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Mark", markSchema);
