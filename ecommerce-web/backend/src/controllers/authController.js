const User = require("../models/User");
const OTP = require("../models/Otp");
const jwt = require("jsonwebtoken");
const sendOTP = require("../utils/sendEmail");


// Send OTP
exports.sendOtp = async (req, res) => {

  try {

    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    await OTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    await sendOTP(email, otp);

    res.json({
      message: "OTP sent"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// Register
exports.register = async (req, res) => {

  try {

    const { name, email, password, otp } = req.body;

    const otpRecord = await OTP.findOne({ email })
      .sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({
        message: "OTP not found"
      });
    }

    if (String(otpRecord.otp) !== String(otp)) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        message: "OTP expired"
      });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    await OTP.deleteMany({ email });

    res.json({
      message: "User registered",
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// Login

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};