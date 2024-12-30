const bcrypt = require('bcrypt');
const { user } = require('../../models/userData');
const { generateToken } = require('../../auth/auth'); 

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token using the new `generateToken` function
    const token = generateToken(existingUser);  // Generate token here

    // Send the token along with the user's email and codeforces handle
    return res.status(200).json({
      message: "Login successful",
      token,  // Send JWT token back to the client
      email: existingUser.email,
      codeforces: existingUser.codeforces // Optional: Send Codeforces ID if you need
    });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signupController = async (req, res) => {
  const { name, email, password, codeforces } = req.body;

  if (!name || !email || !password || !codeforces) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      name,
      email,
      password: hashedPassword,
      codeforces,
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = { loginController, signupController };
