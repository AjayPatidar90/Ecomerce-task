const { Schema, model } = require('mongoose');

const userModel = Schema({


    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true

    },

    FullName: {
        type: String,
        required: true
    },


    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER',
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
},
    {
        timestamps: true
    },

)
const User_model = model('USER', userModel);



module.exports = User_model;