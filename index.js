const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Import Routes
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

// Connect to DB
mongoose.connect(process.env.DB_CONNECT);

const db = mongoose.connection;

db.on("error", (err) => console.error("Big Error", err));
db.once("open", () => console.log("connected to db"));

// Middlewares
app.use(express.json());

// Route Middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postsRoute);

// Set template engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => console.log("Server up and running"));
