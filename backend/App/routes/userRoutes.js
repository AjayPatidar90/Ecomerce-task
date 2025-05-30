const router = require("express").Router()
const { AddToCart , allAddToCartProduct} = require('../controllers/user/userControllers')

router.post("/addToCart", AddToCart);
router.post("/allAddToCartProduct", allAddToCartProduct);



module.exports = router;