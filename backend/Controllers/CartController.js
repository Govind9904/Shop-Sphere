const Cart = require("../Model/Cart");

// Add Product to Cart 
const addToCart = async (req,res) => {
    try
    {
        const {productId,quantity} = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ userId });

        if(cart){
            // let check Product is already Exist
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if(itemIndex > -1){
                cart.items[itemIndex].quantity +=quantity;
            }else{
                cart.items.push({productId , quantity});
            }

            await cart.save();
        }else{
            cart = await Cart.create({
                userId,
                items : [{productId,quantity}]
            });
        }
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}


// Get user Cart
const getCart = async (req,res) =>{
    try
    {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId }).populate("items.productId","name price images");

        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.json(cart);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update item Quantity and item

const updateCartItem = async ( req , res ) => {
    try 
    {
        const {productId,quantity} = req.body;
        const userId = req.user.id;

        const cart =await  Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: "Product not in cart" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Remove item from cart
const deleteCartItem = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addToCart , getCart , updateCartItem , deleteCartItem }