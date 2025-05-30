"use strict";
const db = require('../../models');
const addToCardDB = db.addToCard1;

class User {
    async AddToCart(req, res) {

        const { userId, ProductId } = req.body
        try {
            if (!userId) {
                return res.send({ status: false, message: "User Id is require" })
            }
            if (!ProductId) {
                return res.send({ status: false, message: "Product Id is require" })
            }

            const isExitProduct = await addToCardDB.findOne({ userId: userId, productId: ProductId })
            if (isExitProduct) {
                return res.send({ status: false, message: "This product is already exit", })
            }

            const newData = new addToCardDB({
                userId,
                productId: ProductId
            })

            await newData.save()

            return res.send({ status: true, message: "New product added  in cart", data: newData })
        }
        catch (error) {
            return res.send({ status: false, message: "Internal server error", error: error.message })
        }

    }

    async allAddToCartProduct(req, res){
        const {userId}= req.body
        if(!userId){
            return res.send({status: false, message:"User id is require"})
        }
        try{
            const data = await addToCardDB.find({userId}).sort({ createdAt: -1 });
            
            return res.send({status: true, message: "All cart data find successfully", data:data})

        }
        catch(error){
            return res.send({status: false, message:"Internal server error", error: error.message})
        }
    }
}


module.exports = new User();