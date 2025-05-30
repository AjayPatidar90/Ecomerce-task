const db = require("../../models");

const Stripe = require("stripe");
const Product = db.product;
const PaymentModel = db.payment


const stripe = Stripe("sk_test_51RUZcNB0Dx8BNsL2e6Nd9ux2lX2Q21WzEeNs3gA1qtBGkccpCIXWwNfORmbAMeRAnmBONSepfCXyNhaNJCeOWmDk008O0WzSxS");

class ProductController {
    async addProduct(req, res) {
        const { name, description, price, image_url, offer_price } = req.body;

        console.log(req.body);
        if (!name || !description || !price || !offer_price || image_url.length == 0) {
            return res.send({ status: false, data: [], message: "All fields are required" });
        }

        try {


            const newProduct = new Product({
                name,
                description,
                price,
                image_url,
                offer_price
            });

            await newProduct.save();
            return res.send({ status: true, message: "Product added successfully", data: newProduct });
        } catch (error) {
            return res.status(500).json({ status: false, message: "Error adding product", error: error.message });
        }
    }

    async getAllProducts(req, res) {


        try {
            const products = await Product.find()
                .populate("name")
                .sort({ createdAt: -1 });

            if (products.length === 0) {
                return res.send({ status: false, data: [], message: "No products found" });
            }

            return res.send({ status: true, data: products, message: "Products fetched successfully" });
        } catch (error) {
            return res.status(500).json({ status: false, message: "Error fetching products", error: error.message });
        }
    }

    async getTopRatedProducts(req, res) {

        const { limit } = req.body

        if (!limit) {
            return res.send({ status: false, data: [], message: "Limit is required" });
        }
        try {
            const products = await Product.find()
                .sort({ rating: -1 })
                .limit(limit)
                .populate("category_id", "name");

            if (products.length === 0) {
                return res.send({ status: false, data: [], message: "No products found" });
            }

            return res.send({ status: true, data: products, message: "Top rated products fetched successfully" });
        } catch (error) {
            return res.status(500).json({ status: false, message: "Error fetching top rated products", error: error.message });
        }
    }

    async getProductById(req, res) {
        const { id } = req.body;

        try {
            const product = await Product.findById(id).populate("category_id", "name");
            if (!product) {
                return res.send({ status: false, data: [], message: "Product not found" });
            }
            return res.send({ status: true, data: product, message: "Product fetched successfully" });
        } catch (error) {
            return res.status(500).json({ status: false, message: "Error fetching product", error: error.message });
        }
    }

    async updateProduct(req, res) {
        const { _id, name, description, price, image_url } = req.body;

        try {
            const product = await Product.findById(_id);
            if (!product) {
                return res.send({ status: false, data: [], message: "Product not found" });
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                _id,
                {
                    name,
                    description,
                    price,
                    image_url,

                },
                { new: true }
            );

            return res.send({ status: true, data: updatedProduct, message: "Product updated successfully" });
        } catch (error) {
            return res.status(500).json({ status: false, message: "Error updating product", error: error.message });
        }
    }

    async deleteProduct(req, res) {
        const { _id } = req.body;
        try {
            const product = await Product.findById(_id);
            if (!product) {
                return res.send({ status: false, data: [], message: "Product not found" });
            }


            await Product.findByIdAndDelete(_id);
            return res.send({ status: true, data: [], message: "Product deleted successfully" });
        } catch (error) {
            return res.status(500).json({ status: false, message: "Error deleting product", error: error.message });
        }
    }


    async PaymentFunction(req, res) {
        try {
            const { items } = req.body;

            let user_id1 = items.user_id;

            // Validate product
            const product = await Product.findById(items.id);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            // Calculate total
            const totalAmount = product.price * items.quantity;

            // Stripe line_items
            const validatedItems = [{
                price_data: {
                    currency: "usd",
                    product_data: { name: product.name },
                    unit_amount: product.price * 100, // Stripe expects price in cents
                },
                quantity: items.quantity,
            }];

            // Create Stripe checkout session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: validatedItems,
                mode: "payment",
                success_url: `http://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `http://localhost:8080/cancel`,
            });

            // Store payment in DB
            const paymentData = new PaymentModel({
                user_id: user_id1,
                order_id: null, // optional for now
                amount: totalAmount,
                payment_method: "credit_card",
                status: "pending",
            });
            console.log("paymentData", paymentData)
            await paymentData.save();





            // ✅ Fixed response
            res.json({ id: session.id, payment_id: paymentData._id });

        } catch (error) {
            console.error("Stripe Payment Error", error);
            res.status(500).json({ error: "Payment initialization failed" });
        }
    }



    async handlePaymentSuccess(req, res) {
        try {
            const session_id = req.query.session_id;

            if (!session_id) {
                return res.status(400).json({ success: false, message: "Missing session_id" });
            }

            const session = await stripe.checkout.sessions.retrieve(session_id);

            // OPTIONAL: Fetch metadata if added
            // const paymentId = session.metadata.payment_id;

            // Match payment in DB (you can use session.amount_total to match)
            const payment = await PaymentModel.findOne({ amount: session.amount_total / 100 });

            if (!payment) {
                return res.status(404).json({ success: false, message: "Payment not found" });
            }

            // Update payment status
            payment.status = "completed";
            await payment.save();

            res.send({
                success: true,
                message: "Payment successful",
                payment: payment,
            });

        } catch (error) {
            console.error("Success handler error:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };


    async handlePaymentCancel(req, res) {
        res.send({
            success: false,
            message: "Payment cancelled by user",
        });
    };



}
module.exports = new ProductController();

