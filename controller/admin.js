var admin = require("../models/admin");
const bcrypt = require('bcrypt');
const storage = require('node-persist');
storage.init( /* options ... */);
var jwt = require('jsonwebtoken');

exports.addAdmin = async (req, res) => {
    const bpassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = bpassword;
    const data = await admin.create(req.body)

    return res.status(200).json({
        status: 200,
        message: "Admin Register successfully",
        type: "MBS",
        data: data
    })
}


exports.login = async (req, res) => {
    var data = await admin.find({ email: req.body.email })
    if (data.length == 1) {
        bcrypt.compare(req.body.password, data[0].password, async (error, result) => {
            if (result == true) {
                var token = await jwt.sign({ id: data[0].id }, "token_key");
                await storage.setItem('login', data[0].id),
                    res.status(200).json({
                        status: 200,
                        message: "Login Successfully..!",
                        token
                    })
            }
            else {
                res.status(201).json({
                    status: 201,
                    message: "Email & Password"
                })
            }
        })
    }
    else {
        res.status(201).json({
            status: 201,
            message: "Check Email & Password"
        })
    }
}


exports.logout = async (req, res) => {
    await storage.clear();
    res.status(200).json({
        status: 200,
        message: "Admin Logout Successfully..!"
    })
}