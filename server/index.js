//modules
const express = require("express");
const cors = require("cors");
const moment = require("moment");

const products = require("./products.json");
let cart = [];
let orders = [];
const today = moment(new Date()).format("DD-MM-YYYY");
const time = moment(new Date()).format("LT");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 8000;

//get all products api
app.get("/products", (req, res) => {
    const { category } = req.body;
    const { query } = req.query;
    let filteredProducts = [];
    if (category) {
        filteredProducts = products.filter((product) =>
            product.category.toLowerCase().includes(category.toLowerCase())
        );
        return res.status(200).json({ products: filteredProducts });
    }

    if (query) {
        filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        return res.status(200).json({ products: filteredProducts });
    }
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

//order product api
app.post("/order", (req, res) => {
    const { id, quantity } = req.body;
    if (!id) return res.status(400).json({ message: "product id is required" });

    const productToBuy = products.find((product) => product.id == id);
    productToBuy.quantity = quantity ? quantity : 1;
    productToBuy["total"] = quantity ? quantity * productToBuy.price : productToBuy.price;
    productToBuy["order_date"] = `${today}, ${time}`;
    productToBuy.status = "ordered";
    orders.push(productToBuy);

    res.status(200).json({
        order_date: productToBuy?.order_date,
        totalAmount: quantity ? `$ ${productToBuy?.total}` : productToBuy.price,
        message: `order placed for product with id:${id}`,
        orderedProduct: productToBuy,
    });
});

//fetch order history
app.get("/orders", (req, res) => {
    if (orders.length === 0)
        return res.status(200).json({ message: "You are not ordered any product", orders: orders });
    res.status(200).json({ message: "Success", products: orders });
});

// fetch single product order history
app.get("/orders/:id", (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "product id is required" });

    if (orders.length === 0)
        return res.status(200).json({ message: "You are not ordered any product", orders: orders });

    const orderedProduct = orders.find((product) => product.id == id);
    res.status(200).json({ message: "Successs", product: orderedProduct });
});

//error route
app.all("*", (req, res) => {
    res.status(404).json({ message: "404 page not found" });
});

//server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
