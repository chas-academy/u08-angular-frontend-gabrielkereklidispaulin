require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const characterRoutes = require("./routes/characterRoutes");

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  });


mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

app.use("/characters", characterRoutes);

app.get("/", (req, res) => res.send("API is running..."));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
