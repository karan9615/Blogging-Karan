const express = require("express"); //package make creating a server very easy
const cors = require("cors"); //cross-origin helps to connect with front-end
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./config/db");

const app = express(); //create a express app
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

require("dotenv").config(); //for storing environment variable

const userRoutes = require("./routes/User");
const blogRoutes = require("./routes/Blog");

// app.use(cors({credentials: true,origin: "http://localhost:3000"}));
// app.use(cookieSession({
//   name: "session",
//   keys: ["blogs"],
//   maxAge: 24*60*60*100,
// }))
// app.use(passport.initialize());
// app.use(passport.session());
app.use(cors());

connectDB(); //Database connection


app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}
app.listen(process.env.PORT || 8080, () =>
  console.log("app is succesfully running",process.env.PORT)
); //Server running on port 8080
