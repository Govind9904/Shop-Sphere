const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req,res) =>{
    const { name, email, password } = req.body;

    try {
        // 1️⃣ Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        // 2️⃣ Hash password here
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3️⃣ Create user with hashed password
        const user = await User.create({
        name,
        email,
        password: hashedPassword,
        });

        res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        });
    }
    catch (err) {
    res.status(500).json({ message: err.message });
    }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    // 2️⃣ Compare password here
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    // 3️⃣ Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { register , login }