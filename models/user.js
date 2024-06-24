const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  contact: {
    type: String,
  },
  seat: {
    type: Array,
    default: []
  },
  price: {
    type: Number,
    default: 0,
  },
});

module.exports = new mongoose.model("user", userSchema);
