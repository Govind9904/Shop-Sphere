const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    orderItems : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product",
                required : true
            },
            name : String,
            price : Number,
            quantity : Number,
            image : String
        }
    ],
    shippingAddress : {
        address : String,
        city : String,
        postalCode : String,
        country : String
    },
    paymentMethod : {
        type : String,
        required  : true
    },
    totalPrice : {
        type : Number,
        required : true
    },
    status:{
        type : String,
        enum : [ "PENDING", "CONFIRMED", "SHIPPED", "dELIVERED", "CANCELLED"],
        default : "PENDING"
    },
    isPaid : {
        type : Boolean,
        default : false
    },
    paidAt : Date,
},{ timestamps : true });

module.exports = mongoose.model("Order",orderSchema);
