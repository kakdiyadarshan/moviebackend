const screen = require("../models/screen");
const storage = require("node-persist");
storage.init(/* options ... */);

exports.addscreen = async (req, res) => {
  const data = await screen.create(req.body);

  return res.status(200).json({
    status: 200,
    message: "Screen Added successfully..!",
    data,
  });
};

exports.updatescreen = async (req, res) => {
  var id = req.params.id;
  const data = await screen.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    status: 200,
    message: "Screen Update Successfully..!",
  });
};

exports.deletescreen = async (req, res) => {
  var id = req.params.id;
  const data = await screen.findByIdAndDelete(id);
  res.status(200).json({
    status: 200,
    message: "Screen Delete Successfully..!",
  });
};

exports.getallscreen = async (req, res) => {
  const login_status = await storage.getItem("login");
  const data = await screen.find({ admin_id: login_status });
  res.status(200).json({
    status: 200,
    message: "All Screen Get Successfully..!",
    data,
  });
};

exports.getonescreen = async (req, res) => {
  var id = req.params.id;
  const data = await screen.findById({ _id: id, admin_id: login_status });
  res.status(200).json({
    status: 200,
    message: "One Screen Get Successfully..!",
    data,
  });
};
