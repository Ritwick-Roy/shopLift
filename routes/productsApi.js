const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Product = require("../models/Product");

router.get("/", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.get("/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if(!product) {
          return res.status(400).json({msg:'Product not found'});
      }
      res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.post("/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
      check("price", "Price is required").not().isEmpty(),
      check("quantity", "Quantity is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, description, category, brand, price, quantity } = req.body;
      const newProduct = new Product({
        userId: req.user.id,
        name,
        description,
        category,
        brand,
        price,
        quantity,
      });
      const product = await newProduct.save();
      res.json(product);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;