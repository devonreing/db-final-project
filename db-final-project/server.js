const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const app = express();
const port = 3000;



// Set up MySQL connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2Greenblankies",
  database: "finalProject"
});

// Connect to the database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());  // To parse JSON requests
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded data


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
});

app.get("/checkout", (req, res) => {
  res.sendFile(path.join(__dirname, "checkout.html"));
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

app.post("/reserve",(req,res)=>{
    console.log("Attempting to reserve date and time.")
    const {name, date, time, guests} = req.body;

    // insert query into reservations table
    const query = "INSERT INTO reservations (name, party_size, reservation_time, reservation_date) VALUES (?,?,?,?)";

    if (!name || !guests || !time || !date){
        console.log("Missing required fields. ");
    }

    // query execution
    con.query(query,[name, guests, time, date],(err,result)=>{
        if (err){
            console.error("Error inserting reservation: ",err);
            res.status(500).send("Error processing request. Please try again.");
            return;
        }
        console.log("Reservation added successfully.");

        // execute alert instead of navigating to new page
        res.send("            <html>\n" +
            "                <head>\n" +
            "                    <title>Reservation Confirmation</title>\n" +
            "                    <script type=\"text/javascript\">\n" +
            "                        alert(\"Reservation booked! Thank you for booking with us. We look forward to serving you!\");\n" +
            "                        window.location.href = \"/reservations\";  // Redirect back to the reservations page\n" +
            "                    </script>\n" +
            "                </head>\n" +
            "                <body>\n" +
            "                </body>\n" +
            "            </html>\n")
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





