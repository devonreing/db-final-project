//*** Devon Reing
//*** Database Management Systems 
//*** 12/9/2024
//*** Final Project

fetch("/api/menuitemsfororder")
    .then((response) => response.json())
    .then((menuItems) => {
        const menuContainer = document.getElementById("menu-container");
        const cartContainer = document.getElementById("cart-container");

        // Group items by type
        const groupedItems = menuItems.reduce((groups, item) => {
            if (!groups[item.type]) {
                groups[item.type] = [];
            }
            groups[item.type].push(item);
            return groups;
        }, {});

        Object.keys(groupedItems).forEach((type) =>{
            console.log(groupedItems[type].items)
        });

        // Cart to store selected items
        const cart = [];

        // Function to update cart display
        const updateCart = () => {
            cartContainer.innerHTML = '<h2>Cart</h2>';
            const table = document.createElement("table");
            const headerRow = document.createElement("tr");
            headerRow.innerHTML = `<th>Item Number</th></th><th>Item</th><th>Quantity</th><th>Price</th><th>Total</th>`;
            table.appendChild(headerRow);

            let total = 0;
            const foodIds = [];
            const quants = [];
            cart.forEach((cartItem) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                  <td>${cartItem.food_id}</td>
                  <td>${cartItem.name}</td>
                  <td>${cartItem.quantity}</td>
                  <td>$${cartItem.price.toFixed(2)}</td>
                  <td>$${(cartItem.price * cartItem.quantity).toFixed(2)}</td>
                `;
                table.appendChild(row);
                total += cartItem.price * cartItem.quantity;

                foodIds.push(cartItem.food_id);
                quants.push(cartItem.quantity);
                //const food_id_num = document.getElementById("foodid")
                //food_id_num.textContent = cartItem.food_id
            });


            // Add total price
            const totalRow = document.createElement("tr");
            totalRow.innerHTML = `<td colspan="4">Total</td><td>$${total.toFixed(2)}</td>`;
            table.appendChild(totalRow);

            cartContainer.appendChild(table);

            // set the hidden inputs in form
            document.getElementById('foodid').value = foodIds[0];
            document.getElementById('quantity').value = quants[0];
        };

        // Loop through the grouped items and create sections
        Object.keys(groupedItems).forEach((type) => {
            const section = document.createElement("section");
            section.innerHTML = `<h2>${type.charAt(0).toUpperCase() + type.slice(1)}</h2>`;
            section.classList.add("menu-section");

            const table = document.createElement("table");
            table.classList.add("menu-table");

            groupedItems[type].forEach((item) => {
                const row = document.createElement("tr");

                // Id column
                const idCell = document.createElement("td");
                idCell.innerHTML = `${item.food_id}`;
                row.appendChild(idCell);

                // Image column
                const imgCell = document.createElement("td");
                const img = document.createElement("img");
                img.src = item.image_url;
                img.alt = item.name;
                img.style.width = "100px";  // Optional: set the image size
                imgCell.appendChild(img);
                row.appendChild(imgCell);

                // Title / Description column
                const detailsCell = document.createElement("td");
                detailsCell.innerHTML = `
                  <h3>${item.name}</h3>
                  <p>${item.description}</p>
                `;
                row.appendChild(detailsCell);

                // Price column
                const priceCell = document.createElement("td");
                priceCell.innerHTML = `$${item.price.toFixed(2)}`;
                row.appendChild(priceCell);

                // Quantity column
                const quantityCell = document.createElement("td");
                const quantityInput = document.createElement("input");
                quantityInput.type = "number";
                quantityInput.value = 1;
                quantityInput.min = 1;
                quantityInput.classList.add("quantity-input");
                quantityCell.appendChild(quantityInput);
                row.appendChild(quantityCell);

                // Add to Cart button column
                const actionCell = document.createElement("td");
                const addButton = document.createElement("button");
                addButton.textContent = "Add to Cart";
                addButton.onclick = () => {
                    const quantity = parseInt(quantityInput.value);
                    if (quantity > 0) {
                        const cartItem = {
                            food_id: item.food_id,
                            name: item.name,
                            price: item.price,
                            quantity: quantity,
                        };
                        //document.getElementById('quantity').value = quantity;
                        cart.push(cartItem);
                        updateCart();
                    }
                };
                actionCell.appendChild(addButton);
                row.appendChild(actionCell);

                // Append the row to the table
                table.appendChild(row);
            });

            // Append the table to the section and the section to the menu container
            section.appendChild(table);
            menuContainer.appendChild(section);

        });
    })
    .catch((err) => console.error("Error fetching menu items:", err));
