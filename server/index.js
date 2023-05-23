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

//single product api
app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "product id is required" });

    const singleProduct = products.find((product) => product.id == id);
    if (singleProduct) return res.status(200).json({ message: "success", product: singleProduct });

    res.status(400).json({ message: `No product found with id :${id}` });
});

//error route
app.all("*", (req, res) => {
    res.status(404).json({ message: "404 page not found" });
});

//server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
