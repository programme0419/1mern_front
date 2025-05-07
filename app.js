const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const Users = require("./models/userSchema");
const Message = require("./models/msgSchema");
const authenticate = require("./middleware/authenticate");
require("dotenv").config();
require("./db/conn");
//to get data and cookies from frontend
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Your frontend URL
    credentials: true, // Important for cookies/sessions
  })
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

//registeration
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("username", username);

    const createUser = new Users({
      username: username,
      email: email,
      password: password,
    });

    const created = await createUser.save();
    console.log(created);
    res.status(201).send("Registration Successful");
  } catch (error) {
    res.status(500).send("Registration Failed");
    console.log(error);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }
    const token = await user.generateToken();
    res.status(200).json({ success: true, message: "Login Successful", token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login Failed" });
    console.log(error);
  }
});
app.post("/message", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const message = req.body.message;
    console.log(username,email,message);
    const sendMsg = new Message({
      username: username,
      email: email,
      message: message,
    });
    const created = await sendMsg.save();
    if(created){
      res.status(201).send("Message Sent Successfully");
    }
    else{
      res.status(400).send("Message Not Sent");
    } 
  } catch (error) {
    res.status(500).send("Message Not Sent"); 
    console.log(error);
  } 
});
app.get("/logout", (req, res) => {
  res.clearCookie("jwtoken");
  res.status(200).send("Logout Successfully");
});
app.get("/auth", authenticate, (req, res) => {});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
