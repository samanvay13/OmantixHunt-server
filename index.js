const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "Mayank_Ekaghara";
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//test get api
app.get("/", (req, res) => {
  res.send("hello from node api server");
});

//existing user check
//user creation
//hashed password
//token Generated

app.post("/register", async (req, res) => {

  const { fName, lName, email, whatsapp, username, password, role } = req.body;
  try {
    const existingUser = await userModel.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      fName: fName,
      lName: lName,
      email: email,
      whatsapp: whatsapp,
      username: username,
      password: hashedPassword,
      role: role,
    });

    const token = jwt.sign({ username: result.username, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token: token });
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ username: username });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password,existingUser.password);

    if(!matchPassword){
        return res.status(400).json({message:"Invalid Credentials"})
    }

    const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, SECRET_KEY);
    res.status(201).json({ user: existingUser, token: token });


  } catch (err) {
    res.status(505).json({ message: err.message });
  }
});

// //get all Products
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(505).json({ message: err.message });
//   }
// });

// // get product by id
// app.get("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(505).json({ message: err.message });
//   }
// });

// // update a product

// app.put("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByIdAndUpdate(id, req.body);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     const updateProduct = await Product.findById(id);
//     res.status(200).json(updateProduct);
//   } catch (err) {
//     res.status(505).json({ message: err.message });
//   }
// });

// //create a product
// app.post("/api/products", async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(505).json({ message: err.message });
//   }
// });

// //delete a product

// app.delete("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByIdAndDelete(id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(505).json({ message: err.message });
//   }
// });

mongoose
  .connect(
    "mongodb+srv://omantixhunt:root@cluster0.xzipwwq.mongodb.net/Omantix"
  )
  .then(() => {
    console.log("connected to database ");
    app.listen(5000, () => {
      console.log("server is running on port 5000!");
    });
  })
  .catch((err) => {
    console.log(`an error occurred: ${err}`);
  });
