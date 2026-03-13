const Order = require("../models/Order");


exports.createOrder = async (req, res) => {

  try {

    const order = await Order.create(req.body);

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

exports.getOrders = async (req, res) => {

  try {

    const orders = await Order.find();

    res.json(orders);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};
// Update order status

exports.updateOrderStatus = async (req, res) => {

  try {

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(order);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};