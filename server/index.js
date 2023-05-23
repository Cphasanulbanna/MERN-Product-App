//modules
const express = require("express");
const cors = require("cors");

const products = require("./products.json");

const app = express();
app.use(cors());
const PORT = 8000;

//get all products api
app.get("/products", (req, res) => {
    res.status(200).json({ products: products });
});

//error route
app.all("*", (req, res) => {
    res.status(404).json({ message: "404 page not found" });
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
