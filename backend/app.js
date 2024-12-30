const express = require("express");
const mongoose = require("mongoose");
const userRatingRoutes = require("./routes/userData");
const userdata = require("./routes/SignupRoute/signup");
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(cors());
const events = require('events');

events.EventEmitter.defaultMaxListeners = 20;

app.use(express.json());

app.use('/api', userRatingRoutes);
app.use('/api',userdata);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log("Error connecting to MongoDB", err));

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
