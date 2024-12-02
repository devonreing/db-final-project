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

app.use(express.static(path.join(__dirname)));


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


app.get("/api/menuitems", (req, res) => {
  const query = "SELECT name, description, price, image_url, type FROM menuitems";
  con.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching menu items:", err);
      res.status(500).send("Error fetching menu items.");
    } else {
      res.json(results);
    }
  });
});
