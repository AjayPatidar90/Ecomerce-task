import { Schema , model } from "mongoose";

const orderModel = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    shipping_address: {
        type: String,
        required: true
    },
    payment_status: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
    },
}, {
    timestamps: true
});


const order = model('orders', orderModel);
export default order;