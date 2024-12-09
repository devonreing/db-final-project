//*** Devon Reing
//*** Database Management Systems 
//*** 12/9/2024
//*** Final Project

const sql_query = "SELECT name, description, price, image_url, type FROM menuitems";

con.query(sql_query, function(err, result, fields) {
    if (err)
        throw err;
    else {
        //queryJSON = result.json()
        //*** start creating the html body for the browser
        var html_body = "<HTML><link rel='stylesheet' href='styles.css'>";
        html_body = html_body + "<BODY>";
        html_body = html_body + "<!-- Header Section -->\n" +
            "  <header>\n" +
            "    <h1>Order Online</h1>\n" +
            "    <nav>\n" +
            "      <a href=\"/home.html\">Home</a> |\n" +
            "      <a href=\"/menu.html\">Menu</a> |\n" +
            "      <div class=\"dropdown\">\n" +
            "        <a href=\"javascript:void(0);\" class=\"dropbtn\">Reservation Information</a>\n" +
            "        <div class=\"dropdown-content\">\n" +
            "          <a href=\"/reservations.html\">Make a Reservation</a>\n" +
            "          <a href=\"/reservationUpdate.html\">Update Existing Reservation</a>\n" +
            "          <a href=\"/reservationDeletion.html\">Delete Existing Reservation</a>\n" +
            "        </div>\n" +
            "      </div>\n" +
            "\n" +
            "    </nav>\n" +
            "  </header>";
        html_body = html_body + "<TABLE BORDER=1 WIDTH=800>";


        // Group items by type
        const groupedItems = result.reduce((groups, item) => {
            if (!groups[item.type]) {
                groups[item.type] = [];
            }
            groups[item.type].push(item);
            return groups;
        }, {});

        console.log(groupedItems)

        // create cart
        const cart = [];

        function updateCart() {
            html_body = html_body + '<h2> Cart </h2>';
            html_body = html_body + '<table>' +
                '<tr>' +
                '<th>Item</th><th>Quantity</th><th>Price</th><th>Total</th></tr>';
            let total = 0;
            cart.forEach((cartItem) => {
                html_body = html_body + '<tr><td>' + cartItem.name + '</td>' +
                    '<td>' + cartItem.quantity + '</td>' +
                    '<td>' + cartItem.price.toFixed(2) + '</td>' +
                    '<td>' + (cartItem.price * cartItem.quantity).toFixed(2) +'</td></tr>';
                total += cartItem.price * cartItem.quantity;
            })
            // add total price
            html_body = html_body + '<tr><td colspan="3">Total</td><td>' + total.toFixed(2) + '</td></tr>';

            // last row to close table
            html_body = html_body + '</table>';
        }

        // Loop through grouped items and create sections
        Object.keys(groupedItems).forEach((type) => {
            html_body = html_body + '<section><h2>' + type.charAt(0).toUpperCase() + type.slice(1) + '</h2>' +
                '<table>';
            groupedItems[type].forEach((item) => {
                html_body = html_body + '<tr>' +
                    '<td><img src = \'${item.image_url}\' alt=\"${item.name}\" style=\"width: 100px\"></td></tr>';
            })

            // close html tags
            html_body = html_body + '</table></section>';
        });

    }
});
