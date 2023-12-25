const express = require("express");
const bodyparser = require("body-parser");
const app = express();

const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const adminRoutes = require("../route/Routes.js");
const userRoutes = require("../route/userRoute.js");

// for .env file
require('dotenv').config();

const mongoose = require("../connection/db.js");

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(cors());
app.use(cookieParser());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,'..','template','views'));

app.use("/public",express.static(path.join(__dirname,"../public")));
app.use("/uploads",express.static(path.join(__dirname,"../uploads")));

app.use("/api",adminRoutes);
app.use("/user",userRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`server is started 8080`);
})