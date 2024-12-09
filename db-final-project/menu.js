//*** Erin Zahner
//*** Database Management Systems 
//*** 12/9/2024
//*** Final Project

fetch("/api/menuitems")
  .then((response) => response.json())
  .then((menuItems) => {
    const menuContainer = document.getElementById("menu-container");

    // Group items by type
    const groupedItems = menuItems.reduce((groups, item) => {
      if (!groups[item.type]) {
        groups[item.type] = [];
      }
      groups[item.type].push(item);
      return groups;
    }, {});

    // Loop through the grouped items and create sections
    Object.keys(groupedItems).forEach((type) => {
      const section = document.createElement("section");
      section.innerHTML = `<h2>${type.charAt(0).toUpperCase() + type.slice(1)}</h2>`;
      section.classList.add("menu-section");

      const typeContainer = document.createElement("div");
      typeContainer.classList.add("menu-type-container");

      groupedItems[type].forEach((item) => {
        const menuItemDiv = document.createElement("div");
        menuItemDiv.classList.add("menu-item");

        const img = document.createElement("img");
        img.src = item.image_url;
        img.alt = item.name;

        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("menu-details");
        detailsDiv.innerHTML = `
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p><strong>$${item.price.toFixed(2)}</strong></p>
        `;

        menuItemDiv.appendChild(img);
        menuItemDiv.appendChild(detailsDiv);
        typeContainer.appendChild(menuItemDiv);
      });

      section.appendChild(typeContainer);
      menuContainer.appendChild(section);
    });
  })
  .catch((err) => console.error("Error fetching menu items:", err));


