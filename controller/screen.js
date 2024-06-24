const screen = require("../models/screen");
const storage = require("node-persist");

storage.init(/* options ... */);

exports.addscreen = async (req, res) => {
  try {
    const login_status = await storage.getItem("login");
    if (!login_status) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized. Please log in.",
      });
    }

    req.body.admin_id = login_status;
    const data = await screen.create(req.body);

    return res.status(200).json({
      status: 200,
      message: "Screen added successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while adding the screen.",
      error: error.message,
    });
  }
};

exports.updatescreen = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await screen.findByIdAndUpdate(id, req.body, { new: true });

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: "Screen not found.",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Screen updated successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while updating the screen.",
      error: error.message,
    });
  }
};

exports.deletescreen = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await screen.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: "Screen not found.",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Screen deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while deleting the screen.",
      error: error.message,
    });
  }
};

exports.getallscreen = async (req, res) => {
  try {
    const login_status = await storage.getItem("login");
    if (!login_status) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized. Please log in.",
      });
    }

    const data = await screen.find({ admin_id: login_status });

    return res.status(200).json({
      status: 200,
      message: "All screens Get successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while retrieving screens.",
      error: error.message,
    });
  }
};

exports.getonescreen = async (req, res) => {
  try {
    const login_status = await storage.getItem("login");
    if (!login_status) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized. Please log in.",
      });
    }

    const id = req.params.id;
    const data = await screen.findOne({ _id: id, admin_id: login_status });

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: "Screen not found.",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Screen Get One successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error occurred while retrieving the screen.",
      error: error.message,
    });
  }
};
