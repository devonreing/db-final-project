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
app.get("/", (req, res) => {
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
  /*
  const query = "SELECT name, description, price, image_url, type FROM menuitems";

    con.query(query, function(err, results, fields) {
        if (err)
            throw err;
        else {
            // start creating the order html page
        }
    });
   */
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/orders", (req, res) => {
    const {username, food_id, quantity } = req.body;
    const sql_query = "insert into orders (id, user_name, food_id, quantity, order_time, status, delivery_method)" +
        "values (id, ?, ?, ?, current_timestamp(), \'pending\', \'pickup\')";
    //var sql_query = "insert into orders values(id, ${user_name}, ${food_id}, ${quan}, current_timestamp(), \'pending\', \'pickup\')";
    //var sql_query = "insert into orders values(id, '" + user_name + "','" + food_id + "','" + quantity + "','" + order_time + "','" + status + "','" + delivery_method + "')";

    con.query(sql_query, [username, food_id, quantity], (err, result) => {
        if (err)
            res.send("Illegal Query" + err);
        else {
            console.log(sql_query);
            res.send("<h2>Order Confirmed!</h2>");
            //res.redirect("http://localhost:3000/orders.html");
        }


    });
    //res.sendFile(path.join(__dirname, "checkout.html"));
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

app.get("/api/menuitemsfororder", (req, res) => {
    const query = "SELECT food_id, name, description, price, image_url, type FROM menuitems";
    con.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching menu items:", err);
            res.status(500).send("Error fetching menu items.");
        } else {
            console.log(results);
            res.json(results);
        }
    });
});

// Fetch reviews from the database
app.get("/api/reviews", (req, res) => {
  const query = "SELECT reviewer_name, rating, review_text, created_at FROM review ORDER BY created_at DESC";
  con.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).send("Error fetching reviews.");
    } else {
      res.json(results);
    }
  });
});

// GET action to fetch the available times for a reservation (one reservation for one time slot)

app.get("/available-times", (req, res) => {
    console.log("Request to get available times has been received.")
    // Get the date from the query parameters
    const date  = req.query.date;

    // Query to find all the pre-existing reservations for the given date
    const query = "SELECT reservation_time FROM reservations WHERE reservation_date = ?";

    con.query(query, [date], (err, result) => {
        if (err) {
            console.error("Error fetching reservations:", err);
            res.status(500).send("Error fetching available times. Please try again.");
            return;
        }
        console.log(result);

        // Array of reserved times
        const reservedTimes = result.map(row => {
            const time = row.reservation_time;
            return time.slice(0, 5);  // Remove the seconds part (HH:mm)
        });
        console.log(reservedTimes)

        // Generate available time slots (10 AM to 10 PM in 30 minute intervals)
        const availableTimes = [];
        const startTime = 10; // 10:00 AM
        const endTime = 22;   // 10:00 PM
        const step = 30;      // 30 minute intervals

        // Check each time slot and add it to the available list if it's not already reserved

        for (let hour = startTime; hour < endTime; hour++) {
            for (let minute = 0; minute < 60; minute += step) {
                const timeFormatted = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                if (!reservedTimes.includes(timeFormatted)) {
                    availableTimes.push(timeFormatted);  // Only add if not already reserved
                }
            }
        }


        // Send the available times back to the client
        res.json(availableTimes);
    });
});

