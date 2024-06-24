var nodemailer = require("nodemailer");
const user = require("../models/user");
const storage = require("node-persist");
storage.init(/* options ... */);
var jwt = require("jsonwebtoken");
const movie = require("../models/movie");
// const user = require("../models/user");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "darshankakdiya21@gmail.com",
    pass: "reii kxfh sjly scnl",
  },
});

exports.adduser = async (req, res) => {
  const data = await user.create(req.body);

  res.status(200).json({
    status: 200,
    message: "User Successfully..!",
    data,
  });
};

exports.userlogin = async (req, res) => {
  const login_status = await storage.getItem("userlogin");
  if (login_status == undefined) {
    var data = await user.find({ email: req.body.email });
    if (data.length == 1) {
      var token = await jwt.sign({ id: data[0].id }, "user_token");
      await storage.setItem("userlogin", data[0].id),
        res.status(200).json({
          status: 200,  
          message: "User Login Successfully..!",
          token,
          data,
        });
    } else {
      res.status(201).json({
        status: 201,
        message: "Check Email & Password",
      });
    }
  } else {
    res.status(201).json({
      status: 201,

      message: "User Already Login",
    });
  }
};

exports.get = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await user.findById(id);
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "User data successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "An error occurred",
      error: error.message,
    });
  }
};

exports.userlogout = async (req, res) => {
  await storage.clear();
  res.status(200).json({
    status: 200,
    message: "User Logout Successfully..!",
  });
};

exports.confirmseat = async (req, res) => {
  let { movieId, seatNo, userId } = req.body;

  if (!Array.isArray(seatNo)) {
    return res.status(400).json({
      status: 400,
      message: "seatNo must be an array",
    });
  }

  try {
    let movieData = await movie.findById(movieId);
    let userData = await user.findById(userId);

    if (!movieData || !userData) {
      return res.status(404).json({
        status: 404,
        message: "Movie or User not found",
      });
    }

    let selectedSeats = [];
    let totalPrice = 0;

    movieData.seats = movieData.seats.map((seat) => {
      if (seatNo.includes(seat.seat)) {
        seat.userId = userId;
        selectedSeats.push(seat.seat);
        totalPrice += seat.price;
      }
      return seat;
    });

    await movie.findByIdAndUpdate(movieId, { seats: movieData.seats });
    await user.findByIdAndUpdate(userId, { seat: selectedSeats, price: totalPrice });

    var mailOptions = {
      from: "darshankakdiya21@gmail.com",
      to: userData.email,
      subject: "Your Ticket Booking Confirmation",
      html: `
        <h1>Thank you, ${userData.name}!</h1>
        <p>Your booking details are as follows:</p>
        <ul>
            <li>Seats: ${selectedSeats.join(', ')}</li>
            <li>Total Price: ${totalPrice}</li>
        </ul>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({
      status: 200,
      message: "Seat confirmed successfully",
      data: {
        userData:userData,
        seats: selectedSeats,
        totalPrice,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
