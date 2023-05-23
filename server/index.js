//modules
const express = require("express");
const cors = require("cors");

const products = [
    {
        id: 1,
        name: "Multivitamin 200 Tablets",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat corrupti doloremque minus obcaecati dignissimos nesciunt rem eos porro ea veniam voluptates dolore consequuntur, unde assumenda culpa. Illum molestiae perspiciatis eum.",
        price: 19.99,
        category: "health suppliment",
        image: "http://cdn.shopify.com/s/files/1/0321/0264/5895/products/GIMainImage_bbadb345-83f6-4611-8427-bf4b94e028ad.jpg?v=1663748449",
        imageGallery: [
            "http://cdn.shopify.com/s/files/1/0321/0264/5895/products/GIMainImage_bbadb345-83f6-4611-8427-bf4b94e028ad.jpg?v=1663748449",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR8nXeEiEJbQSV5QH_SgjG5FjiH4wRVoPSjE2WPR3AV6E5jTSwReFisFr04tEKDMaNqow&usqp=CAU",
            "https://cdn.shopify.com/s/files/1/0971/5718/products/MensMulti-V5-FRONT.png?v=1672671655",
        ],
    },
    {
        id: 2,
        name: "Galaxy S22 ",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat corrupti doloremque minus obcaecati dignissimos nesciunt",
        price: 29.99,
        category: "smatphone",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0PF6vywQC5Ms4teTK1OSWqCQ_pA_lhXJOJKWN6EkR77byfaFb-jCdn5asUPS9HOpnt4U&usqp=CAU",
        imageGallery: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0PF6vywQC5Ms4teTK1OSWqCQ_pA_lhXJOJKWN6EkR77byfaFb-jCdn5asUPS9HOpnt4U&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0PF6vywQC5Ms4teTK1OSWqCQ_pA_lhXJOJKWN6EkR77byfaFb-jCdn5asUPS9HOpnt4U&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0PF6vywQC5Ms4teTK1OSWqCQ_pA_lhXJOJKWN6EkR77byfaFb-jCdn5asUPS9HOpnt4U&usqp=CAU",
        ],
    },
    {
        id: 3,
        name: "Peanut butter",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat corrupti doloremque minus obcaecati dignissimos nesciunt",
        price: 49.99,
        category: "food",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTix0ruy7fyy1LqLztGr2VQJD8SYQbU-ecAWQ&usqp=CAU",
        imageGallery: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTix0ruy7fyy1LqLztGr2VQJD8SYQbU-ecAWQ&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTix0ruy7fyy1LqLztGr2VQJD8SYQbU-ecAWQ&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTix0ruy7fyy1LqLztGr2VQJD8SYQbU-ecAWQ&usqp=CAU",
        ],
    },
    {
        id: 4,
        name: "Peanut butter",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat corrupti doloremque minus obcaecati dignissimos nesciunt",
        price: 49.99,
        category: "food",
        image: "https://cdn.shopify.com/s/files/1/0618/5648/1500/products/DSC00006copy.jpg?v=1667655723&width=997",
        imageGallery: [
            "https://cdn.shopify.com/s/files/1/0618/5648/1500/products/DSC00006copy.jpg?v=1667655723&width=997",
            "https://cdn.shopify.com/s/files/1/0618/5648/1500/products/DSC00006copy.jpg?v=1667655723&width=997",
            "https://cdn.shopify.com/s/files/1/0618/5648/1500/products/DSC00006copy.jpg?v=1667655723&width=997",
        ],
    },
];

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

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
