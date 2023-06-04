import orderModel from "../models/orders.js";

export const addOrder = async (req, res) => {
  try {
    console.log(req.body);
    const doc = new orderModel(req.body);

    const order = await doc.save();
    res.status(201).json(order);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't get orders",
    });
  }
};


