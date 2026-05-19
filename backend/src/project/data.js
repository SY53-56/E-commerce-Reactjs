const data = [
  {
    name: "Boxy Fit T-Shirt",
    price: 799,
    image: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1"
    ],
    description: "Boxy-style T-shirt in lightweight cotton jersey with print motifs.",
    category: "clothes",
    brand: "East District Athletics",
    unit: "1",
    stock: 23,
    userAdmin: "6980d2b731b3634bd8506110",
    reviews: []
  },

  {
    name: "Loose Fit T-Shirt",
    price: 899,
    image: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
      "https://images.unsplash.com/photo-1583743814966-8936f37f4bcb"
    ],
    description: "Loose fit cotton T-shirt with round neck.",
    category: "clothes",
    brand: "Red Rock Stockyard",
    unit: "1",
    stock: 12,
    userAdmin: "6980d2b731b3634bd8506110",
    reviews: []
  },

  {
    name: "Slim Fit Shirt",
    price: 1299,
    image: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c"
    ],
    description: "Slim fit casual shirt for men.",
    category: "clothes",
    brand: "Roadster",
    unit: "1",
    stock: 15,
    userAdmin: "6980d2b731b3634bd8506110",
    reviews: []
  },

  {
    name: "Denim Jeans",
    price: 1599,
    image: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a"
    ],
    description: "Stretchable regular fit denim jeans.",
    category: "clothes",
    brand: "Levis",
    unit: "1",
    stock: 18,
    userAdmin: "6980d2b731b3634bd8506110",
    reviews: []
  },

  {
    name: "Oversized Hoodie",
    price: 1999,
    image: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234"
    ],
    description: "Warm oversized hoodie with fleece lining.",
    category: "clothes",
    brand: "H&M",
    unit: "1",
    stock: 10,
    userAdmin: "6980d2b731b3634bd8506110",
    reviews: []
  },

  {
    name: "Sports Shoes",
    price: 2499,
    image: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
    ],
    description: "Comfortable sports shoes for running.",
    category: "footwear",
    brand: "Nike",
    unit: "1",
    stock: 9,
    userAdmin: "6980d2b731b3634bd8506110",
    reviews: []
  },

  {
    name: "Running Shoes",
    price: 3299,
    image: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329"
    ],
    description: "Lightweight running shoes with soft cushioning.",
    category: "footwear",
    brand: "Adidas",
    unit: "1",
    stock: 7,
    userAdmin: "6980d2b731b3634bd8506110",
    reviews: []
  },

  {
    name: "Leather Wallet",
    price: 699,
    image: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93",
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38"
    ],
    description: "Premium leather wallet with card slots.",
    category: "accessories",
    brand: "WildHorn",
    unit: "1",
    stock: 25,
    userAdmin: "6980d2b731b3634bd8506110",
    reviews: []
  },

  {
    name: "Smart Watch",
    price: 4999,
    image: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d"
    ],
    description: "Fitness smartwatch with heart rate monitor.",
    category: "electronics",
    brand: "Noise",
    unit: "1",
    stock: 8,
    userAdmin: "6980d2b731b3634bd8506110",
    reviews: []
  },

  {
    name: "Bluetooth Headphones",
    price: 2999,
    image: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944"
    ],
    description: "Wireless headphones with deep bass.",
    category: "electronics",
    brand: "Boat",
    unit: "1",
    stock: 13,
    userAdmin: "6980d2b731b3634bd8506110",
    reviews: []
  },{
  name: "Cheese Burger",
  price: 199,
  image: [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    "https://images.unsplash.com/photo-1550547660-d9450f859349"
  ],
  description: "Delicious grilled chicken burger with cheese.",
  category: "food",
  brand: "Burger Hub",
  unit: "1",
  stock: 40,
  userAdmin: "6980d2b731b3634bd8506110",
  reviews: []
},

{
  name: "Veg Pizza",
  price: 349,
  image: [
    "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    "https://images.unsplash.com/photo-1548365328-9f547fb0953b"
  ],
  description: "Fresh vegetable pizza with mozzarella cheese.",
  category: "food",
  brand: "Pizza Point",
  unit: "1",
  stock: 25,
  userAdmin: "6980d2b731b3634bd8506110",
  reviews: []
},

{
  name: "French Fries",
  price: 149,
  image: [
    "https://images.unsplash.com/photo-1576107232684-1279f390859f",
    "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d"
  ],
  description: "Crispy golden french fries.",
  category: "food",
  brand: "Snack House",
  unit: "1",
  stock: 50,
  userAdmin: "6980d2b731b3634bd8506110",
  reviews: []
},

{
  name: "Cold Coffee",
  price: 129,
  image: [
    "https://images.unsplash.com/photo-1517705008128-361805f42e86",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
  ],
  description: "Refreshing cold coffee with ice cream.",
  category: "food",
  brand: "Cafe Brew",
  unit: "1",
  stock: 35,
  userAdmin: "6980d2b731b3634bd8506110",
  reviews: []
},

{
  name: "Chocolate Cake",
  price: 499,
  image: [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
  ],
  description: "Soft chocolate cake with creamy layers.",
  category: "food",
  brand: "Sweet Bakery",
  unit: "1",
  stock: 12,
  userAdmin: "6980d2b731b3634bd8506110",
  reviews: []
},

{
  name: "Chicken Biryani",
  price: 299,
  image: [
    "https://images.unsplash.com/photo-1563379091339-03246963d29a",
    "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a"
  ],
  description: "Hyderabadi style spicy chicken biryani.",
  category: "food",
  brand: "Biryani King",
  unit: "1",
  stock: 20,
  userAdmin: "6980d2b731b3634bd8506110",
  reviews: []
},

{
  name: "Ice Cream",
  price: 99,
  image: [
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
    "https://images.unsplash.com/photo-1570197788417-0e82375c9371"
  ],
  description: "Vanilla ice cream with chocolate topping.",
  category: "food",
  brand: "Cool Treat",
  unit: "1",
  stock: 60,
  userAdmin: "6980d2b731b3634bd8506110",
  reviews: []
},

{
  name: "Sandwich",
  price: 159,
  image: [
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    "https://images.unsplash.com/photo-1553909489-cd47e0907980"
  ],
  description: "Healthy grilled vegetable sandwich.",
  category: "food",
  brand: "Snack Cafe",
  unit: "1",
  stock: 30,
  userAdmin: "6980d2b731b3634bd8506110",
  reviews: []
},

{
  name: "Momos",
  price: 120,
  image: [
    "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
    "https://images.unsplash.com/photo-1601050690597-df0568f70950"
  ],
  description: "Steamed chicken momos with spicy chutney.",
  category: "food",
  brand: "Momo House",
  unit: "1",
  stock: 45,
  userAdmin: "6980d2b731b3634bd8506110",
  reviews: []
},

{
  name: "Pasta",
  price: 249,
  image: [
    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
    "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb"
  ],
  description: "Creamy white sauce pasta with herbs.",
  category: "food",
  brand: "Italian Corner",
  unit: "1",
  stock: 18,
  userAdmin: "6980d2b731b3634bd8506110",
  reviews: []
},

{
  name: "LED Smart TV",
  price: 25999,
  image: [
    "https://images.unsplash.com/photo-1593784991095-a205069470b6",
    "https://images.unsplash.com/photo-1461151304267-38535e780c79"
  ],
  description: "43-inch Full HD smart television.",
  category: "electronics",
  brand: "Samsung",
  unit: "1",
  stock: 4,
  userAdmin: "6980d2b731b3634bd8506110",
  reviews: []
},

{
  name: "Office Chair",
  price: 4999,
  image: [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    "https://images.unsplash.com/photo-1580480055273-228ff5388ef8"
  ],
  description: "Comfortable ergonomic office chair.",
  category: "furniture",
  brand: "GreenSoul",
  unit: "1",
  stock: 8,
  userAdmin: "6980d2b731b3634bd8506110",
  reviews: []
},

{
  name: "Backpack",
  price: 1499,
  image: [
    "https://images.unsplash.com/photo-1581605405669-fcdf81165afa",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  ],
  description: "Waterproof travel backpack.",
  category: "accessories",
  brand: "Skybags",
  unit: "1",
  stock: 22,
  userAdmin: "6980d2b731b3634bd8506110",
  reviews: []
},

{
  name: "Sunglasses",
  price: 999,
  image: [
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    "https://images.unsplash.com/photo-1577803645773-f96470509666"
  ],
  description: "UV protected stylish sunglasses.",
  category: "accessories",
  brand: "RayBan",
  unit: "1",
  stock: 14,
  userAdmin: "6980d2b731b3634bd8506110",
  reviews: []
},

{
  name: "Perfume",
  price: 2199,
  image: [
    "https://images.unsplash.com/photo-1541643600914-78b084683601",
    "https://images.unsplash.com/photo-1594035910387-fea47794261f"
  ],
  description: "Long lasting premium perfume.",
  category: "beauty",
  brand: "Bella Vita",
  unit: "1",
  stock: 17,
  userAdmin: "6980d2b731b3634bd8506110",
  reviews: []
}
]

module.exports = data