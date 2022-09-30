const express = require('express'); //package make creating a server very easy
const cors = require("cors"); //cross-origin helps to connect with front-end
const cookieParser = require("cookie-parser")
const path = require("path")
const connectDB = require("./config/db"); //database connection configuration file
// const cookieSession = require("cookie-session")

const app = express(); //create a express app
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

require("dotenv").config(); //for storing environment variable


const userRoutes = require("./routes/User")
const blogRoutes = require("./routes/Blog")

const PORT = process.env.PORT || 8080; //port number



app.use(cors({credentials: true,origin: "http://localhost:3000"}));

app.get('/',(req,res)=>res.send("Welcome to the backend of the blogging website")) //Home route

connectDB(); //Database connection


app.use('/api/user',userRoutes);
app.use("/api/blog",blogRoutes);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build","index.html"));
});


app.listen(PORT,()=>console.log("app is succesfully running on PORT no.",PORT)); //Server running on port 8080