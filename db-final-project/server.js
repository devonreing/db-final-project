//*** Erin Zahner, Devon Reing, Sarah Groark
//*** Database Management Systems 
//*** 12/9/2024
//*** Final Project


const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const app = express();
const port = 3000;



// Set up MySQL connection
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DBFinalProject5!",
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
            // html_body = "<h2>Order Confirmed!</h2></br>" +
            //     "<button type='button' onclick='deleteOrder()'> Delete Order </button>" +
            //     "<script src='orders2.js'></script>"
            // res.send(html_body);

            res.redirect("http://localhost:3000/order-confirmed?username=" + username + "&food_id=" + food_id + "&quantity=" + quantity);
        }


    });
    //res.sendFile(path.join(__dirname, "checkout.html"));
});


app.get("/order-confirmed", (req, res) => {
    res.sendFile(path.join(__dirname, "order-confirmed.html"));
});

app.post("/deleteOrder", (req, res) => {
    const {username, food_id, quantity} = req.body;

    sql_query = "delete from orders where user_name = ? and food_id = ? and quantity = ?";
    con.query(sql_query, [username, food_id, quantity], function (err, result, fields) {
        if (err)
            res.send("Illegal Query" + err);
        else {
            console.log(sql_query);
            // send success alert
            res.send("            <html>\n" +
                "                <head>\n" +
                "                    <title>Order Canceled</title>\n" +
                "                    <script type=\"text/javascript\">\n" +
                "                        alert(\"Order Canceled.\");\n" +
                "                        window.location.href = \"/\";  // Redirect back to the home page\n" +
                "                    </script>\n" +
                "                </head>\n" +
                "                <body>\n" +
                "                </body>\n" +
                "            </html>\n")
            //res.redirect("http://localhost:3000/")
        }
    });
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
            "                        window.location.href = \"/\";  // Redirect back to the reservations page\n" +
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

app.get('/get-res-info',(req,res)=>{
    console.log("Step 3. Attempting to pull reservation information.");
    //console.log(req);

    const reservationID = req.query['reservation-id'];

    if (!reservationID){
        return res.status(400).json({success: true, message: 'Reservation ID is required.'});
    }

    const query = 'SELECT * FROM reservations WHERE id = ?';

    con.query(query, [reservationID], (err,results)=>{

        if (err){
            return res.status(500).json({success:false, message:'Error fetching data from database.'});
        }

        if (results.length === 0){
            return res.status(404).json({success:false, message:'Reservation not found.'});
        }

        const reservation = results[0];

        console.log("RESERVATION: ");
        console.log(reservation);

        const unformattedTime = reservation.reservation_time;
        const [hour,minute] = unformattedTime.split(":");
        const time = to12HourFormat(hour,minute);

        res.json({
            success:true,
            reservation:{
                id: reservation.id,
                name: reservation.name,
                guests: reservation.party_size,
                date: reservation.reservation_date,
                unformattedTime: unformattedTime,
                time: time,
            }

        });

        console.log(reservation);
    });
});

function to12HourFormat(hour, minute) {
    const isPM = hour >= 12;
    const hour12 = hour % 12 || 12;  // Convert 0 (midnight) to 12
    const ampm = isPM ? 'PM' : 'AM';
    const minuteFormatted = minute.toString().padStart(2, '0');
    return `${hour12}:${minuteFormatted} ${ampm}`;
}


app.post("/update-res-info",(req,res)=> {
    console.log("Attempting to reserve date and time.")
    const {name, date, time, guests, id} = req.body;

    // insert query into reservations table
    const query = "UPDATE reservations SET name=?,party_size=?,reservation_time=?, reservation_date=? WHERE id=?";

    if (!name || !guests || !time || !date || !id) {
        console.log("Missing required fields. ");
    }

    // query execution
    con.query(query, [name, guests, time, date, id], (err, result) => {
        if (err) {
            console.error("Error inserting reservation: ", err);
            res.status(500).send("Error processing request. Please try again.");
            return;
        }
        console.log("Reservation added successfully.");

        // execute alert instead of navigating to new page
        res.json({success:true, message: "Reservation updated successfully! Thanks for booking with us!"});
    });

});


app.post('/delete-reservation',(req,res)=>{
    const reservationID = req.query.id;

    if(!reservationID){
        return res.status(400).json({success:false, message: "Reservation ID is required."});
    }

    const query = "DELETE FROM reservations WHERE id = ?";

    con.query(query, [reservationID], (err, result)=>{
        if (err){
            console.error("Error deleting reservation: ", err);
            return res.status(500).json({ success: false, message: "Error deleting reservation." });

        }

        if (result.affectedRows > 0) {
            res.json({ success: true, message: "Reservation deleted successfully." });
        } else {
            res.status(404).json({ success: false, message: "Reservation not found." });
        }

    })
});

