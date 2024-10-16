// controllers/orderController.js
const Employer = require('../models/employerModel');
const JobPost = require('../models/jobPostModel');
const Order = require('../models/order');
const Package = require('../models/package');
const SSLCommerzPayment = require('sslcommerz-lts')
const dotenv = require("dotenv").config();

const { v4: uuidv4 } = require('uuid'); // Import the UUID generator

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false //true for live, false for sandbox

// Create a new order
const createOrder = async (req, res) => {
  console.log('aaa')
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  console.log('Received data:', req.body); 
  try {
    const { jobPostId, packageId } = req.body;

    if (!jobPostId || !packageId) {
      return res.status(400).json({ message: 'Employer ID and Package ID are required' });
    }
    const post = await JobPost.findByPk(jobPostId);
    if(!post) {
      console.log("JobPost does not exist");
    }
    // const customer = await Employer.findOne({ where: {userId: post.employerId}});
    // if(!customer) {
    //   console.log("Customer does not exist");
    // }
    
    const pack = await Package.findByPk(packageId);
    if(!pack) {
      console.log("Package does not exist")
    }
    
    const tran_id = uuidv4();
    const paymentData = {
      total_amount: pack?.price,
      currency: 'BDT',
      tran_id: tran_id, // use unique tran_id for each api call
      success_url: 'http://localhost:5000/api/orders/payment-success',
        fail_url: 'http://localhost:5000/api/orders/payment-fail',
        cancel_url: 'http://localhost:5000/api/orders/payment-cancel',
        ipn_url: 'http://localhost:5000/api/orders/payment-ipn',
      shipping_method: 'No',
      product_name: 'Job Post Payment',
      product_category: 'Jobs',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'customer@example.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
      value_a: jobPostId,
      value_b: packageId,
  };

  console.log('data: ', paymentData);
  // const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  // sslcz.init(data).then(apiResponse => {
  //     // Redirect the user to payment gateway
  //     let GatewayPageURL = apiResponse.GatewayPageURL
  //     res.send({ url: GatewayPageURL })
  //     console.log('Redirecting to: ', GatewayPageURL)
  // });
  const sslResponse = await sslcz.init(paymentData);
  if (sslResponse?.GatewayPageURL) {
    // Create the order in the database only if SSLCommerz session is successfully initialized
    const newOrder = await Order.create({ jobPostId, packageId, transId: tran_id });

    // Send the payment URL response
    return res.status(200).json({ url: sslResponse.GatewayPageURL, order: newOrder });
  } else {
    return res.status(400).json({ message: 'Payment session creation failed' });
  }
  } catch (error) {
    console.error('Error creating order:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Handle payment success
const paymentSuccess = async (req, res) => {
  const { tran_id } = req.body;
  try {
      const order = await Order.findOne({ where: { transId: tran_id } });

      if (!order) return res.status(404).json({ message: "Order not found" });

      // Update order status to 'completed'
      order.payment = 'paid';
      await order.save();

      const jobPost = await JobPost.findByPk(order.jobPostId);

      if(!jobPost) return res.status(404).json({ message: "Job post not found" });

      jobPost.visibilityStatus = 'Open';
      
      const pack = await Package.findOne({ where: { id: jobPost.packageId } });
    
    if (!pack) return res.status(404).json({ message: "Package not found" });

    // Calculate expiration date based on current date and package's postVisibilityDays
    const newExpirationDate = new Date();
    newExpirationDate.setDate(newExpirationDate.getDate() + pack.postVisibilityDays);
    
    // Assign the new expiration date to the job post
    jobPost.expirationDate = newExpirationDate;

    await jobPost.save();

      res.redirect(`http://localhost:3000/employer/payment-success?transactionId=${tran_id}`);

      // return res.status(200).json({ message: "Payment successful", order });
  } catch (error) {
      console.error("Payment Success Error:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};

// Handle payment failure
const paymentFailed = async (req, res) => {
  const { tran_id } = req.body;
  try {
      const order = await Order.findOne({ where: { transId: tran_id } });

      if (!order) return res.status(404).json({ message: "Order not found" });

      // Update order status to 'failed'
      // order.payment = 'failed';
      // await order.save();
      await order.destroy();

      res.redirect(`http://localhost:3000/employer/payment-fail?transactionId=${tran_id}`);
      
      return res.status(200).json({ message: "Payment failed", order });
  } catch (error) {
      console.error("Payment Failed Error:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};

// Handle payment cancellation
const paymentCancel = async (req, res) => {
  const { tran_id } = req.body;
  try {
      const order = await Order.findOne({ where: { transId: tran_id } });

      if (!order) return res.status(404).json({ message: "Order not found" });

      // Update order status to 'cancelled'
      order.payment = 'cancelled';
      await order.save();

      return res.status(200).json({ message: "Payment cancelled", order });
  } catch (error) {
      console.error("Payment Cancel Error:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();

    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    paymentSuccess,
    paymentFailed,
    paymentCancel,
}