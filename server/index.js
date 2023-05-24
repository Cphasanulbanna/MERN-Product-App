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

//get cart products api
app.get("/cart", (req, res) => {
    if (cart.length === 0)
        return res
            .status(200)
            .json({ message: "Cart is empty, please add some products", cart: cart });
    res.status(200).json({ message: "Success", products: cart });
});

//add to cart api
app.post("/cart", (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "product id is required" });

    const productInCart = cart.find((product) => product.id == id);
    if (productInCart)
        return res
            .status(400)
            .json({ message: `product with [id:${id}]  is already added in the cart` });

    const productToAdd = products?.find((product) => product?.id == id);
    cart.push(productToAdd);
    res.status(200).json({ message: "product added to cart", product: productToAdd });
});

//delete from cart api
app.delete("/cart", (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "product id is required" });

    if (cart.length) {
        cart = cart.filter((product) => product.id != id);
        res.status(200).json({ message: `product with [id:${id}] is deleted from cart` });
    } else {
        res.status(200).json({ message: `cart is empty , please add some products` });
    }
});

//error route
app.all("*", (req, res) => {
    res.status(404).json({ message: "404 page not found" });
});

//server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
