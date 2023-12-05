const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Business = require("./models/business");
const ejsMate = require("ejs-mate");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/accgrantmap", {});

app.post("/showLocal", async (req, res) => {
  console.log("In show city route", req.params);
  let { city } = req.body;

  //uppercase first word in city
  city = city.charAt(0).toUpperCase() + city.slice(1);
  console.log(city);
  const allBusiness = await Business.find({ city });

  //console.log ("result of Mongo Search", allBusiness);
  res.render("showLocal", { allBusiness });
});

app.get("/showLocal/:id", async (req, res) => {
  const { id } = req.params;
  const business = await Business.findById(id);
  console.log(business);
  res.render("showTutor", { business });
});

app.get("/showLocal", async (req, res) => {
  console.log(req.body);
  const allBusiness = await Business.find({ city: "Charlottesville" });

  //console.log ("result of Mongo Search", allBusiness);
  res.render("showLocal", { allBusiness });
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.get("/showTutor", async (req, res) => {
  res.render("showTutor");
});

app.get("/map", async (req, res) => {
  const allBusiness = await Business.find({});
  console.log("hit map route");
  console.log("result of Mongo Search", allBusiness);
  res.render("map", { allBusiness });
});

app.get("/*", async (req, res) => {
  res.render("search");
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
