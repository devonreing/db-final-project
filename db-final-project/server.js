const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const app = express();
const port = 3000;

// Set up MySQL connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "finalProject"
});

// Connect to the database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

// Serve HTML pages
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/menu", (req, res) => {
  res.sendFile(path.join(__dirname, "menu.html"));
});

app.get("/reservations", (req, res) => {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

app.get("/orders", (req, res) => {
  res.sendFile(path.join(__dirname, "orders.html"));
});

// Start the server
app.listen(port, function () {
  console.log(`Server running on http://localhost:${port}`);
});
