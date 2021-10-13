const express = require('express');
const router = express.Router();
const PdtCtrl = require("../controllers/productsController");
const { authenticateUser, requireLogin } = require('../middlewares/auth');

//retrieve all products
router.get("/products", requireLogin, authenticateUser, PdtCtrl.fetchProducts);

// create a new product
router.post("/products", requireLogin, authenticateUser, PdtCtrl.createProduct);

//retrieve a single product
router.get("/products/:id", requireLogin, authenticateUser, PdtCtrl.fetchSingleProduct);

module.exports = router;