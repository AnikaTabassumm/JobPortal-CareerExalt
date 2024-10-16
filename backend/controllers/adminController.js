const asyncHandler = require("express-async-handler");
const Admin = require('../models/adminModel')

export default getAdminDetails = async (req, res) => {
    try {

      const {id} = req.params;
    const admin = await Admin.findOne({ where: { userId: id }});
  
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      res.status(200).json({
        admin: {
          userId: admin.userId,
          userName: admin.userName,
          userEmail: admin.userEmail,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };