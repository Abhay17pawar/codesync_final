const express = require("express");
const mongoose = require("mongoose");
const userRatingRoutes = require("./routes/userData");
require('dotenv').config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api', userRatingRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log("Error connecting to MongoDB", err));

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
