-- Table structure for table `menuitems`
--
DROP TABLE IF EXISTS `menuitems`;
CREATE TABLE `menuitems` (
  `food_id` int NOT NULL,
  `name` text,
  `type` text,
  `description` text,
  `price` double DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`food_id`)
);

--
-- Dumping data for table `menuitems`
--
INSERT INTO `menuitems` VALUES (1,'Mozzarella Sticks','appetizer','Crispy breaded mozzarella sticks served with marinara sauce.',5.99,'https://images.themodernproper.com/billowy-turkey/production/posts/2021/Homemade-Mozzarella-Sticks-9.jpeg?w=1200&q=82&auto=format&fit=crop&dm=1638935116&s=3c6cab3baf5e73086e1c0705b6d92ea3'),(2,'Bruschetta','appetizer','Grilled bread topped with fresh tomatoes, basil, and mozzarella.',6.5,'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2023-07-bruschetta%2FBruschetta_10000jpg'),(3,'Stuffed Mushrooms','appetizer','Mushrooms stuffed with cheese, garlic, and herbs.',7,'https://thegrillingguide.com/wp-content/uploads/2020/06/Stuffed-Mushrooms-1.jpg'),(4,'Chicken Wings','appetizer','Spicy chicken wings served with blue cheese dressing.',8.5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvaorpDhrcUP7938D25L__Y6Qrov0SHkyTSg&s'),(5,'Onion Rings','appetizer','Golden-fried onion rings with a side of ranch.',4.99,'https://pauladeenmagazine.com/wp-content/uploads/2022/05/cpd_image006_RGB_564x564_2034203.jpg'),(6,'Potato Skins','appetizer','Baked potato skins topped with cheese and bacon bits.',6.75,'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipes%2F2020-09-How-to-make-the-best-baked-potato-skins%2Fht-loaded-potato-skins-step-12b'),(7,'Spinach Artichoke Dip','appetizer','Creamy spinach and artichoke dip served with tortilla chips.',7.25,'https://whatsgabycooking.com/wp-content/uploads/2023/07/SpinachDip.png'),(8,'Classic Burger','entree','A juicy beef patty topped with lettuce, tomato, onion, pickles, and cheese on a toasted bun.',9.99,'https://images.stockcake.com/public/9/a/2/9a2361cc-5c58-41eb-97f2-b4d9983aa42d_large/juicy-cheeseburger-delight-stockcake.jpg'),(9,'Chicken Caesar Salad','entree','Grilled chicken over romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.',8.49,'https://www.withspice.com/wp-content/uploads/2024/06/grilled-chicken-caesar-salad-683x1024.jpg'),(10,'Grilled Salmon','entree','Perfectly grilled salmon fillet served with a side of vegetables.',13.99,'https://www.cookingclassy.com/wp-content/uploads/2018/05/grilled-salmon-3.jpg'),(11,'Spaghetti Carbonara','entree','Pasta with pancetta, egg, and Parmesan in a creamy sauce.',12.5,'https://anitalianinmykitchen.com/wp-content/uploads/2019/02/Classic-Carbonara-blog.jpg'),(12,'Margherita Pizza','entree','Classic pizza with fresh tomatoes, mozzarella, and basil.',10.5,'https://www.urbanbakes.com/wp-content/uploads/2021/07/Homemade-Pizza-with-Tomato-and-Basil-URBAN-BAKES-1.1.jpg'),(13,'BBQ Ribs','entree','Tender pork ribs slathered in BBQ sauce, served with coleslaw.',15.99,'https://images.stockcake.com/public/4/a/7/4a7e76f4-2665-4ee3-9720-424aeb399ee5_large/saucy-bbq-ribs-stockcake.jpg'),(14,'Steak Frites','entree','Grilled steak served with a side of French fries.',18.5,'https://images.themodernproper.com/billowy-turkey/production/posts/2022/SteakFrites_13.jpg?w=1200&q=82&auto=format&fit=crop&dm=1662582338&s=0f330857b7d9a9986a91cceac1a8161e'),(15,'Vegetable Stir-Fry','entree','Seasonal vegetables stir-fried with a light soy-ginger sauce.',9,'https://www.allrecipes.com/thmb/dcJLnSZrqStUxwGsc87idivCylE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/24712-ginger-veggie-stir-fry-DDMFS-4X3-3f25aaf303e04c849a71cc1e448dae6d.jpg'),(16,'Chicken Alfredo','entree','Creamy Alfredo sauce with grilled chicken over fettuccine pasta.',11.75,'https://www.savingdessert.com/wp-content/uploads/2019/05/Grilled-Chicken-Fettuccine-Alfredo-5.jpg'),(17,'Grilled Shrimp Skewers','entree','Marinated shrimp grilled to perfection, served with rice.',14,'https://www.africanbites.com/wp-content/uploads/2018/07/IMG_3060.jpg'),(18,'French Fries','side','Golden and crispy French fries, lightly salted.',2.99,'https://sweetcsdesigns.com/wp-content/uploads/2023/06/air-fryer-french-fries-recipe-picture-1.jpg'),(19,'Side Salad','side','Mixed greens, tomatoes, cucumbers, and croutons with choice of dressing.',3.49,'https://britneybreaksbread.com/wp-content/uploads/2023/03/house-salad-2-500x500.jpg'),(20,'Mashed Potatoes','side','Creamy mashed potatoes with a hint of garlic.',3,'https://www.simplyrecipes.com/thmb/vdKkuHeIrPS7636f71mTCxtAEoc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Garlic-Mashed-Potatoes-Lead-2-196ad1405f1c400a8e47d2142b4aba1b.jpg'),(21,'Steamed Vegetables','side','A medley of seasonal steamed vegetables.',3.25,'https://bitesofflavor.com/wp-content/uploads/2021/03/Steam-Roasted-Vegetables-Bites-of-Flavor-FB-scaled.jpg'),(22,'Coleslaw','side','Crunchy cabbage slaw with a tangy dressing.',2.75,'https://www.thechunkychef.com/wp-content/uploads/2022/08/Sweet-and-Tangy-Coleslaw-recipe-card.jpg'),(23,'Garlic Bread','side','Warm, crusty bread with a garlic butter spread.',3.99,'https://www.allrecipes.com/thmb/yU7mP0Hs95rnIgzJcJMV3x2S7_o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/216077-garlic-bread-spread-step-beauty-2x1-BP-3171-bf885007105145c6adf3a398dbc1c372.jpg'),(24,'Mac and Cheese','side','Cheesy and creamy macaroni with a crispy breadcrumb topping.',4.25,'https://handletheheat.com/wp-content/uploads/2022/03/mac-and-cheese-recipe-SQUARE.jpg'),(25,'Baked Potato','side','Baked potato served with sour cream and chives.',3.75,'https://cdn.bakedbree.com/uploads/2021/06/baked-potato-RESHOOT-29-640x640.jpg'),(26,'Chocolate Lava Cake','dessert','Decadent chocolate cake with a gooey chocolate center, served with vanilla ice cream.',6.5,'https://images.stockcake.com/public/2/6/0/26046e89-eb17-42d7-bd87-8bd8a466b100_large/decadent-molten-cake-stockcake.jpg'),(27,'Apple Pie','dessert','Classic apple pie with a buttery crust and cinnamon-spiced filling.',4.75,'https://joyfoodsunshine.com/wp-content/uploads/2019/08/best-apple-pie-recipe-from-scratch-8.jpg'),(28,'Cheesecake','dessert','Creamy cheesecake with a graham cracker crust and berry topping.',5.5,'https://i1.wp.com/lmld.org/wp-content/uploads/2016/04/Blueberry-Cheesecake-3.jpg'),(29,'Tiramisu','dessert','Coffee-flavored Italian dessert layered with mascarpone and cocoa.',6,'https://www.cookwithnabeela.com/wp-content/uploads/2024/02/Tiramisu.webp'),(30,'Brownie Sundae','dessert','Warm brownie topped with vanilla ice cream and chocolate sauce.',5.75,'https://recipe-graphics.grocerywebsite.com/0_GraphicsRecipes/4929_4k.jpg'),(31,'Soft Drink','beverage','Refreshing soda options including cola, lemonade, and iced tea.',1.99,'https://media.seasons52.com/en_us/images/marketing/Soda590x365.jpg'),(32,'Iced Tea','beverage','Freshly brewed iced tea, available sweetened or unsweetened.',1.75,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjdULafAGBMKCSX7i7vhwa5ySL1MWzVAyBkQ&s'),(33,'Coffee','beverage','Hot coffee available in regular or decaf.',1.5,'https://redcliffelabs.com/myhealth/_next/image/?url=https%3A%2F%2Fmyhealth-redcliffelabs.redcliffelabs.com%2Fmedia%2Fblogcard-images%2FNone%2F0a99b9f4-d9a7-4f41-8988-591246fd1695.webp&w=1920&q=75');

select *
from menuitems;

--
-- Table structure for table `orders`
--
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_name` varchar(255) NOT NULL,
  `food_id` int NOT NULL,
  `quantity` int NOT NULL,
  `order_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(50) DEFAULT 'pending',
  `delivery_method` varchar(50) DEFAULT NULL,
  FOREIGN KEY (`food_id`) REFERENCES menuitems(`food_id`)
);

select * 
from orders;

--
-- Table structure for table `reservations`
--
DROP TABLE IF EXISTS `reservations`;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `party_size` int NOT NULL,
  `reservation_time` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

select *
from reservations;

