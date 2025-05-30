const router = require("express").Router()
const { deleteProduct, updateProduct, getProductById, getAllProducts, addProduct, getTopRatedProducts, PaymentFunction, handlePaymentSuccess, handlePaymentCancel } = require('../controllers/admin/productControllers')

router.post("/add-product", addProduct);
router.get("/get-all-products", getAllProducts);
router.post("/get-product-byId", getProductById);
router.post("/update-product", updateProduct);
router.post("/delete-product", deleteProduct);
router.post("/get-top-rated-products", getTopRatedProducts);

router.post("/create-checkout-session", PaymentFunction);




router.get("/success", handlePaymentSuccess);
router.get("/cancel", handlePaymentCancel);
module.exports = router;