
const Cart = require("../models/mongo/Cart");
const Product = require("../models/Product");

const db = require("../config/db.js");
const OrderItem = db.OrderItem;
const Order = db.Order;

exports.checkout = async (req, res) => {
  const userId = req.user.id;

  try {
      const cart = await Cart.findOne({ userId });
      if (!cart || cart.items.length === 0) {
          return res.status(400).json({ message: "Cart is empty" });
      }

      const order = await Order.create({ userId, totalAmount: 0 });
      const orderItems = [];

      for (const item of cart.items) {
          const productId = item.productId._id; // This is still an ObjectId

          // Fetch the product details to get the price
          const product = await Product.findById(productId);
          if (!product) {
              return res.status(400).json({ message: `Product not found: ${productId}` });
          }

          orderItems.push({
              orderId: order.id,
              productId: productId.toString(), // Convert ObjectId to string
              quantity: item.quantity,
              price: product.price, // Ensure this is set from the fetched product
          });
      }

      console.log("Order Items:", orderItems); // Log the orderItems array

      await OrderItem.bulkCreate(orderItems); // This should now work

      await Cart.deleteOne({ userId });

      res.json({ message: "Order placed successfully", order });
  } catch (error) {
      console.error("Checkout error:", error);
      res.status(500).json({ message: error.message });
  }
};