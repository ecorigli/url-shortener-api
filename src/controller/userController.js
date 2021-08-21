const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      user = await User.findOne({ email }).select("-password");

      return res.status(400).json({ message: "User already exists", user });
    }

    user = new User(req.body);

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    await user.save();

    const payload = {
      User: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(400).send("Bad Request");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const matchPassword = await bcryptjs.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      User: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const authenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.id).select("-password");

    res.json({ user });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  authenticatedUser,
};
