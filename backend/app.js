const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const userRatingRoutes = require("./routes/userData");
const userdata = require("./routes/SignupRoute/signup");
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(cors());
const events = require('events');

events.EventEmitter.defaultMaxListeners = 20;

app.use(express.json());

app.get("/api/badges", async (req, res) => {
    try {
      const response = await axios.get("https://leetcode-badge-showcase.vercel.app/api?username=viper_01");
      res.json(response.data); // Forward the API response to the frontend
    } catch (error) {
      console.error("Error fetching badges:", error.message);
      res.status(500).json({ error: "Error fetching badges" });
    }
  });

app.use('/api', userRatingRoutes);
app.use('/api',userdata);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log("Error connecting to MongoDB", err));

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
