const Order = require("../Model/Order");
const Cart = require("../Model/Cart");

// Place Order
const placeOrder = async (req,res) =>{
    try 
    {
        const userId = req.user.id;
        const { shippingAddress , paymentMethod } = req.body;

        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
        }
        const orderItems = cart.items.map(item => ({
            product: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity,
            image: item.productId.images[0],
        }));

        const  totalPrice = orderItems.reduce(
            (acc,item)=> acc + item.price * item.quantity, 0
        );

        const order = await Order.create({
            user : userId,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice
        });

        // clear Cart Items
        cart.items = [];

        await cart.save();

        res.status(201).json(order);
    }catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get Users Ordr 
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ger Order by Id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Orders
const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
};

// Delete Order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // User can delete only their own order
    if (
      req.user.role !== "admin" &&
      order.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to delete this order" });
    }

    await order.deleteOne();

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update Order Status
const updateOrderStatus = async (req,res) => {
  try
  {
    const { status } = req.body

    const order =await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  }catch(error){
    res.status(500).json({ message: error.message });
  }
}

module.exports = { placeOrder , getMyOrders , getAllOrders,  getOrderById , deleteOrder }