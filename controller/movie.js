const storage = require("node-persist");
storage.init(/* options ... */);

const movie = require("../models/movie");
// exports.addmovie = async(req,res) => {
//     req.body.image = req.file.originalname;
//     const data = await movie.create(req.body);
//     return res.status(200).json({
//         status:200,
//         message:"Movie Added Succesfully..!",
//         data
//     })
// }

exports.addmovie = async (req, res) => {
  try {
    // debugger
    const {
      name,
      description,
      image,
      screen,
      time,
      date,
      language,
      type,
      viewtype,
      silverseats,
      goldseats,
      diamondseats,
      silverprice,
      goldprice,
      diamondprice,
    } = req.body;

    let seats = [];
    let currentSeatNumber = 1;

    for (let i = 0; i < silverseats; i++) {
      seats.push({
        type: "Silver",
        seat: currentSeatNumber++,
        price: silverprice,
        userId: "",
      });
    }

    for (let i = 0; i < goldseats; i++) {
      seats.push({
        type: "Gold",
        seat: currentSeatNumber++,
        price: goldprice,
        userId: "",
      });
    }

    for (let i = 0; i < diamondseats; i++) {
      seats.push({
        type: "Diamond",
        seat: currentSeatNumber++,
        price: diamondprice,
        userId: "",
      });
    }

    // const images = req.file ? req.file.originalname : null;

    const login_status = await storage.getItem("login");
    const movies1 = new movie({
      name,
      image,
      description,
      screen,
      time,
      date,
      language,
      type,
      viewtype,
      silverseats,
      goldseats,
      diamondseats,
      silverprice,
      goldprice,
      diamondprice,
      seats,
      admin_id: login_status,
    });

    await movies1.save();
    return res
      .status(201)
      .json({ message: "Movie added successfully", movies1 });
  } catch (error) {
    console.error("Error adding movie:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatemovie = async (req, res) => {
  try {
    const id = req.params.id;
    const { silverseats, goldseats, diamondseats, silverprice, goldprice, diamondprice, ...otherUpdates } = req.body;

    const movieToUpdate = await movie.findById(id);
    if (!movieToUpdate) {
      return res.status(404).json({ message: "Movie not found" });
    }

    let seats = [];
    let currentSeatNumber = 1;

    const updateSeats = (seatType, newCount, newPrice) => {
      const currentSeats = movieToUpdate.seats.filter(seat => seat.type === seatType);
      const currentCount = currentSeats.length;

      if (newCount > currentCount) {
        for (let i = 0; i < newCount - currentCount; i++) {
          seats.push({
            type: seatType,
            seat: currentSeatNumber++,
            price: newPrice,
            userId: "",
          });
        }
      }

      currentSeats.slice(0, newCount).forEach(seat => {
        seat.price = newPrice;
        seat.seat = currentSeatNumber++;
        seats.push(seat);
      });
    };

    updateSeats('Silver', silverseats || movieToUpdate.silverseats, silverprice || movieToUpdate.silverprice);
    updateSeats('Gold', goldseats || movieToUpdate.goldseats, goldprice || movieToUpdate.goldprice);
    updateSeats('Diamond', diamondseats || movieToUpdate.diamondseats, diamondprice || movieToUpdate.diamondprice);

    for (let key in otherUpdates) {
      if (otherUpdates.hasOwnProperty(key)) {
        movieToUpdate[key] = otherUpdates[key];
      }
    }

    movieToUpdate.seats = seats;

    const updatedMovie = await movieToUpdate.save();

    return res.status(200).json({
      message: "Movie updated successfully",
      data: updatedMovie,
    });
  } catch (error) {
    console.error("Error updating movie:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deletemovie = async (req, res) => {
  var id = req.params.id;
  const data = await movie.findByIdAndDelete(id);
  res.status(200).json({
    status: 200,
    message: "Movie Delete Successfully..!",
  });
};

exports.getallmovie = async (req, res) => {
  const login_status = await storage.getItem("login");
  console.log(login_status);
  const data = await movie.find({ admin_id: login_status })
    .populate("screen")
    .populate("admin_id");
  res.status(200).json({
    status: 200,
    message: "All Movie Get Successfully..!",
    data,
  });
};

exports.getonemovie = async (req, res) => {
  var id = req.params.id;
  const data = await movie.findById(id).populate("screen").populate("admin_id");
  res.status(200).json({
    status: 200,
    message: "One Movie Get Successfully..!",
    data,
  });
};

exports.search = async (req, res) => {
  var { name, time, date } = req.body;
};
