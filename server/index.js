//modules
const express = require("express");
const cors = require("cors");

const products = require("./products.json");
let cart = [];

const app = express();
app.use(express.json());
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

//add to cart api
app.post("/cart", (req, res) => {
    const { id } = req.body;
    console.log(id);
    if (!id) return res.status(400).json({ message: "product id is required" });

    const productToAdd = products?.find((product) => product?.id == id);
    cart.push(productToAdd);
    res.status(200).json({ message: "product added to cart", product: productToAdd });
});

//get cart products api
app.get("/cart", (req, res) => {
    if (cart.length === 0)
        return res
            .status(200)
            .json({ message: "Cart is empty, please add some products", products: cart });
    res.status(200).json({ message: "Success", products: cart });
});

//error route
app.all("*", (req, res) => {
    res.status(404).json({ message: "404 page not found" });
});

//server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
